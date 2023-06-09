import { render, screen, renderHook, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import useInput from '../hooks/useInput';
import { TextField } from '@mui/material';
import { ChangeEvent, FocusEvent } from 'react';

describe('useInput', () => {
  const validateInput = (value: string): boolean => {
    return value === 'valid';
  };

  let inputField: HTMLInputElement;
  const setup = (
    valueChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void,
    inputBlurHandler: (event: FocusEvent<HTMLInputElement>) => void
  ) => {
    render(
      <TextField
        label='test'
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
      />
    );
    inputField = screen.getByRole('textbox', {
      name: /test/i,
    });
  };

  it('should set value variable to match user input', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });
    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'test');
    act(() => expect(result.current.value).toMatch(/test/));
  });
  it('should set isValid to true if the user input is valid', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });

    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'valid');
    act(() => expect(result.current.isValid).toBe(true));
  });
  it('should set isValid to false if the user input is valid', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });

    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'invalid');
    act(() => expect(result.current.isValid).toBe(false));
  });
  it('should set hasError to false if the user input is valid and the input element has lost focus', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });

    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'valid');
    user.tab();
    act(() => expect(result.current.hasError).toBe(false));
  });
  it('should set hasError to true if the user input is invalid and the input element has lost focus', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });

    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'invalid');
    user.tab();
    act(() => expect(result.current.hasError).toBe(true));
  });
  it('should reset state values when the reset function is called', () => {
    const { result } = renderHook(useInput, {
      initialProps: validateInput,
    });

    setup(result.current.valueChangeHandler, result.current.inputBlurHandler);

    user.type(inputField, 'invalid');
    user.tab();
    act(() => expect(result.current.value).toMatch(/invalid/));
    act(() => expect(result.current.hasError).toBe(true));
    act(() => result.current.reset());

    act(() => expect(result.current.value).toBeFalsy());
    act(() => expect(result.current.hasError).toBe(false));
  });
});
