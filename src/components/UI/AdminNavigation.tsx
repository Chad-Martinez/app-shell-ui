import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './AdminNavigation.module.css';

const AdminNavigation: FC = (): ReactElement => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/admin'
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
              to='admin-route-1'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Admin 1
            </NavLink>
          </li>
          <li>
            <NavLink
              to='admin-route-2'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Admin 2
            </NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavigation;
