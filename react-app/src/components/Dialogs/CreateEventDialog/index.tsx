import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import {
  LocalizationProvider,
  StaticDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type TCreateEventDialog = {
  createEventModal: {
    open: boolean;
    startDate: Date;
    endDate: Date;
    description: string;
  };
  setCreateEventModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      startDate: Date;
      endDate: Date;
      description: string;
    }>
  >;
  handleCreateEvent: ({
    description,
    startDate,
    endDate,
  }: {
    description: string;
    startDate: Date;
    endDate: Date;
  }) => Promise<string | number | void>;
};
export const CreateEventDialog = ({
  createEventModal,
  setCreateEventModal,
  handleCreateEvent,
}: TCreateEventDialog) => (
  <Dialog
    open={createEventModal.open}
    onClose={() =>
      setCreateEventModal({
        open: false,
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

        await handleCreateEvent({
          startDate: createEventModal.startDate,
          endDate: createEventModal.endDate,
          description,
        });

        setCreateEventModal({
          open: false,
          startDate: new Date(),
          endDate: new Date(),
          description: '',
        });
      },
    }}
  >
    <DialogTitle>
      Evento dia {createEventModal.startDate.toLocaleDateString('pt-BR')}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Insira informações e data final do evento
      </DialogContentText>
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
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <StaticDateTimePicker
          onAccept={(e: any) => {
            setCreateEventModal((old) => ({
              ...old,
              endDate: e.$d,
            }));
          }}
          disablePast
          minDateTime={dayjs(createEventModal.startDate).add(1, 'minute')}
        />
      </LocalizationProvider>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() =>
          setCreateEventModal({
            open: false,
            startDate: new Date(),
            endDate: new Date(),
            description: '',
          })
        }
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={!createEventModal.endDate}>
        Agendar Evento
      </Button>
    </DialogActions>
  </Dialog>
);
