import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContextData {
  signIn: ({ email, password }: { email: string; password: string }) => void;
  user: { email: string; password: string; name: string };
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: localStorage.getItem('user-email') || '',
    password: '',
    name: localStorage.getItem('user-name') || '',
  });

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      await api
        .post(`/users/${email}`, { password })
        .then((response) => {
          toast.success(response.data.message);
          toast(`Seja bem Vindo ${response.data.user.name}`);
          setUser(response.data.user);
          localStorage.setItem('user-email', response.data.user.email);
          localStorage.setItem('user-name', response.data.user.name);

          navigate('/schedule-event');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    [navigate],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-name');
    setUser({ email: '', password: '', name: '' });
    navigate('/');
  }, [navigate]);

  // const fetchAllEvents = useCallback(async () => {
  //   const response = await api.get('/schedules/events');
  //   setAllEvents(response.data);
  // }, []);

  // useEffect(() => {
  //   fetchAllEvents();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
