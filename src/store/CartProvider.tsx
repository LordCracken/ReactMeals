import { useReducer } from 'react';
import CartContext, { CartContextProps, CartData, Item } from './cart-context';

interface Action {
  type: CartAction;
  id?: string;
  item?: Item;
}

enum CartAction {
  Add = 'ADD',
  Remove = 'REMOVE',
}

const defaultCartState: CartData = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartData, action: Action): CartData => {
  if (action.type === CartAction.Add) {
    const updatedItems = state.items.concat(action.item!);
    const newTotalAmount = state.totalAmount + action.item!.price * action.item!.amount;
    return { items: updatedItems, totalAmount: newTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: CartAction.Add, item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: CartAction.Remove, id: id });
  };

  const cartContext: CartContextProps = {
    items: cartState!.items,
    totalAmount: cartState!.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
