import React, { useState, useEffect } from 'react';
import { KitContainer, KitAlert } from '@my2rela/react-kit';

import './CashierPage.scss';

import Cart from '../../components/sections/cart/Cart';
import Pay from '../../components/sections/pay/Pay';

import ListsInventories from '../../components/lists/inventories/ListsInventories';

import { createTicket } from '../../api/tickets/tickets.api';
import { createSales } from '../../api/sales/sales.api';

import {
  addToCart,
  getFromCart,
  minusToCart,
  removeFromCart,
  clearCart,
} from '../../helpers/storage';

const defaultMessage = {
  show: false,
  type: 'success',
  message: '',
};

const CashierPage = () => {
  const [cartData, setCartData] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    updateByStorage();
  }, []);

  useEffect(() => {
    Promise.all([
      cartData.map((c) => parseFloat(c.prices)),
    ]).then((r) => r.reduce((acc, cur) => acc + cur.reduce((a, c) => a + c, 0), 0)).then(setTotal);
  }, [cartData]);

  const updateByStorage = () => {
    setCartData(getFromCart());
  };

  const handleListSelect = (item) => {
    addToCart(item);
    updateByStorage();
  };

  const handleDecrementItem = (item) => {
    minusToCart(item);
    updateByStorage();
  };

  const handleRemove = (item) => {
    removeFromCart(item);
    updateByStorage();
  };

  const handlePay = async () => {
    setIsLoading(true);
    const res = await createSales(cartData, ticket);
    setIsLoading(false);

    if (res instanceof Error) {
      return setMessage({
        show: true,
        type: 'error',
        message: res.message,
      });
    }

    setMessage({
      show: true,
      type: 'success',
      message: res.message,
    });
    clearCart();
    setTicket(null);
    updateByStorage();

    return true;
  };

  const handleGenTicket = async () => {
    if (!ticket) {
      setIsLoading(true);
      const newTicket = await createTicket({ prices: 0 });
      setIsLoading(false);

      if (newTicket instanceof Error) {
        setMessage({
          show: true,
          type: 'error',
          message: newTicket.message,
        });
      } else {
        setMessage({
          show: true,
          type: 'success',
          message: newTicket.message,
        });
        setTicket(newTicket.ticket);
      }
    }
  };

  const handleAlertClose = () => {
    setMessage(defaultMessage);
  };

  return (
    <KitContainer className="page-cashier">
      <KitAlert isOpen={message.show} type={message.type} onClose={handleAlertClose}>
        {message.message}
      </KitAlert>
      <div className="page-cashier__action">
        <Pay
          onClose={handlePay}
          onOpen={handleGenTicket}
          total={total}
          ticket={ticket}
          loading={isLoading}
        />
      </div>
      <div className="page-cashier__cart">
        <Cart
          items={cartData}
          onIncrement={handleListSelect}
          onDecrement={handleDecrementItem}
          onRemove={handleRemove}
        />
      </div>
      <div className="page-cashier__list">
        <ListsInventories onSelect={handleListSelect} />
      </div>
    </KitContainer>
  );
};

export default CashierPage;
