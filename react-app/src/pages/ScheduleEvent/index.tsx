import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import 'dayjs/locale/pt-br';
import { useCallback, useEffect, useState } from 'react';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { CardBlur } from '../../components/CardBlur';
import api from '../../services';
// STYLES
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';
import { Calendar, ListEvents, WraperScheduleEvent } from './styles';

interface ISchedule {
  id: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  user_email: string;
}

export const ScheduleEvent = () => {
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsRegistered, setEventsRegistered] = useState<ISchedule[]>([]);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>();

  const handleSetOpen = useCallback(() => {
    setOpen(!open);
    setEndDate(null);
  }, [open]);

  const handleCreateEvent = useCallback(
    async (description: string) => {
      const response = await api.post(
        '/schedules',
        {
          description,
          dateStart: startDate,
          dateEnd: endDate,
        },
        {
          headers: {
            'user-email': 'usuario3@gmail.com',
          },
        },
      );
      toast.info(response.data.message);
      handleSetOpen();
    },
    [startDate, endDate, handleSetOpen],
  );

  const fetchEevents = async () => {
    return await api.get('/schedules', {
      headers: {
        'user-email': 'usuario3@gmail.com',
      },
    });
  };

  useEffect(() => {
    setLoadingEvents(true);
    try {
      const response = fetchEevents();
      response.then((e) => {
        setEventsRegistered(e.data);
      });
      setLoadingEvents(false);
    } catch (e) {
      setLoadingEvents(false);
      console.error(e);
    }
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

      <ListEvents>
        <h2>Seus Eventos</h2>
        {!loadingEvents &&
          eventsRegistered.length > 0 &&
          eventsRegistered.map((event) => (
            <div key={event.id} className="card">
              <CardBlur>
                <button className="edit">
                  <FaPencilAlt />
                </button>
                <button className="delete">
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

      {!loadingEvents && eventsRegistered.length === 0 && (
        <span>Não há eventos registrados</span>
      )}

      <Dialog
        open={open}
        onClose={handleSetOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const description = formJson.description;

            handleCreateEvent(description.toString());
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
    </WraperScheduleEvent>
  );
};
