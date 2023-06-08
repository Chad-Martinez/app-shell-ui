// /* eslint-disable */
import { screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { render } from './test-utils';
import user from '@testing-library/user-event';
import Login from '../pages/Login';

type FormValues = {
  email: string;
  password: string;
};

describe('<Login />', () => {
  let formValues: FormValues;
  let emailTextBox: HTMLInputElement;
  let passwordTextBox: HTMLInputElement;
  let loginButton: HTMLButtonElement;

  const getEmailErrorElement = (getBy = true): HTMLElement | null => {
    if (getBy) return screen.getByText(/enter a valid email\./i);
    return screen.queryByText(/enter a valid email\./i);
  };

  const getPasswordErrorElement = (getBy = true): HTMLElement | null => {
    if (getBy) return screen.getByText(/password required\./i);
    return screen.queryByText(/password required\./i);
  };

  const setup = () => {
    render(<Login />);
    emailTextBox = screen.getByRole('textbox', {
      name: /email/i,
    });
    passwordTextBox = screen.getByTestId('password');
    loginButton = screen.getByRole('button', { name: /login/i });
  };

  beforeEach(() => {
    formValues = {
      email: 'test@test.com',
      password: 'TestablePassablePassword1!',
    };
  });
  it('renders login component', () => {
    render(<Login />);
  });
  it('renders email input and sets the focus when the page loads', () => {
    setup();
    expect(emailTextBox).toBeInTheDocument();
    expect(emailTextBox).toHaveFocus();
  });
  it('renders password input', () => {
    setup();
    expect(passwordTextBox).toBeInTheDocument();
  });
  it('renders login button', () => {
    setup();
    expect(loginButton).toBeInTheDocument();
  });
  it('email field should accept input', () => {
    setup();
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    expect(emailTextBox).toHaveValue(formValues.email);
  });
  it('password field should accept input', () => {
    setup();
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    expect(passwordTextBox).toHaveValue(formValues.password);
  });
  it('should show an error when an email is not provided after the email input losses focus', () => {
    setup();
    user.tab();
    expect(getEmailErrorElement()).toBeInTheDocument();
  });
  it('should show an error when the email input element losses focus if the input is not a valid email address', async () => {
    setup();
    act(() => user.type(emailTextBox, 'test@test')); // eslint-disable-line
    user.tab();
    expect(getEmailErrorElement()).toBeInTheDocument();
  });
  it('should clear the email error as soon as a valid email is provided', () => {
    setup();
    act(() => user.type(emailTextBox, 'test')); // eslint-disable-line
    user.tab();
    expect(getEmailErrorElement()).toBeInTheDocument();
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    expect(getEmailErrorElement(false)).not.toBeInTheDocument();
  });
  it('should show an error when a password is not provided after the password input losses focus', () => {
    setup();
    user.tab();
    expect(passwordTextBox).toHaveFocus();
    user.tab();
    expect(getPasswordErrorElement()).toBeInTheDocument();
  });
  it('should clear the password error as soon as a password is provided', () => {
    setup();
    user.tab();
    expect(passwordTextBox).toHaveFocus();
    expect(passwordTextBox).toHaveValue('');
    user.tab();
    expect(getPasswordErrorElement()).toBeInTheDocument();
    act(() => user.click(passwordTextBox)); // eslint-disable-line
    expect(passwordTextBox).toHaveFocus();
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    expect(getPasswordErrorElement(false)).not.toBeInTheDocument();
  });
  it('should enable the login button if all fields are valid', () => {
    setup();
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    expect(loginButton).not.toHaveClass('Mui-disabled');
  });
  it('should clear the form values after submission', () => {
    setup();
    act(() => user.type(emailTextBox, formValues.email)); // eslint-disable-line
    act(() => user.type(passwordTextBox, formValues.password)); // eslint-disable-line
    act(() => user.click(loginButton)); // eslint-disable-line
    expect(emailTextBox).toHaveValue('');
    expect(passwordTextBox).toHaveValue('');
  });
});
