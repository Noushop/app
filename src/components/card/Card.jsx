import React from 'react';

import './Card.scss';

const Card = (props) => {
  const { children, className } = props;

  return (
    <div className={`cmp-card ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default Card;
