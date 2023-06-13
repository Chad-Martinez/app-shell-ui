import { Fragment, useContext } from 'react';
import RootNavigation from '../components/UI/navbars/RootNavigation';
import AdminNavigation from '../components/UI/navbars/AdminNavigation';
import UserNavigation from '../components/UI/navbars/UserNavigation';
import { UserRoles } from '../types/enums';
import { AuthContext } from '../store/auth-context';

const NotFound404 = (): JSX.Element => {
  const { user } = useContext(AuthContext);

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
