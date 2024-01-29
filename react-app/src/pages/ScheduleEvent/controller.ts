import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services';

export interface ISchedule {
  id: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  user_email: string;
}

export const SchedulesController = (user_email: string) => {
  const [allUserEvents, setAllUserEvents] = useState<ISchedule[]>([]);
  const fetchEvents = async () => {
    return await api
      .get('/schedules', {
        headers: {
          'user-email': user_email,
        },
      })
      .then((response) => {
        setAllUserEvents(response.data);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const handleCreateEvent = async ({
    description,
    startDate,
    endDate,
    access,
    invited,
  }: {
    description: string;
    startDate: Date;
    endDate: Date;
    access: 'public' | 'private';
    invited: string[];
  }) => {
    return await api
      .post(
        '/schedules',
        {
          description,
          dateStart: startDate,
          dateEnd: endDate,
          access,
          invited,
        },
        {
          headers: {
            'user-email': user_email,
          },
        },
      )
      .then((response) => {
        fetchEvents();
        toast.success(response.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const handleDeleteEvent = async (eventId: string) => {
    return await api
      .delete(`/schedules/${eventId}`, {
        headers: {
          'user-email': user_email,
        },
      })
      .then((response) => {
        fetchEvents();
        toast.success(response.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const handleEditEvent = async ({
    eventId,
    description,
    startDate,
    endDate,
  }: {
    eventId: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    return await api
      .put(
        `/schedules/${eventId}`,
        {
          description,
          dateStart: startDate,
          dateEnd: endDate,
        },
        {
          headers: {
            'user-email': user_email,
          },
        },
      )
      .then((response) => {
        fetchEvents();
        toast.success(response.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return {
    fetchEvents,
    handleCreateEvent,
    handleDeleteEvent,
    handleEditEvent,
    allUserEvents,
  };
};
