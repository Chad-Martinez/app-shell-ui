import { FC, Fragment, ReactElement, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { UserRoles } from '../types/enums';
import UserNavigation from '../components/UI/navbars/UserNavigation';
import classes from './UserLayout.module.css';

const UserLayout: FC = (): ReactElement | null => {
  const { user } = useContext(AuthContext);

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
