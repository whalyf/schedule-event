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
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useCallback, useEffect, useState } from 'react';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
// COMPONENTS
import { CardBlur } from '../../components/CardBlur';
// CONTEXTS
import { useAuth } from '../../hooks/useAuth';
// CONTROLLERS
import { SchedulesController } from './controller';
// STYLES
import 'react-day-picker/dist/style.css';
import { Calendar, ListEvents, WraperScheduleEvent } from './styles';

export const ScheduleEvent = () => {
  const { user } = useAuth();
  const {
    fetchEvents,
    handleCreate,
    handleDeleteEvent,
    handleEditEvent,
    allUserEvents,
  } = SchedulesController(user.email);

  const [loadingEvents, setLoadingEvents] = useState(false);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>();

  const [deleteEventModal, setDeleteEventModal] = useState({
    open: false,
    eventId: '',
    startDate: new Date(),
    description: '',
  });

  const [editEventModal, setEditEventModal] = useState({
    open: false,
    eventId: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });

  const handleSetOpen = useCallback(() => {
    setOpen(!open);
    setEndDate(null);
  }, [open]);

  const handleCreateEvent = useCallback(
    async (description: string) => {
      if (!endDate) {
        toast.error('Data final não foi selecionada');
      } else await handleCreate(description, startDate, endDate);

      handleSetOpen();
    },
    [startDate, endDate, handleSetOpen, handleCreate],
  );
  console.log(allUserEvents);

  useEffect(() => {
    setLoadingEvents(true);
    fetchEvents();
    setLoadingEvents(false);
  }, []);

  return (
    <WraperScheduleEvent>
      <Calendar>
        <h2>Agendamento de Eventos</h2>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <StaticDateTimePicker
            orientation="landscape"
            onAccept={(e: any) => {
              setStartDate(e.$d as Date);
              handleSetOpen();
            }}
            disablePast
          />
        </LocalizationProvider>
      </Calendar>

      {!loadingEvents && allUserEvents.length > 0 && (
        <ListEvents>
          <h2>Seus Eventos</h2>
          {allUserEvents.map((event) => (
            <div key={event.id} className="card">
              <CardBlur>
                <button
                  className="edit"
                  onClick={() => {
                    setEditEventModal({
                      open: true,
                      eventId: event.id,
                      startDate: event.dateStart,
                      description: event.description,
                      endDate: event.dateEnd,
                    });
                  }}
                >
                  <FaPencilAlt />
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    setDeleteEventModal({
                      open: true,
                      eventId: event.id,
                      startDate: event.dateStart,
                      description: event.description,
                    });
                  }}
                >
                  <FaRegTrashAlt />
                </button>
                <h5>{event.description}</h5>
                <div className="dates">
                  <span>
                    Inicio: {new Date(event.dateStart).toLocaleString('pt-BR')}
                  </span>
                  <span>
                    Fim: {new Date(event.dateEnd).toLocaleString('pt-BR')}
                  </span>
                </div>
              </CardBlur>
            </div>
          ))}
        </ListEvents>
      )}

      {!loadingEvents && allUserEvents.length === 0 && (
        <span>Não há eventos registrados</span>
      )}
      {/* Criar Evento */}
      <Dialog
        open={open}
        onClose={handleSetOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const description = formJson.description as string;

            handleCreateEvent(description);
          },
        }}
      >
        <DialogTitle>
          Evento dia {startDate.toLocaleDateString('pt-BR')}
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <StaticDateTimePicker
              orientation="landscape"
              minDate={dayjs(startDate).add(1, 'day')}
              onAccept={(e: any) => {
                setEndDate(e.$d as Date);
              }}
              disablePast
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetOpen}>Cancelar</Button>
          <Button type="submit" disabled={!endDate}>
            Agendar Evento
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deletar Evento */}
      <Dialog
        open={deleteEventModal.open}
        onClose={() =>
          setDeleteEventModal({
            open: false,
            eventId: '',
            startDate: new Date(),
            description: '',
          })
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Excluir ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir seu evento{' '}
            <b>{deleteEventModal.description}</b> no dia{' '}
            {new Date(deleteEventModal.startDate).toLocaleDateString('pt-BR')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteEventModal({
                open: false,
                eventId: '',
                startDate: new Date(),
                description: '',
              })
            }
          >
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              await handleDeleteEvent(deleteEventModal.eventId);
              setDeleteEventModal({
                open: false,
                eventId: '',
                startDate: new Date(),
                description: '',
              });
            }}
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Editar Evento */}
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
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <MobileDateTimePicker
              label="Inicio"
              defaultValue={dayjs(editEventModal.startDate)}
              onAccept={(e: any) => {
                setEditEventModal((prevState) => ({
                  ...prevState,
                  startDate: e.$d,
                }));
              }}
            />
            <MobileDateTimePicker
              label="Fim"
              defaultValue={dayjs(editEventModal.endDate)}
              onAccept={(e: any) => {
                setEditEventModal((prevState) => ({
                  ...prevState,
                  endDate: e.$d,
                }));
              }}
            />
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
    </WraperScheduleEvent>
  );
};
