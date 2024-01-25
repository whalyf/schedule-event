import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ScheduleEvent } from '../pages/ScheduleEvent';

export const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/schedule-event" element={<ScheduleEvent />} />
    </Routes>
  );
};
