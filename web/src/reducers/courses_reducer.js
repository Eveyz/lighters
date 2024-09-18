const initialState = {
  currentCourse: {},
  searchStudent: true,
  courses: [],
  count: 0
}

const updateCourse = (state, action, idx) => {
  idx = state.courses.findIndex(course => course._id === action.payload._id);
  return {
    currentCourse: action.payload,
    searchStudent: state.searchStudent,
    courses: [
                ...state.courses.slice(0, idx), // everything before current obj
                action.payload,
                ...state.courses.slice(idx + 1), // everything after current obj
              ]
  }
}

export default (state = initialState, action = {}) => {
  let idx;
  switch(action.type) {
    case "GET_COURSES":
      return {
        currentCourse: state.currentCourse,
        searchStudent: state.searchStudent,
        courses: [...action.payload]
      }
    case 'GET_COURSES_SIZE':
      return {
        currentCourse: state.currentCourse,
        searchStudent: state.searchStudent,
        courses: [...state.courses],
        count: action.payload
      }
    case "ADD_COURSE":
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: [...state.courses, action.payload]
      }
    case "DELETE_COURSE":
      return {
        currentCourse: state.currentCourse._id === action.payload ? {} : state.currentCourse,
        searchStudent: state.searchStudent,
        courses: state.courses.filter(course => course._id !== action.payload)
      }
    case "UPDATE_COURSE":
      idx = state.courses.findIndex(course => course._id === action.payload._id);
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: [
                    ...state.courses.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.courses.slice(idx + 1), // everything after current obj
                  ]
      }
    case "SELECT_COURSE":
      return {
        currentCourse: action.payload,
        searchStudent: state.searchStudent,
        courses: state.courses
      }
    case "SWITCH_MODE":
      return {
        currentCourse: state.currentCourse,
        searchStudent: action.payload,
        courses: state.courses
      }
    case "COURSE_POST_STUDENT":
      return updateCourse(state, action, idx);
    case "COURSE_DELETE_STUDENT":
      return updateCourse(state, action, idx);
    case "COURSE_ADD_BOOK":
      return updateCourse(state, action, idx);
    case "COURSE_REMOVE_BOOK":
      return updateCourse(state, action, idx);
    default:
      return state;
  }
};