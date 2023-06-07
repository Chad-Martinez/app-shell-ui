import {
  ReactElement,
  FormEvent,
  useState,
  ChangeEvent,
  Fragment,
} from 'react';
import { Link } from 'react-router-dom';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';
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
import useInput from '../hooks/useInput';
import PasswordStrengthMeter from '../components/UI/PasswordStrengthMeter';
import { validateEmailHelper } from '../utils/helpers';

const Register = (): ReactElement => {
  const [passwordScore, setPasswordScore] = useState<number>(0);

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNamelChangeHandler,
    inputBlurHandler: firstNamelBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(validateEmailHelper);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: onPasswordChange,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => passwordScore >= 3);

  const {
    value: passwordConfirm,
    isValid: passwordConfirmIsValid,
    hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: resetPasswordConfirmInput,
  } = useInput((value) => value.trim() !== '' && value === password);

  let formIsValid: boolean = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid
  ) {
    formIsValid = true;
  }

  const resetForm = (): void => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetPasswordConfirmInput();
  };

  const registerHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // API Logic

    resetForm();
  };

  const evaluatePassword = (value: string): void => {
    const { score }: ZXCVBNResult = zxcvbn(value);
    setPasswordScore(score);
  };

  const passwordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    onPasswordChange(event);
    evaluatePassword(event.target.value);
  };

  return (
    <Fragment>
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
              noValidate
            >
              <TextField
                margin='dense'
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='firstName'
                autoFocus
                value={firstName}
                onChange={firstNamelChangeHandler}
                onBlur={firstNamelBlurHandler}
                error={firstNameInputHasError}
                helperText={firstNameInputHasError && 'Enter First Name'}
              />
              <TextField
                margin='dense'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                error={lastNameInputHasError}
                helperText={lastNameInputHasError && 'Enter Last Name'}
              />
              <TextField
                margin='dense'
                required
                fullWidth
                type='email'
                id='email'
                label='Email'
                name='email'
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={emailInputHasError}
                helperText={emailInputHasError && 'Enter Valid Email'}
              />
              <TextField
                margin='dense'
                required
                fullWidth
                type='password'
                id='password'
                label='Password'
                name='password'
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordInputHasError}
                helperText={
                  passwordInputHasError && password === ''
                    ? 'Enter a password'
                    : password && (
                        <PasswordStrengthMeter score={passwordScore} />
                      )
                }
              />
              <TextField
                margin='dense'
                required
                fullWidth
                type='password'
                id='passwordConfirm'
                label='Confirm Password'
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmBlurHandler}
                error={passwordConfirmInputHasError}
                helperText={
                  passwordConfirmInputHasError && password === ''
                    ? 'No password set'
                    : passwordConfirmInputHasError && "Password doesn't match"
                }
              />
              <Button
                variant='contained'
                type='submit'
                fullWidth
                disabled={!formIsValid}
                sx={{ height: '45px', margin: '6px 0' }}
              >
                Register
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
    </Fragment>
  );
};

export default Register;
