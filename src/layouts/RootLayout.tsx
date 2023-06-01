import { FC, Fragment, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';
import RootNavigation from '../components/UI/RootNavigation';
import classes from './RootLayout.module.css';

const RootLayout: FC = (): ReactElement => {
  const { user } = useAuth();

  if (user && user.userRole === UserRoles.Admin)
    return <Navigate to='/admin' />;
  if (user && user.userRole === UserRoles.User) return <Navigate to='/user' />;

  return (
    <Fragment>
      <RootNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
