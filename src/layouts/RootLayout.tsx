import { Fragment, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Navigate, Outlet } from 'react-router-dom';
import RootNavigation from '../components/UI/RootNavigation';
import classes from './RootLayout.module.css';

const RootLayout = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  const route = sessionStorage.getItem('route');

  if (user && !route)
    return <Navigate to={`/${user.userRole.toLowerCase()}`} />;
  if (user && route) return <Navigate to={route} />;

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
