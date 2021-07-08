import React from 'react';

export interface Item {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface CartData {
  items: Item[];
  totalAmount: number;
}

export interface CartContextProps extends CartData {
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<Partial<CartContextProps>>({});

export default CartContext;
