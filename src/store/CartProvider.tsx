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
    const newTotalAmount = state.totalAmount + action.item!.price * action.item!.amount;

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item!.id);
    const existingCartItem = state.items![existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item!.amount };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item!);
    }

    return { items: updatedItems, totalAmount: newTotalAmount };
  }

  if (action.type === CartAction.Remove) {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items![existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id!);
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
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
