const initialState = {
  paycheck: {},
  paychecks: [],
  count: 0
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "GET_PAYCHECKS":
      return {
        paycheck: state.paycheck,
        paychecks: action.payload
      }
    case 'GET_PAYCHECKS_SIZE':
      return {
        paycheck: state.paycheck,
        paychecks: [...state.paychecks],
        count: action.payload
      }
    case 'ADD_PAYCHECK':
      return {
        paycheck: action.payload,
        paychecks: [...state.paychecks, action.payload]
      }
    case 'DELETE_PAYCHECK': 
      return {
        paycheck: state.paycheck._id === action.payload ? {} : state.paycheck,
        paychecks: state.paychecks.filter(ls => ls._id !== action.payload)
      }
    case 'UPDATE_PAYCHECK':
      const idx = state.paychecks.findIndex(ls => ls._id === action.payload._id);
      return {
        paycheck: action.payload,
        paychecks: [
                    ...state.paychecks.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.paychecks.slice(idx + 1), // everything after current obj
                  ]
      }
    case 'SELECT_PAYCHECK': 
      return {
        paycheck: action.payload,
        paychecks: state.paychecks
      }
    default:
      return state;
  }
};