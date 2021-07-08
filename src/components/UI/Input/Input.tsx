import React from 'react';

import classes from './Input.module.css';

interface InputProps {
  input: { type: string; id?: string; min?: string; max?: string; step?: string; defaultValue?: string };
  label: string;
}

const Input = React.forwardRef(({ input, label }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
