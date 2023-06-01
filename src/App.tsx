import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';

const App: FC = (): ReactElement => {
  return <RouterProvider router={router} />;
};

export default App;
