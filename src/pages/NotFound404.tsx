import React, { FC, Fragment, ReactElement } from 'react';
import MainNavigation from '../components/UI/MainNavigation';

const NotFound404: FC = (): ReactElement => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <h1>404: Page Not Found</h1>
      </main>
    </Fragment>
  );
};

export default NotFound404;
