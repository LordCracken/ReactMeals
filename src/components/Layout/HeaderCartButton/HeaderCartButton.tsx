import CartIcon from '../../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps) => (
  <button className={classes.button} onClick={onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>3</span>
  </button>
);

export default HeaderCartButton;
