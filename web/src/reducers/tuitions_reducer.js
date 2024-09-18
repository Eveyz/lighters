const initialState = {
  currentTuition: {},
  tuitions: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TUITIONS':
      return {
        currentTuition: state.currentTuition,
        tuitions: [...action.payload]
      }
    case 'ADD_TUITION':
      return {
        currentTuition: action.payload,
        tuitions: [...state.tuitions, action.payload]
      }
    case 'DELETE_TUITION': 
      return {
        currentTuition: state.currentTuition._id === action.payload ? {} : state.currentTuition,
        tuitions: state.tuitions.filter(ls => ls._id !== action.payload)
      }
    case 'UPDATE_TUITION':
      const idx = state.tuitions.findIndex(ls => ls._id === action.payload._id);
      return {
        currentTuition: action.payload,
        tuitions: [
                    ...state.tuitions.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.tuitions.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};