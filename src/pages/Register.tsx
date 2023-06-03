import { FC, ReactElement, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Register: FC = (): ReactElement => {
  const registerHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const firstName: FormDataEntryValue = data.get('firstName')!;
    const lastName: FormDataEntryValue = data.get('lastName')!;
    const email: FormDataEntryValue = data.get('email')!;
    const password: FormDataEntryValue = data.get('password')!;
    const passwordConfirm: FormDataEntryValue = data.get('passwordConfirm')!;

    console.log(firstName, lastName, email, password, passwordConfirm);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '76vh',
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
          padding: 2,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '7px 0',
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
              margin: 1,
            }}
          >
            <PersonPinIcon
              sx={{
                color: 'white',
                fontSize: 80,
              }}
            />
          </Box>
          <Typography fontSize={35} sx={{ width: '100%' }}>
            Register
          </Typography>
          <Box
            sx={{
              marginTop: 1,
            }}
            component='form'
            onSubmit={registerHandler}
            // noValidate
          >
            <TextField
              margin='dense'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoFocus
            />
            <TextField
              margin='dense'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoFocus
            />
            <TextField
              margin='dense'
              required
              fullWidth
              type='email'
              id='email'
              label='Email'
              name='email'
              autoFocus
            />
            <TextField
              margin='dense'
              required
              fullWidth
              type='password'
              id='password'
              label='Password'
              name='password'
              autoFocus
            />
            <TextField
              margin='dense'
              required
              fullWidth
              type='password'
              id='passwordConfirm'
              label='Confirm Password'
              name='passwordConfirm'
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
              Already have an account? <Link to='/login'>Login</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
