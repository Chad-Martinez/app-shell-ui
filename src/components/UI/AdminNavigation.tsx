import { useState, MouseEvent, SyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import StyledLink from '../StyledLink';

const settings = ['Profile', 'Admin1', 'Admin2', 'Logout'];

const AdminNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event: SyntheticEvent<HTMLElement>) => {
    const { id } = event.currentTarget;
    if (id === 'Logout') return user.logout();
    navigate(id.toLowerCase());
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <StyledLink to='/admin'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalPoliceIcon
              sx={{
                mr: { xs: 1, md: 2 },
                fontSize: '30px',
              }}
            />

            <Typography
              variant='h6'
              noWrap
              sx={{
                display: { xs: 'none', md: 'block' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: { md: '.3rem' },
                textDecoration: 'none',
              }}
            >
              AuthShell
            </Typography>
          </Box>
        </StyledLink>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Place Holder' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                id={setting}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavigation;
