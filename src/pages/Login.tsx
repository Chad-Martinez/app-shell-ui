import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
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
import { validateEmailHelper } from '../utils/helpers';
import { FC, ReactElement, useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const Login: FC = (): ReactElement | null => {
  const { login } = useContext(AuthContext);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmailHelper);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value: string) => value.trim() !== '');

  let formIsValid: boolean = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const loginHandler = (): void => {
    if (!enteredEmailIsValid || !enteredPasswordIsValid) return;

    login(enteredEmail, enteredPassword);

    resetEmailInput();
    resetPasswordInput();
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
          >
            <TextField
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              type='email'
              autoFocus
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailInputHasError}
              helperText={emailInputHasError && 'Enter a valid email.'}
            />
            <TextField
              inputProps={{
                'data-testid': 'password',
              }}
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordInputHasError}
              helperText={passwordInputHasError && 'Password required.'}
            />
            <Button
              variant='contained'
              onClick={loginHandler}
              disabled={!formIsValid}
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
