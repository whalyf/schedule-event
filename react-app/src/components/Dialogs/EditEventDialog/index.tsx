import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export type TEditEventModal = {
  editEventModal: {
    open: boolean;
    eventId: string;
    startDate: Date;
    endDate: Date;
    description: string;
  };
  setEditEventModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      eventId: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }>
  >;
  handleEditEvent: ({
    eventId,
    description,
    startDate,
    endDate,
  }: {
    eventId: string;
    description?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
  }) => Promise<string | number | void>;
};
export const EditEventDialog = ({
  editEventModal,
  setEditEventModal,
  handleEditEvent,
}: TEditEventModal) => (
  <Dialog
    open={editEventModal.open}
    onClose={() =>
      setEditEventModal({
        open: false,
        eventId: '',
        startDate: new Date(),
        endDate: new Date(),
        description: '',
      })
    }
    PaperProps={{
      component: 'form',
      onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const description = formJson.description as string;

        await handleEditEvent({ ...editEventModal, description });
        setEditEventModal({
          open: false,
          eventId: '',
          startDate: new Date(),
          endDate: new Date(),
          description: '',
        });
      },
    }}
  >
    <DialogTitle>Deseja atualizar seu evento ?</DialogTitle>
    <DialogContent>
      <DialogContentText>Insira as novas informações</DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="description"
        label="Descrição"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={editEventModal.description}
        sx={{ mb: '20px' }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <DateTimePicker
            defaultValue={dayjs(editEventModal.startDate)}
            disablePast
            onAccept={(e: any) => {
              setEditEventModal((prevState) => ({
                ...prevState,
                startDate: e.$d,
              }));
            }}
          />
          <DateTimePicker
            defaultValue={dayjs(editEventModal.endDate)}
            minDateTime={dayjs(editEventModal.startDate).add(1, 'm')}
            disablePast
            onAccept={(e: any) => {
              setEditEventModal((prevState) => ({
                ...prevState,
                endDate: e.$d,
              }));
            }}
          />
        </div>
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() =>
          setEditEventModal({
            open: false,
            eventId: '',
            startDate: new Date(),
            endDate: new Date(),
            description: '',
          })
        }
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={
          !editEventModal.endDate ||
          !editEventModal.startDate ||
          !editEventModal.description
        }
      >
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);
