import { Fragment, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRoles } from '../types/enums';
import RootNavigation from '../components/UI/RootNavigation';
import classes from './RootLayout.module.css';

const RootLayout = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  if (user?.userRole === UserRoles.Admin) return <Navigate to='/admin' />;
  if (user?.userRole === UserRoles.User) return <Navigate to='/user' />;

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
