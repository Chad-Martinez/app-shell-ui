import { Fragment } from 'react';
import RootNavigation from '../components/UI/RootNavigation';
import AdminNavigation from '../components/UI/AdminNavigation';
import UserNavigation from '../components/UI/UserNavigation';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';

const NotFound404 = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Fragment>
      {user?.userRole === UserRoles.Admin ? (
        <AdminNavigation />
      ) : user?.userRole === UserRoles.User ? (
        <UserNavigation />
      ) : (
        <RootNavigation />
      )}
      <main>
        <h1>404: Page Not Found</h1>
      </main>
    </Fragment>
  );
};

export default NotFound404;
