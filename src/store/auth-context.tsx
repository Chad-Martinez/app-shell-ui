import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { loginUser } from '../services/auth-service';
import { AxiosError } from 'axios';

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
  const { pathname } = useLocation();
  const cookies = useMemo(() => new Cookies(), []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await loginUser({ email, password });
        const accessToken = cookies.get('AT');
        const refreshToken = cookies.get('RT');

        const user: User = {
          userId: result.data?.userId,
          email: result.data?.email,
          firstName: result.data?.firstName,
          lastName: result.data?.lastName,
          userRole: result.data?.role,
        };

        localStorage.setItem('AT', JSON.stringify(accessToken));
        localStorage.setItem('RT', JSON.stringify(refreshToken));
        toast.success(result.data.message, { toastId: 'login-success' });
        setUser(user);
        navigate(`/${user?.userRole.toLowerCase()}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { toastId: 'login-error' });
        }
      }
    },
    [navigate, setUser, cookies]
  );

  const logout = useCallback(() => {
    cookies.remove('AT');
    cookies.remove('RT');
    localStorage.removeItem('AT');
    localStorage.removeItem('RT');
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser, cookies]);

  useEffect(() => {
    if (pathname !== '/') sessionStorage.setItem('route', pathname);
  }, [pathname]);

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
