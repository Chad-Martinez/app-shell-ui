import { Await, useLoaderData, Outlet } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import NotFound404 from '../pages/NotFound404';

const AuthWrapper = (): JSX.Element => {
  const user = useLoaderData();

  return (
    <Await
      resolve={user}
      errorElement={<NotFound404 />}
      children={(user) => (
        <AuthProvider userData={user}>
          <Outlet />
        </AuthProvider>
      )}
    />
  );
};

export default AuthWrapper;
