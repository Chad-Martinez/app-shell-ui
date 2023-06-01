import { FC, Fragment, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';
import UserNavigation from '../components/UI/UserNavigation';
import classes from './UserLayout.module.css';

const UserLayout: FC = (): ReactElement => {
  const { user } = useAuth();

  if (user && user.userRole !== UserRoles.User) {
    return <Navigate to='/' />;
  }

  return (
    <Fragment>
      <UserNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default UserLayout;
