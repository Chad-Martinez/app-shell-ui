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
import { AxiosError, AxiosResponse } from 'axios';

type AuthProviderContent = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProviderContent>({
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
    async (email: string, password: string): Promise<void> => {
      try {
        const result: AxiosResponse = await loginUser({ email, password });

        const user: User = {
          userId: result.data?.userId,
          email: result.data?.email,
          firstName: result.data?.firstName,
          lastName: result.data?.lastName,
          phone: result.data?.phone,
          isEmailVerified: result.data?.isEmailVerified,
          userRole: result.data?.role,
        };

        setUser(user);

        toast.success(result.data.message, { toastId: 'login-success' });

        navigate(`/${user?.userRole.toLowerCase()}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { toastId: 'login-error' });
        }
        console.log(error);
      }
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    cookies.remove('AT');
    cookies.remove('RT');
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate, setUser, cookies]);

  useEffect(() => {
    if (pathname !== '/') sessionStorage.setItem('route', pathname);
  }, [pathname]);

  const authStore = useMemo(
    (): AuthProviderContent => ({
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
