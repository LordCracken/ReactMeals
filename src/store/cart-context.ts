import React from 'react';

export interface CartContextData {
  items: [];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<Partial<CartContextData>>({});

export default CartContext;
