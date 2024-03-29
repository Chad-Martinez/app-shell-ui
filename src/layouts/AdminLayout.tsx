import { FC, Fragment, ReactElement, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { Outlet, Navigate } from 'react-router-dom';
import { UserRoles } from '../types/enums';
import AdminNaviation from '../components/UI/navbars/AdminNavigation';
import classes from './AdminLayout.module.css';

const AdminLayout: FC = (): ReactElement | null => {
  const { user } = useContext(AuthContext);

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
