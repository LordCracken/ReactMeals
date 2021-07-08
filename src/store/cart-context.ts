import React from 'react';

interface Item {
  amount: number;
}

export interface CartContextData {
  items: Item[];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<Partial<CartContextData>>({});

export default CartContext;
