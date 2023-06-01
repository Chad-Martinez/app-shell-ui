import {
  FC,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { UserRoles } from '../types/enums';

type AuthContent = {
  user: User;
  login: (data: User) => Promise<void>;
  logout: () => void;
};
const AuthContext = createContext<AuthContent>({
  user: {
    username: '',
    userRole: UserRoles.Admin,
  },
  login: async (data: User) => {},
  logout: () => {},
});

type AuthProps = {
  children: ReactElement;
};

export const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data: User) => {
      setUser(data);
      navigate('/profile');
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
