import React, { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation: FC = (): ReactElement => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
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
              to='/login'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/register'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
