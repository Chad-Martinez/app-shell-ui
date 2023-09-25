import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import { CircularProgress } from '@mui/material';
import { FC, ReactElement } from 'react';

const App: FC = (): ReactElement | null => {
  return (
    <RouterProvider router={router} fallbackElement={<CircularProgress />} />
  );
};

export default App;
