import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import StyledLink from '../StyledLink';

const RootNavigation = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <StyledLink to='/'>
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
          <Box>
            <StyledLink to='/login'>
              <Button color='inherit'>Login</Button>
            </StyledLink>
            <StyledLink to='/register'>
              <Button color='inherit'>Register</Button>
            </StyledLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default RootNavigation;
