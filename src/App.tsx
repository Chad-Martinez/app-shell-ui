import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import { CircularProgress } from '@mui/material';

const App = (): JSX.Element => {
  return (
    <RouterProvider router={router} fallbackElement={<CircularProgress />} />
  );
};

export default App;
