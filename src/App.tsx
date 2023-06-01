import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import { CircularProgress } from '@mui/material';

const App: FC = (): ReactElement => {
  return (
    <RouterProvider router={router} fallbackElement={<CircularProgress />} />
  );
};

export default App;
