import React, { useContext } from 'react';
import { CounterContext } from '../context/CounterContext';

import './totalModules.scss';

export const TotalModules = () => {
  const { totalModules } = useContext(CounterContext);

  return (
    <h2 className="totalModules">
      Total modules:
      {` `}
      <span className="totalModules__count">
        (
        {totalModules}
        )
      </span>
    </h2>
  );
};
