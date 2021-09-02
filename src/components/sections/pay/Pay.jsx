import React, { useState, useEffect } from 'react';
import {
  KitButton,
  KitSpinner,
  KitTextField,
} from '@my2rela/react-kit';

import './Pay.scss';

const Pay = (props) => {
  const {
    onClose,
    onOpen,
    total,
    ticket,
    loading,
  } = props;

  const [returnedAmount, setReturnedAmount] = useState(0);
  const [payroll, setPayroll] = useState('');

  useEffect(() => {
    setReturnedAmount(payroll - total);
  }, [total]);

  const handleBackMoney = (e) => {
    setPayroll(e.target.value);
    setReturnedAmount(e.target.value - total);
  };

  const handlePayClick = () => {
    setReturnedAmount(0);
    setPayroll(0);
    onClose();
  };

  const isValidAmout = () => !ticket
    || total < 1
    || total > payroll
    || loading;

  return (
    <div className="pay-comp">
      <div className="pay-comp__recap">
        <span className="pay-comp__recap__total pay-comp__recap__item"><b>Total: </b>{total}</span>
        <span className="pay-comp__recap__amount pay-comp__recap__item"><b>Returned amount: </b>{returnedAmount}</span>
        <span className="pay-comp__recap__ticket pay-comp__recap__item"><b>Ticket N°: </b>{ticket}</span>
        <KitTextField className="pay-comp__recap__item" label="Payroll" type="number" onChange={handleBackMoney} value={payroll} />
      </div>
      <KitSpinner show={loading} />
      <div className="pay-comp__gen-ticket">
        <KitButton
          onClick={onOpen}
          disabled={ticket || total < 1 || loading}
          className="pay-comp__gen-ticket__button"
        >
          Open ticket
        </KitButton>
        <KitButton
          onClick={() => handlePayClick()}
          disabled={isValidAmout()}
          className="pay-comp__gen-ticket__button"
        >
          Close ticket
        </KitButton>
      </div>
    </div>
  );
};

export default Pay;
