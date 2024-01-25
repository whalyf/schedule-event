import { FaSignOutAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { WrapperHeader } from './styles';

export const Header = () => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  return (
    <>
      {user.email.length > 0 &&
        location.pathname !== '/register' &&
        location.pathname !== '/' && (
          <WrapperHeader>
            <h3>{user.name}</h3>
            <button onClick={signOut}>
              <FaSignOutAlt size={20} />
            </button>
          </WrapperHeader>
        )}
    </>
  );
};
