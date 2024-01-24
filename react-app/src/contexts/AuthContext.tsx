import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContextData {
  signIn: ({ email, password }: { email: string; password: string }) => void;
  // signOut: () => void;
  // user: IUserData;
  // isAuthenticated: () => boolean;
  user: { email: string; password: string; name: string };
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: localStorage.getItem('user-email') || '',
    password: '',
    name: '',
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

          navigate('/schedule-event');
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
    [navigate],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
