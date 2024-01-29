import { Backdrop, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import 'dayjs/locale/pt-br';
import { useEffect, useState } from 'react';

// COMPONENTS
import {
  CreateEventDialog,
  DeleteEventDialog,
  EditEventDialog,
} from '../../components/Dialogs';
import { ListEvents } from '../../components/ListEvents';
// CONTEXTS
import { useAuth } from '../../hooks/useAuth';

// CONTROLLERS
import { SchedulesController } from './controller';

// STYLES
import 'react-day-picker/dist/style.css';
import { TCreateEventDialog } from '../../components/Dialogs/CreateEventDialog';
import { TDeleteEventModal } from '../../components/Dialogs/DeleteEventDialog';
import { TEditEventModal } from '../../components/Dialogs/EditEventDialog';
import { Calendar, WraperScheduleEvent } from './styles';

export const ScheduleEvent = () => {
  const { user } = useAuth();
  const {
    fetchEvents,
    handleCreateEvent,
    handleDeleteEvent,
    handleEditEvent,
    allUserEvents,
  } = SchedulesController(user.email);

  const [loadingEvents, setLoadingEvents] = useState(false);

  const [createEventModal, setCreateEventModal] = useState<
    TCreateEventDialog['createEventModal']
  >({
    open: false,
    startDate: new Date(),
    endDate: null,
    description: '',
  });

  const [deleteEventModal, setDeleteEventModal] = useState<
    TDeleteEventModal['deleteEventModal']
  >({
    open: false,
    eventId: '',
    startDate: new Date(),
    description: '',
  });

  const [editEventModal, setEditEventModal] = useState<
    TEditEventModal['editEventModal']
  >({
    open: false,
    eventId: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  });

  useEffect(() => {
    setLoadingEvents(true);
    fetchEvents();
    setLoadingEvents(false);
  }, []);

  return (
    <WraperScheduleEvent>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingEvents}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Calendar>
        <h2>Agendamento de Eventos</h2>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <StaticDateTimePicker
            onAccept={(e: any) => {
              setCreateEventModal((old) => ({
                ...old,
                open: true,
                startDate: e.$d as Date,
              }));
            }}
            disablePast
          />
        </LocalizationProvider>
      </Calendar>

      {!loadingEvents && allUserEvents.length > 0 && (
        <ListEvents
          allUserEvents={allUserEvents}
          setEditEventModal={setEditEventModal}
          setDeleteEventModal={setDeleteEventModal}
        />
      )}

      {!loadingEvents && allUserEvents.length === 0 && (
        <span>Não há eventos registrados</span>
      )}

      {/* Criar Evento */}
      <CreateEventDialog
        createEventModal={createEventModal}
        setCreateEventModal={setCreateEventModal}
        handleCreateEvent={handleCreateEvent}
      />

      {/* Deletar Evento */}
      <DeleteEventDialog
        deleteEventModal={deleteEventModal}
        setDeleteEventModal={setDeleteEventModal}
        handleDeleteEvent={handleDeleteEvent}
      />

      {/* Editar Evento */}
      <EditEventDialog
        editEventModal={editEventModal}
        setEditEventModal={setEditEventModal}
        handleEditEvent={handleEditEvent}
      />
    </WraperScheduleEvent>
  );
};
