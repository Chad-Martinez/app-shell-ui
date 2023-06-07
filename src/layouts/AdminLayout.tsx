import { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';
import AdminNaviation from '../components/UI/AdminNavigation';
import classes from './AdminLayout.module.css';

const AdminLayout = (): JSX.Element => {
  const { user } = useAuth();

  if (user?.userRole !== UserRoles.Admin) {
    return <Navigate to='/' />;
  }

  return (
    <Fragment>
      <AdminNaviation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AdminLayout;
