import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/cart-context';

import CartIcon from '../../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState<boolean>(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => curNumber + item.amount, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (!items) return;

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => setBtnIsHighlighted(false), 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
