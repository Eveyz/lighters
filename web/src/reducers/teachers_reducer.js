const initialState = {
  currentTeacher: {},
  teachers: [],
  count: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "GET_TEACHERS":
      return {
        currentTeacher: state.currentTeacher,
        teachers: [...action.payload]
      }
    case 'GET_TEACHERS_SIZE':
      return {
        currentTeacher: state.currentTeacher,
        teachers: [...state.teachers],
        count: action.payload
      }
    case "ADD_TEACHER":
      return {
        currentTeacher: action.payload,
        teachers: [...state.teachers, ...action.payload]
      }
    case "DELETE_TEACHER": 
      return {
        currentTeacher: state.currentTeacher._id === action.payload ? {} : state.currentTeacher,
        teachers: state.teachers.filter(teacher => teacher._id !== action.payload)
      }
    case "UPDATE_TEACHER":
      const idx = state.teachers.findIndex(teacher => teacher._id === action.payload._id);
      return {
        currentTeacher: action.payload,
        teachers: [
                    ...state.teachers.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.teachers.slice(idx + 1), // everything after current obj
                  ]
      }
    case "SELECT_TEACHER":
      return {
        currentTeacher: action.payload,
        teachers: state.teachers
      }
    default:
      return state;
  }
};