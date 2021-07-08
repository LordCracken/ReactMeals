import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import MealItemForm from './MealItemForm/MealItemForm';

import classes from './MealItem.module.css';

interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MealItem = ({ id, name, description, price }: MealItemProps) => {
  const cartCtx = useContext(CartContext);
  const priceTag = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem!({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceTag}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
