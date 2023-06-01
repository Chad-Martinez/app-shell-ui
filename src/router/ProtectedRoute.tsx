import { FC, PropsWithChildren, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';

type ProtectedProps = {
  children: ReactElement;
  role: UserRoles;
};

export const ProtectedRoute: FC<PropsWithChildren<ProtectedProps>> = ({
  children,
  role,
}) => {
  const { user } = useAuth();
  if (user.userRole !== role) {
    return <Navigate to='/' />;
  }
  return children;
};
