import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';

type ProtectedProps = {
  children: JSX.Element;
  role: UserRoles;
};

export const ProtectedRoute = ({ children, role }: ProtectedProps) => {
  const { user } = useAuth();
  if (user?.userRole !== role) {
    return <Navigate to='/' />;
  }
  return children;
};
