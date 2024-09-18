const initialState = {
  currentTransaction: {},
  transactions: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        currentTransaction: state.currentTransaction,
        transactions: [...action.payload]
      }
    case 'ADD_TRANSACTION':
      return {
        currentTransaction: action.payload,
        transactions: [...state.transactions, action.payload]
      }
    case 'DELETE_TRANSACTION': 
      return {
        currentTransaction: state.currentTransaction._id === action.payload ? {} : state.currentTransaction,
        transactions: state.transactions.filter(ls => ls._id !== action.payload)
      }
    case 'UPDATE_TRANSACTION':
      const idx = state.transactions.findIndex(ls => ls._id === action.payload._id);
      return {
        currentTransaction: action.payload,
        transactions: [
                    ...state.transactions.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.transactions.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};