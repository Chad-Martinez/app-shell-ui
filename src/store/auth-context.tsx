import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '../types/enums';

type AuthContent = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext<AuthContent>({
  user: null,
  login: async () => {},
  logout: () => {},
});

type AuthProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const retrievedStorage = localStorage.getItem('user');

    if (retrievedStorage) {
      setUser(JSON.parse(retrievedStorage));
      console.log(JSON.parse(retrievedStorage));
    }
  }, [setUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      // --> Call to backend
      // Mock Dummy Data to set a generic user
      const user: User = { username: 'username', userRole: UserRoles.Admin };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate(`/${user?.userRole.toLowerCase()}`);
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser]);

  const authStore = useMemo(
    (): AuthContent => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
