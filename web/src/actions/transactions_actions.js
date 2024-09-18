import axios from 'axios';

import { GET_TRANSACTIONS, GET_TRANSACTIONS_FAILURE, ADD_TRANSACTION, ADD_TRANSACTION_FAILURE, UPDATE_TRANSACTION, UPDATE_TRANSACTION_FAILURE, DELETE_TRANSACTION, DELETE_TRANSACTION_FAILURE } from './constants';

export const getTransactions = (query) => {
  return (dispatch) => {
    axios.get(`/transactions/${query}`).then((response) => {
      dispatch({type: GET_TRANSACTIONS, payload: response.data})
    }).catch((err) => {
      dispatch({type: GET_TRANSACTIONS_FAILURE, payload: "there was an error while fetching transactions"})
    })
  }
}

export const addTransaction = (transaction) => {
  return (dispatch) => {
    axios.post(`/transactions`, transaction)
      .then((response) => {
        dispatch({type: ADD_TRANSACTION, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: ADD_TRANSACTION_FAILURE, payload: "there was an error while posting a new entry"})
      })
  }
};

export const updateTransaction = (_id, transaction) => {
  return (dispatch) => {
    axios.put(`/transactions/${_id}`, transaction)
      .then((response) => {
        dispatch({type: UPDATE_TRANSACTION, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: UPDATE_TRANSACTION_FAILURE, payload: err})
      })
  }
};

export const deleteTransaction = (id) => {
  return (dispatch) => {
    axios.delete(`/transactions/${id}`)
      .then((response) => {
        dispatch({type: DELETE_TRANSACTION, payload: id})
      })
      .catch((err) => {
        dispatch({type: DELETE_TRANSACTION_FAILURE, payload: err})
      })
  }
};