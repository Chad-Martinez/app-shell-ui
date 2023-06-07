import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';
import UserNavigation from '../components/UI/UserNavigation';
import classes from './UserLayout.module.css';

const UserLayout = (): JSX.Element => {
  const { user } = useAuth();

  if (user?.userRole !== UserRoles.User) {
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
