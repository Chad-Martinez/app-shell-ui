import { NavLink } from 'react-router-dom';
import classes from './UserNavigation.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

const UserNavigation = (): JSX.Element => {
  const { logout } = useContext(AuthContext);

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
