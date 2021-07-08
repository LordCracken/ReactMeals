import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

import CartIcon from '../../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items!.reduce((curNumber, item) => curNumber + item.amount, 0);

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
