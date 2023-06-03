import {
  FC,
  ReactElement,
  FormEvent,
  useRef,
  useState,
  ChangeEvent,
  Fragment,
  forwardRef,
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
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PasswordStrengthMeter from '../components/UI/PasswordStrengthMeter';
import { validateEmailHelper } from '../utils/helpers';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

type Password = {
  value: string;
  score: number;
};

const Register: FC = (): ReactElement => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const [password, setPassword] = useState<Password>({
    value: '',
    score: 0,
  });
  const passwordConfirmRef = useRef<HTMLInputElement>();

  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);

  const validateFields = (): boolean => {
    let isValidForm: boolean = true;
    if (lastNameRef.current?.value === '') {
      isValidForm = false;
      setLastNameError(true);
    }
    if (emailRef.current?.value === '') {
      isValidForm = false;
      setEmailError(true);
    }

    if (password.value === '') {
      isValidForm = false;
      setPasswordError(true);
    }

    if (passwordConfirmRef.current?.value === '') {
      isValidForm = false;
      setPasswordConfirmError(true);
    }
    return isValidForm;
  };

  const registerHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordConfirmError
    )
      return setOpenAlert(true);

    if (!validateFields()) return setOpenAlert(true);

    const data = new FormData(event.currentTarget);

    const firstName: FormDataEntryValue = data.get('firstName')!;
    const lastName: FormDataEntryValue = data.get('lastName')!;
    const email: FormDataEntryValue = data.get('email')!;
    const pwrd: FormDataEntryValue = data.get('password')!;
    const passwordConfirm: FormDataEntryValue = data.get('passwordConfirm')!;

    console.log('FORM IS GOOD TO GO!');
    console.log(firstName, lastName, email, pwrd, passwordConfirm);
  };

  const validateInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value, id } = event.target;
    if (id === 'firstName') setFirstNameError(value === '');
    if (id === 'lastName') setLastNameError(value === '');
    if (id === 'email') setEmailError(validateEmailHelper(value));
    if (id === 'passwordConfirm')
      setPasswordConfirmError(
        passwordConfirmRef.current?.value === '' ||
          passwordConfirmRef.current?.value !== password.value
      );
  };

  const validatePasswordHandler = (): void => {
    setPasswordError(password.score < 3 ? true : false);
    setPasswordConfirmError(
      password.value !== passwordConfirmRef.current?.value
    );
  };

  const passwordChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value } = event.target;
    const { score }: ZXCVBNResult = zxcvbn(value);
    setPassword({ value, score });
    validatePasswordHandler();
  };

  const handleClose = (): void => {
    setOpenAlert(false);
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Correct Form Errors
        </Alert>
      </Snackbar>
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
                inputRef={firstNameRef}
                margin='dense'
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='firstName'
                autoFocus
                onChange={validateInputHandler}
                onBlur={validateInputHandler}
                error={firstNameError}
                helperText={firstNameError && 'Enter First Name'}
              />
              <TextField
                inputRef={lastNameRef}
                margin='dense'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                onChange={validateInputHandler}
                onBlur={validateInputHandler}
                error={lastNameError}
                helperText={lastNameError && 'Enter Last Name'}
              />
              <TextField
                inputRef={emailRef}
                margin='dense'
                required
                fullWidth
                type='email'
                id='email'
                label='Email'
                name='email'
                onChange={validateInputHandler}
                onBlur={validateInputHandler}
                error={emailError}
                helperText={emailError && 'Enter Valid Email'}
              />
              <TextField
                value={password.value}
                margin='dense'
                required
                fullWidth
                type='password'
                id='password'
                label='Password'
                name='password'
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                error={passwordError}
                helperText={
                  passwordError && password.value === ''
                    ? 'Enter a password'
                    : password.value && (
                        <PasswordStrengthMeter score={password.score} />
                      )
                }
              />
              <TextField
                inputRef={passwordConfirmRef}
                margin='dense'
                required
                fullWidth
                type='password'
                id='passwordConfirm'
                label='Confirm Password'
                name='passwordConfirm'
                onChange={validateInputHandler}
                onBlur={validateInputHandler}
                error={passwordConfirmError}
                helperText={passwordConfirmError && "Password doesn't match"}
              />
              <Button
                variant='contained'
                type='submit'
                fullWidth
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
