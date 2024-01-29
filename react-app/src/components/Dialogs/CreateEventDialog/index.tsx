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
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import { RadioGp } from '../../Radio';
import { InviteEventDialog } from '../InviteEventDialog';

export type TCreateEventDialog = {
  createEventModal: {
    open: boolean;
    startDate: Date;
    endDate: null | Date;
    description: string;
  };
  setCreateEventModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      startDate: Date;
      endDate: null | Date;
      description: string;
    }>
  >;
  handleCreateEvent: ({
    description,
    startDate,
    endDate,
    access,
    invited,
  }: {
    description: string;
    startDate: Date;
    endDate: Date;
    access: 'public' | 'private'
    invited: string[]
  }) => Promise<string | number | void>;
};
export const CreateEventDialog = ({
  createEventModal,
  setCreateEventModal,
  handleCreateEvent,
}: TCreateEventDialog) => {
  const { user } = useAuth();
  const [defineAccess, setDefineAccess] = useState<{
    open: boolean;
    access: 'public' | 'private';
    invited: string[];
  }>({ open: false, access: 'public', invited: [] });

  const handleSetAccess = () => {
    if (defineAccess.access === 'public') {
      setDefineAccess({ open: true, access: 'private', invited: [user.email] });
    } else setDefineAccess({ open: false, access: 'public', invited: [] });
  };

  return (
    <Dialog
      open={createEventModal.open}
      onClose={() =>
        setCreateEventModal({
          open: false,
          startDate: new Date(),
          endDate: null,
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

          if (!createEventModal.endDate) {
            toast.error('Selecione a data final');
          } else {
            await handleCreateEvent({
              startDate: createEventModal.startDate,
              endDate: createEventModal.endDate,
              description,
              access: defineAccess.access,
              invited: defineAccess.invited,
            });
          }

          setCreateEventModal({
            open: false,
            startDate: new Date(),
            endDate: null,
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
        <RadioGp
          handleSetAccess={handleSetAccess}
          $default={defineAccess.access}
        />
        <InviteEventDialog
          setDefineAccess={setDefineAccess}
          defineAccess={defineAccess}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setCreateEventModal({
              open: false,
              startDate: new Date(),
              endDate: null,
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
};
