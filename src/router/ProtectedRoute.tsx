import { Navigate } from 'react-router-dom';
import { UserRoles } from '../types/enums';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

type ProtectedProps = {
  children: JSX.Element;
  role: UserRoles;
};

export const ProtectedRoute = ({ children, role }: ProtectedProps) => {
  const { user } = useContext(AuthContext);
  if (user?.userRole !== role) {
    return <Navigate to='/' />;
  }
  return children;
};
