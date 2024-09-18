const initialState = {
  currentTeacherRate: {},
  teacherRates: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_TEACHER_RATES':
      return {
        currentTeacherRate: state.currentTeacherRate,
        teacherRates: [...action.payload]
      }
    case 'ADD_TEACHER_RATE':
      return {
        currentTeacherRate: action.payload,
        teacherRates: [...state.teacherRates, action.payload]
      }
    case 'DELETE_TEACHER_RATE': 
      return {
        currentTeacherRate: state.currentTeacherRate._id === action.payload ? {} : state.currentTeacherRate,
        teacherRates: state.teacherRates.filter(tr => tr._id !== action.payload)
      }
    case 'UPDATE_TEACHER_RATE':
      const idx = state.teacherRates.findIndex(tr => tr._id === action.payload._id);
      return {
        currentTeacherRate: action.payload,
        teacherRates: [
                    ...state.teacherRates.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.teacherRates.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};