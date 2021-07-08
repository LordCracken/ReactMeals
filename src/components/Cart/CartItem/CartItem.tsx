import classes from './CartItem.module.css';

interface CartItemProps {
  name: string;
  amount: number;
  price: number;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItem = ({ name, amount, price, onAdd, onRemove }: CartItemProps) => {
  const priceTag = `$${price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{priceTag}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
