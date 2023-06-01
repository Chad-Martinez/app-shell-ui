import { Suspense, lazy } from 'react';
import { createBrowserRouter, defer } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import NotFound404 from '../pages/NotFound404';
import { UserRoles } from '../types/enums';

const RootLayout = lazy(() => import('../layouts/RootLayout'));
const HomePage = lazy(() => import('../pages/HomePage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AdminHome = lazy(() => import('../pages/AdminHome'));
const Admin1 = lazy(() => import('../pages/Admin1'));
const Admin2 = lazy(() => import('../pages/Admin2'));
const UserLayout = lazy(() => import('../layouts/UserLayout'));
const UserHome = lazy(() => import('../pages/UserHome'));
const User1 = lazy(() => import('../pages/User1'));
const User2 = lazy(() => import('../pages/User2'));
const AuthWrapper = lazy(() => import('../layouts/AuthWrapper'));

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

const getUserData = async () => {
  await stall(1000);
  const storedData = window.localStorage.getItem('user');
  if (!storedData) return defer({ user: null });
  const user: User = JSON.parse(storedData);
  return defer({ user });
};

const rootRoutes = {
  path: '/',
  element: <RootLayout />,
  errorElement: <NotFound404 />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ],
};

const adminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  errorElement: <NotFound404 />,
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute role={UserRoles.Admin}>
          <AdminHome />
        </ProtectedRoute>
      ),
    },
    {
      path: 'admin-route-1',
      element: (
        <ProtectedRoute role={UserRoles.Admin}>
          <Admin1 />
        </ProtectedRoute>
      ),
    },
    {
      path: 'admin-route-2',
      element: (
        <ProtectedRoute role={UserRoles.Admin}>
          <Admin2 />
        </ProtectedRoute>
      ),
    },
  ],
};

const userRoutes = {
  path: '/user',
  element: <UserLayout />,
  errorElement: <NotFound404 />,
  children: [
    {
      index: true,
      element: (
        <ProtectedRoute role={UserRoles.User}>
          <UserHome />
        </ProtectedRoute>
      ),
    },
    {
      path: 'user-route-1',
      element: (
        <ProtectedRoute role={UserRoles.User}>
          <User1 />
        </ProtectedRoute>
      ),
    },
    {
      path: 'user-route-2',
      element: (
        <ProtectedRoute role={UserRoles.User}>
          <User2 />
        </ProtectedRoute>
      ),
    },
  ],
};

export const router = createBrowserRouter([
  {
    element: (
      <Suspense>
        <AuthWrapper />
      </Suspense>
    ),
    errorElement: <NotFound404 />,
    loader: getUserData,
    children: [rootRoutes, adminRoutes, userRoutes],
  },
]);
