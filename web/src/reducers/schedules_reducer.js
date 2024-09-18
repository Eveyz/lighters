const initialState = {
  schedules: [],
  schedule: {}
}

export default (state = initialState, action = {}) => {
  let idx;
  switch(action.type) {
    case "GET_SCHEDULES":
      return {
        schedule: state.schedule,
        schedules: [...action.payload]
      }
    case "ADD_SCHEDULE":
      return {
        schedule: action.payload,
        schedules: [...state.schedules, action.payload]
      }
    case "DELETE_SCHEDULE":
      return {
        schedule: state.schedule._id === action.payload ? {} : state.schedule,
        schedules: state.schedules.filter(schedule => schedule._id !== action.payload)
      }
    case "UPDATE_SCHEDULE":
      idx = state.schedules.findIndex(schedule => schedule._id === action.payload._id);
      return {
        schedule: action.payload,
        schedules: [...state.schedules.slice(0, idx), action.payload,    ...state.schedules.slice(idx + 1)]
      }
    case "SELECT_SCHEDULE":
      return {
        schedules: state.schedules,
        schedule: action.payload
      }
    default:
      return state;
  }
};