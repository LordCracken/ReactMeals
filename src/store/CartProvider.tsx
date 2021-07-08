import CartContext, { CartContextData } from './cart-context';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const addItemToCartHandler = () => {};

  const removeItemFromCartHandler = () => {};

  const cartContext: CartContextData = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
