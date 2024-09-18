const initialState = {
  currentCompensation: {},
  compensations: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COMPENSATIONS':
      return {
        currentCompensation: state.currentCompensation,
        compensations: [...action.payload]
      }
    case 'ADD_COMPENSATION':
      return {
        currentCompensation: action.payload,
        compensations: [...state.compensations, action.payload]
      }
    case 'DELETE_COMPENSATION': 
      return {
        currentCompensation: state.currentCompensation._id === action.payload ? {} : state.currentCompensation,
        compensations: state.compensations.filter(ls => ls._id !== action.payload)
      }
    case 'UPDATE_COMPENSATION':
      const idx = state.compensations.findIndex(ls => ls._id === action.payload._id);
      return {
        currentCompensation: action.payload,
        compensations: [
                    ...state.compensations.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.compensations.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};