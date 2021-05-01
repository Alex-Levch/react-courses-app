import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CounterContext = createContext(0);

export const CounterContextProvider = ({ children }) => {
  const [totalModules, setTotalModules] = useState(0);

  const contextValue = {
    totalModules,
    setTotalModules,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
