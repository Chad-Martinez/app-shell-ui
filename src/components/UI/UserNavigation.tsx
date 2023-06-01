import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './UserNavigation.module.css';
import { useAuth } from '../../hooks/useAuth';

const UserNavigation: FC = (): ReactElement => {
  const { logout } = useAuth();

  const logoutHandler = (): void => {
    logout();
  };
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/user'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='user-route-1'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              User 1
            </NavLink>
          </li>
          <li>
            <NavLink
              to='user-route-2'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              User 2
            </NavLink>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserNavigation;
