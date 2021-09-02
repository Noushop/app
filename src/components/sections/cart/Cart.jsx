import React from 'react';

import './Cart.scss';

import { KitButton } from '@my2rela/react-kit';

const Cart = (props) => {
  const {
    items,
    onIncrement,
    onDecrement,
    onRemove,
  } = props;

  const renderItems = () => items.map((i) => (
    <div key={i.barcode} className="cart-comp__list-item">
      <span>{i.name} - {i.barcode}</span>
      <span>Unit price: {i.price}</span>
      <span>Command Quantities: {i.quantity}</span>
      <div className="cart-comp__list-item__action">
        <KitButton className="item__action-button minus" onClick={() => onDecrement(i)}>-1</KitButton>
        <KitButton className="item__action-button plus" onClick={() => onIncrement(i)}>+1</KitButton>
        <KitButton className="item__action-button remove" onClick={() => onRemove(i)}>x</KitButton>
      </div>
    </div>
  ));

  return (
    <div className="cart-comp">
      <h4>Cart items</h4>
      <div className="cart-comp__list">
        {renderItems()}
      </div>
    </div>
  );
};

export default Cart;
