import { FC, Fragment, ReactElement } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';
import AdminNaviation from '../components/UI/AdminNavigation';
import classes from './AdminLayout.module.css';

const AdminLayout: FC = (): ReactElement => {
  const { user } = useAuth();

  if (user && user.userRole !== UserRoles.Admin) {
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
