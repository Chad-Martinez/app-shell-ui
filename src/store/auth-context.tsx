import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoles } from '../types/enums';
import { decodeToken } from 'react-jwt';

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

type Token = {
  username: string;
  aud: string;
  role: UserRoles;
  exp: number;
  iat: string;
  sub: string;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      // --> Call to backend
      // Start mock data to set a generic user to be replaced by AuthContext login
      const user: User = { username: 'username', userRole: UserRoles.Admin };
      localStorage.setItem(
        'user',
        JSON.stringify(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODY0MTM4OTUsImV4cCI6MTcxNzk0OTg5NSwiYXVkIjoiIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoianJvY2tldEBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiJ9.B7GsqxMqGNFtbKbNrWjHFRiOVRtWiT-Ei2ERu0Kg2Cs'
        )
      );
      // End mock data
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

  useEffect(() => {
    const retrievedStorage = localStorage.getItem('user');
    if (!retrievedStorage) return;

    const refreshToken: Token | null = decodeToken(
      JSON.parse(retrievedStorage!)
    );

    if (!refreshToken) return;
    const decodedUser: User = {
      username: refreshToken!.username,
      userRole: refreshToken!.role,
    };
    setUser(decodedUser);
  }, [setUser, logout, navigate]);

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
