import { screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { render } from './test-utils';
import user from '@testing-library/user-event';
import Register from '../pages/Register';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

describe('<Register />', () => {
  let formValues: FormValues;
  let firstNameTextBox: HTMLInputElement;
  let lastNameTextBox: HTMLInputElement;
  let emailTextBox: HTMLInputElement;
  let passwordTextBox: HTMLInputElement;
  let passwordConfirmTextBox: HTMLInputElement;
  let registerButton: HTMLButtonElement;

  const getFirstNameErrorElement = (getBy?: string): HTMLElement | null => {
    if (getBy) return screen.getByText(/enter first name/i);
    return screen.queryByText(/enter first name/i);
  };

  const getLastNameErrorElement = (getBy?: string): HTMLElement | null => {
    if (getBy) return screen.getByText(/enter last name/i);
    return screen.queryByText(/enter last name/i);
  };

  const getEmailErrorElement = (getBy?: string): HTMLElement | null => {
    if (getBy) return screen.getByText(/enter valid email/i);
    return screen.queryByText(/enter valid email/i);
  };

  const getPasswordErrorElement = (): HTMLElement | null =>
    screen.getByText(/enter a password/i);

  const getPasswordConfirmErrorElement = (
    getBy?: string
  ): HTMLElement | null => {
    if (getBy) return screen.getByText(/no password set/i);
    return screen.queryByText(/no password set/i);
  };

  const getPasswordsDontMatch = (getBy?: string): HTMLElement | null => {
    if (getBy) return screen.getByText(/password doesn't match/i);
    return screen.queryByText(/password doesn't match/i);
  };

  const getPasswordValidElement = (): HTMLElement | null =>
    screen.getByText(/\(valid\)/i);

  const getPasswordInValidElement = (): HTMLElement | null =>
    screen.getByText(/\(invalid\)/i);

  const setup = () => {
    render(<Register />);
    firstNameTextBox = screen.getByRole('textbox', {
      name: /first name/i,
    });
    lastNameTextBox = screen.getByRole('textbox', {
      name: /last name/i,
    });
    emailTextBox = screen.getByRole('textbox', {
      name: /email/i,
    });
    passwordTextBox = screen.getByTestId('password');
    passwordConfirmTextBox = screen.getByTestId('password-confirm');
    registerButton = screen.getByRole('button', { name: /register/i });
  };

  beforeEach(() => {
    formValues = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'test@test.com',
      password: 'TestablePassablePassword1!',
      passwordConfirm: 'TestablePassablePassword1!',
    };
  });
  it('renders login component', () => {
    render(<Register />);
  });
  it('renders form elements and sets focus on First Name input element', () => {
    setup();
    expect(firstNameTextBox).toBeInTheDocument();
    expect(lastNameTextBox).toBeInTheDocument();
    expect(emailTextBox).toBeInTheDocument();
    expect(passwordTextBox).toBeInTheDocument();
    expect(passwordConfirmTextBox).toBeInTheDocument();
    expect(firstNameTextBox).toHaveFocus();
  });
  it('should accept input on all input fields', () => {
    setup();
    act(() => user.type(firstNameTextBox, formValues.firstName)); // eslint-disable-line
    act(() => user.type(lastNameTextBox, formValues.lastName)); // eslint-disable-line
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.type(passwordConfirmTextBox, formValues.passwordConfirm)); // eslint-disable-line
    expect(firstNameTextBox).toHaveValue(formValues.firstName);
    expect(lastNameTextBox).toHaveValue(formValues.lastName);
    expect(emailTextBox).toHaveValue(formValues.email);
    expect(passwordTextBox).toHaveValue(formValues.password);
    expect(passwordConfirmTextBox).toHaveValue(formValues.passwordConfirm);
  });
  it('should show an error when a first name is not provided the input losses focus', () => {
    setup();
    user.tab();
    expect(getFirstNameErrorElement('getBy')).toBeInTheDocument();
  });
  it('should clear the first name error as soon as a first name is provided', () => {
    setup();
    user.click(firstNameTextBox);
    user.tab();
    expect(getFirstNameErrorElement('getBy')).toBeInTheDocument();
    act(() => user.type(firstNameTextBox, formValues.firstName)); // eslint-disable-line
    expect(getFirstNameErrorElement()).not.toBeInTheDocument();
  });
  it('should show an error when a last name is not provided the input losses focus', () => {
    setup();
    user.click(lastNameTextBox);
    user.tab();
    expect(getLastNameErrorElement('getBy')).toBeInTheDocument();
  });
  it('should clear the last name error as soon as a last name is provided', () => {
    setup();
    user.click(lastNameTextBox);
    user.tab();
    expect(getLastNameErrorElement('getBy')).toBeInTheDocument();
    act(() => user.type(lastNameTextBox, formValues.lastName)); // eslint-disable-line
    expect(getLastNameErrorElement()).not.toBeInTheDocument();
  });
  it('should show an error when an email is not provided the input losses focus', () => {
    setup();
    user.click(emailTextBox);
    user.tab();
    expect(emailTextBox).not.toHaveFocus();
    expect(getEmailErrorElement('getBy')).toBeInTheDocument();
  });
  it('should show an error when the email input element losses focus if the input is not a valid email address', () => {
    setup();
    act(() => user.type(emailTextBox, 'test@test')); // eslint-disable-line
    user.tab();
    expect(getEmailErrorElement('getBy')).toBeInTheDocument();
  });
  it('should clear the email error as soon as a valid email is provided', () => {
    setup();
    act(() => user.type(emailTextBox, 'test')); // eslint-disable-line
    user.tab();
    expect(getEmailErrorElement('getBy')).toBeInTheDocument();
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    expect(getEmailErrorElement()).not.toBeInTheDocument();
  });
  it('should show an error when a password is not provided after the password input losses focus', () => {
    setup();
    user.click(passwordTextBox);
    user.tab();
    expect(getPasswordErrorElement()).toBeInTheDocument();
  });
  it('should show a password invalid message if password strength does not match the requirements', () => {
    setup();
    act(() => user.type(passwordTextBox, 'test')); // eslint-disable-line
    expect(getPasswordInValidElement()).toBeInTheDocument();
  });
  it('should show a password is valid message if password strength matches requirements', () => {
    setup();
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    expect(getPasswordValidElement()).toBeInTheDocument();
  });
  it('should show an error when the passwordConfirm input loses focus and a password is not provided for the password or passwordConfirm inputs', () => {
    setup();
    expect(passwordTextBox).toHaveValue('');
    user.click(passwordConfirmTextBox);
    user.tab();
    expect(getPasswordConfirmErrorElement()).toBeInTheDocument();
  });
  it('should show an errror if the password and password confirm input values do not match', () => {
    setup();
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.type(passwordConfirmTextBox, 'test')); // eslint-disable-line
    user.tab();
    expect(getPasswordsDontMatch('getBy')).toBeInTheDocument();
  });
  it('should clear the errror when the password and password confirm input values do match', () => {
    setup();
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.type(passwordConfirmTextBox, formValues.password)); // eslint-disable-line
    user.tab();
    expect(getPasswordsDontMatch()).not.toBeInTheDocument();
  });
  it('should enable the login button if all fields are valid', () => {
    setup();
    act(() => user.type(firstNameTextBox, formValues.firstName)); // eslint-disable-line
    act(() => user.type(lastNameTextBox, formValues.lastName)); // eslint-disable-line
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.type(passwordConfirmTextBox, formValues.passwordConfirm)); // eslint-disable-line
    expect(registerButton).not.toHaveClass('Mui-disabled');
  });
  it('should clear the form values after submission', () => {
    setup();
    act(() => user.type(firstNameTextBox, formValues.firstName)); // eslint-disable-line
    act(() => user.type(lastNameTextBox, formValues.lastName)); // eslint-disable-line
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.type(passwordConfirmTextBox, formValues.passwordConfirm)); // eslint-disable-line
    act(() => user.click(registerButton)); // eslint-disable-line
    expect(firstNameTextBox).toHaveValue('');
    expect(lastNameTextBox).toHaveValue('');
    expect(emailTextBox).toHaveValue('');
    expect(passwordTextBox).toHaveValue('');
    expect(passwordConfirmTextBox).toHaveValue('');
  });
});
