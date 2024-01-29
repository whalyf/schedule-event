import { IconButton, Tooltip } from '@mui/material';
import { FaGlobe, FaLock, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { ISchedule } from '../../pages/ScheduleEvent/controller';
import { verifyEventStatus } from '../../utils/verifyEventStatus';
import { CardBlur } from '../CardBlur';
import { TDeleteEventModal } from '../Dialogs/DeleteEventDialog';
import { TEditEventModal } from '../Dialogs/EditEventDialog';
import { WrapperListEvents } from './styles';

export const ListEvents = ({
  setEditEventModal,
  setDeleteEventModal,
  allUserEvents,
}: {
  setEditEventModal: TEditEventModal['setEditEventModal'];
  setDeleteEventModal: TDeleteEventModal['setDeleteEventModal'];
  allUserEvents: ISchedule[];
}) => (
  <WrapperListEvents>
    <h2>Seus Eventos</h2>
    {allUserEvents.map((event) => (
      <div key={event.id} className="card">
        <CardBlur
          theme={verifyEventStatus({
            start: event.dateStart,
            end: event.dateEnd,
          })}
        >
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
            disabled={
              verifyEventStatus({
                start: event.dateStart,
                end: event.dateEnd,
              }) === 'past'
            }
            style={{
              cursor:
                verifyEventStatus({
                  start: event.dateStart,
                  end: event.dateEnd,
                }) === 'past'
                  ? 'auto'
                  : 'pointer',
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
            <span>Fim: {new Date(event.dateEnd).toLocaleString('pt-BR')}</span>
          </div>
          {event.access === 'public' ? (
            <Tooltip title="Público" placement="top" arrow>
              <IconButton style={{ top: 0, cursor: 'default' }}>
                <FaGlobe />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Privado" placement="top" arrow>
              <IconButton style={{ top: 0, cursor: 'default' }}>
                <FaLock />
              </IconButton>
            </Tooltip>
          )}
        </CardBlur>
      </div>
    ))}
  </WrapperListEvents>
);
