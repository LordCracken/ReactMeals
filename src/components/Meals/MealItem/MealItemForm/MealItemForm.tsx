import Input from '../../../UI/Input/Input';

import classes from './MealItemForm.module.css';

interface MealItemFormProps {
  id: string;
}

const MealItemForm = ({ id }: MealItemFormProps) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{ id: `amount${id}`, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1' }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
