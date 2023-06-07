import { createContext, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { UserRoles } from '../types/enums';

type AuthContent = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
const AuthContext = createContext<AuthContent>({
  user: null,
  login: async () => {},
  logout: () => {},
});

type AuthProps = {
  children: JSX.Element;
  userData: User;
};

export const AuthProvider = ({ children, userData }: AuthProps) => {
  const [user, setUser] = useLocalStorage('user', userData);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      // --> Call to backend
      // Mock Dummy Data to set a generic user
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

export const useAuth = () => useContext(AuthContext);
