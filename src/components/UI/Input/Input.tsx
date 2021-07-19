import React from 'react';

import classes from './Input.module.css';

interface InputProps {
  label: string;
  input: { id: string; type: 'text' | 'number'; min?: number; max?: number; step?: number; defaultValue?: string };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, input }, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
