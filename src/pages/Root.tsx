import React, { FC, Fragment, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/UI/MainNavigation';

const RootLayout: FC = (): ReactElement => {
  return (
    <Fragment>
      <main>
        <MainNavigation />
      </main>
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
