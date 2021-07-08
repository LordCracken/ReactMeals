import classes from './Input.module.css';

interface InputProps {
  input: { type: string; id?: string; min?: string; max?: string; step?: string; defaultValue?: string };
  label: string;
}

const Input = ({ input, label }: InputProps) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} />
    </div>
  );
};

export default Input;
