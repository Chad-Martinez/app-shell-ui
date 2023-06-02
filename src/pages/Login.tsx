import { FC, FormEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Card,
  Container,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Login: FC = (): ReactElement => {
  const { login } = useAuth();

  const loginHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const email = data.get('email');
    const password = data.get('password');
    login(email!, password!);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      disableGutters={true}
    >
      <Card
        sx={{
          maxWidth: '100%',
          minWidth: '250px',
          minHeight: '300px',
          margin: 2,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '30px 0',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#007FFF',
              borderRadius: 50,
              height: 90,
              width: 90,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 2,
            }}
          >
            <LockOpenIcon
              sx={{
                color: 'white',
                fontSize: 60,
              }}
            />
          </Box>
          <Typography fontSize={35} sx={{ width: '100%' }}>
            Login
          </Typography>
          <Box
            sx={{
              marginTop: 3,
            }}
            component='form'
            onSubmit={loginHandler}
            noValidate
          >
            <TextField
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              autoFocus
            />
            <Button
              variant='contained'
              type='submit'
              fullWidth
              sx={{ height: '45px', margin: '6px 0' }}
            >
              Login
            </Button>
            <Typography
              sx={{
                width: '100%',
              }}
              align='right'
            >
              <Link to='/'>Forgot password?</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
