import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer.js";

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const MoneyManagerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

    console.log(transactions);
  //Action Creators
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce((accumulator, currValue) => {
    return (currValue.type === 'Expense' ? accumulator - currValue.amount : accumulator + currValue.amount);
   }, 0);
  //0 is the starting or default value
  return (
    <MoneyManagerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </MoneyManagerContext.Provider>
  );
};
