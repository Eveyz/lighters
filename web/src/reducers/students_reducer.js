const initialState = {
  currentStudent: {},
  students: [],
  lowBalanceStudents: [],
  count: 0,
  reports: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_STUDENTS':
      return {
        ...state,
        currentStudent: state.currentStudent,
        students: [...action.payload],
        lowBalanceStudents: [...state.lowBalanceStudents]
      }
    case 'GET_LOW_BALANCE_STUDENTS':
      return {
        ...state,
        currentStudent: state.currentStudent,
        students: [...state.students],
        lowBalanceStudents: [...action.payload],
      }
    case 'GET_STUDENTS_SIZE':
      return {
        currentStudent: state.currentStudent,
        students: [...state.students],
        lowBalanceStudents: [...state.lowBalanceStudents],
        count: action.payload
      }
    case 'ADD_STUDENT':
      return {
        ...state,
        currentStudent: action.payload,
        students: [...state.students, ...action.payload],
        lowBalanceStudents: [...state.lowBalanceStudents]
      }
    case 'DELETE_STUDENT': 
      return {
        ...state,
        currentStudent: state.currentStudent._id === action.payload ? {} : state.currentStudent,
        students: state.students.filter(student => student._id !== action.payload),
        lowBalanceStudents: [...state.lowBalanceStudents]
      }
    case 'UPDATE_STUDENT':
      const idx = state.students.findIndex(student => student._id === action.payload._id);
      return {
        ...state,
        currentStudent: action.payload,
        students: [
                    ...state.students.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.students.slice(idx + 1), // everything after current obj
                  ],
        lowBalanceStudents: [...state.lowBalanceStudents]
      }
    case "SELECT_STUDENT":
      return {
        ...state,
        currentStudent: action.payload,
        students: [...state.students],
        lowBalanceStudents: [...state.lowBalanceStudents]
      }
    case "GET_STUDENT_REPORTS_BEGIN":
      return {
        ...state,
        loading: true,
        error: null
      }
    case "GET_STUDENT_REPORTS_SUCCESS":
      return {
        ...state,
        reports: action.payload,
        loading: false,
        error: null
      }
    case "GET_STUDENT_REPORTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
};