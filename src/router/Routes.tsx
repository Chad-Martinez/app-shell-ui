import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminLayout from '../layouts/AdminLayout';
import AdminHome from '../pages/AdminHome';
import Admin1 from '../pages/Admin1';
import Admin2 from '../pages/Admin2';
import UserLayout from '../layouts/UserLayout';
import UserHome from '../pages/UserHome';
import User1 from '../pages/User1';
import User2 from '../pages/User2';
import { ProtectedRoute } from './ProtectedRoute';
import NotFound404 from '../pages/NotFound404';
import { UserRoles } from '../types/enums';

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
  rootRoutes,
  adminRoutes,
  userRoutes,
]);
