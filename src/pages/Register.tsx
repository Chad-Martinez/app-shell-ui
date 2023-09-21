import { useState, ChangeEvent, Fragment, FC } from 'react';
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
import { validateEmailHelper, validatePhoneHelper } from '../utils/helpers';
import MaskedInput from '../components/UI/MaskedInput';
import { IRegister } from '../types/Register.interface';
import { registerUser } from '../services/auth-service';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';

const Register: FC = (): JSX.Element => {
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
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phonelChangeHandler,
    inputBlurHandler: phonelBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) => {
    return validatePhoneHelper(value);
  });

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: onPasswordChange,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(() => passwordScore >= 3);

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
    phoneIsValid &&
    passwordIsValid &&
    passwordConfirmIsValid
  ) {
    formIsValid = true;
  }

  const resetForm = (): void => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPhoneInput();
    resetPasswordInput();
    resetPasswordConfirmInput();
  };

  const registerHandler = async (): Promise<void> => {
    const newUser: IRegister = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    try {
      const result: AxiosResponse = await registerUser(newUser);
      toast.success(result.data.message, { toastId: 'register-success' });
      resetForm();
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message, {
          toastId: 'register-error',
        });
      console.log('ERROR ', error);
    }
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
              <MaskedInput
                mask='999-999-9999'
                value={phone}
                changeHandler={phonelChangeHandler}
                blurHandler={phonelBlurHandler}
                id='phone'
                inputName='phone'
                isRequired={false}
                label='Phone'
                inputHasError={phoneInputHasError}
                errorMessage='Enter a valid 10 digit number'
              />
              <TextField
                inputProps={{
                  'data-testid': 'password',
                }}
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
                inputProps={{
                  'data-testid': 'password-confirm',
                }}
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
                fullWidth
                disabled={!formIsValid}
                sx={{ height: '45px', margin: '6px 0' }}
                onClick={registerHandler}
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
