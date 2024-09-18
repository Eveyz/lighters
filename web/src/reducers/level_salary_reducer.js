const initialState = {
  currentLevelSalary: {},
  levelSalaries: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_LEVEL_SALARY':
      return {
        currentLevelSalary: state.currentLevelSalary,
        levelSalaries: [...action.payload]
      }
    case 'ADD_LEVEL_SALARY':
      return {
        currentLevelSalary: action.payload,
        levelSalaries: [...state.levelSalaries, action.payload]
      }
    case 'DELETE_LEVEL_SALARY': 
      return {
        currentLevelSalary: state.currentLevelSalary._id === action.payload ? {} : state.currentLevelSalary,
        levelSalaries: state.levelSalaries.filter(ls => ls._id !== action.payload)
      }
    case 'UPDATE_LEVEL_SALARY':
      const idx = state.levelSalaries.findIndex(ls => ls._id === action.payload._id);
      return {
        currentLevelSalary: action.payload,
        levelSalaries: [
                    ...state.levelSalaries.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.levelSalaries.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};