import { useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import { CartItem as CartItemProps } from '../../store/CartProvider';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

import classes from './Cart.module.css';

export interface UserData {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  const tryAgainHandler = () => setError(null);

  const submitOrderHandler = async (userData: UserData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://reactmeals-6aaed-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      });

      if (!response.ok) throw new Error(`Catched error with ${response.status} status`);

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && hasItems && <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />}
      {(!isCheckout || !hasItems) && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const isErrorModalContent = (
    <>
      <p>{error}</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onClose}>
          Close
        </button>
        <button className={classes.button} onClick={tryAgainHandler}>
          Try Again
        </button>
      </div>
    </>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully sent order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !didSubmit && !error && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {error && isErrorModalContent}
    </Modal>
  );
};

export default Cart;
