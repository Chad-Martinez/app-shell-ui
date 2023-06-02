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
  login: (
    email: FormDataEntryValue,
    password: FormDataEntryValue
  ) => Promise<void>;
  logout: () => void;
};
const AuthContext = createContext<AuthContent>({
  user: null,
  login: async (email: FormDataEntryValue, password: FormDataEntryValue) => {},
  logout: () => {},
});

type AuthProps = {
  children: ReactElement;
  userData: User;
};

export const AuthProvider: FC<AuthProps> = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage('user', userData);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: FormDataEntryValue, password: FormDataEntryValue) => {
      // --> Call to backend
      const data: User = { username: 'username', userRole: UserRoles.Admin };
      setUser(data);
      navigate(`/${data?.userRole.toLowerCase()}`);
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    (): AuthContent => ({
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
