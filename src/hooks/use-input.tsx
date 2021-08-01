import React, { useReducer } from 'react';

type ValidateFunc = (value: string) => boolean;

interface InputState {
  value: string;
  isTouched: boolean;
}

enum ActionType {
  input = 'INPUT',
  blur = 'BLUR',
}

interface InputAction {
  type: ActionType;
  value?: string;
}

const initialInputState: InputState = { value: '', isTouched: false };

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === ActionType.input) return { value: action.value!, isTouched: state.isTouched };
  if (action.type === ActionType.blur) return { value: state.value, isTouched: true };

  return initialInputState;
};

const useInput = (validateValue: ValidateFunc, className: string, invalidClass: string) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const isValid = validateValue(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const classes = `${className} ${!hasError ? '' : invalidClass}`;

  const valueChangeHadler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.input, value: event.target.value });
  };

  const inputBlurHandler = () => dispatch({ type: ActionType.blur });

  return { value: inputState.value, isValid, hasError, classes, valueChangeHadler, inputBlurHandler };
};

export default useInput;
