import MealItemForm from './MealItemForm/MealItemForm';

import classes from './MealItem.module.css';

interface MealItemProps {
  name: string;
  description: string;
  price: number;
}

const MealItem = ({ name, description, price }: MealItemProps) => {
  const priceTag = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceTag}</div>
      </div>
      <div></div>
    </li>
  );
};

export default MealItem;
