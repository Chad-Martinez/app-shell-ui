import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import { ChangeEvent, FocusEvent } from 'react';

interface IMaskedInputProps {
  mask: string;
  value: string;
  id: string;
  inputName: string;
  label: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  blurHandler: (event: FocusEvent<HTMLInputElement>) => void;
  inputHasError: boolean;
  isRequired: boolean;
  errorMessage: string;
}

const MaskedInput = ({
  mask,
  id,
  value,
  changeHandler,
  blurHandler,
  inputName,
  isRequired,
  label,
  inputHasError,
  errorMessage,
}: IMaskedInputProps) => {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={changeHandler}
      onBlur={blurHandler}
    >
      <TextField
        margin='dense'
        type='tel'
        fullWidth
        label={label}
        id={inputName}
        name={inputName}
        required={isRequired}
        error={inputHasError}
        helperText={inputHasError && errorMessage}
      />
    </InputMask>
  );
};

export default MaskedInput;
