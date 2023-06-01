import { FC, Fragment, ReactElement } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRoles } from '../types/enums';

const Login: FC = (): ReactElement => {
  const { login } = useAuth();

  const loginHandler = () => {
    const user: User = {
      username: 'Chad',
      userRole: UserRoles.Admin,
    };
    login(user);
  };

  return (
    <Fragment>
      <h1>Login</h1>
      <div>
        <button onClick={loginHandler}>Login</button>
      </div>
    </Fragment>
  );
};

export default Login;
