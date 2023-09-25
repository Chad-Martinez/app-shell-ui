import { Navigate } from 'react-router-dom';
import { UserRoles } from '../types/enums';
import { FC, ReactElement, useContext } from 'react';
import { AuthContext } from '../store/auth-context';

type ProtectedProps = {
  children: JSX.Element;
  role: UserRoles;
};

export const ProtectedRoute: FC<ProtectedProps> = ({
  children,
  role,
}): ReactElement | null => {
  const { user } = useContext(AuthContext);
  if (user?.userRole !== role) {
    return <Navigate to='/' />;
  }
  return children;
};
