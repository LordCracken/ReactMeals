import { useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import { CartItem as CartItemProps } from '../../store/CartProvider';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

import classes from './Cart.module.css';

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = !!cartCtx.items.length;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemProps) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => setIsCheckout(true);

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
