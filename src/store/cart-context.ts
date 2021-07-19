import React from 'react';

import { CartItem } from './CartProvider';

interface CartContextState {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext({} as CartContextState);

export default CartContext;
