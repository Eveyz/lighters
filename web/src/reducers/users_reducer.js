export default (state = "", action) => {
  switch(action.type) {
    case 'SET_ADMIN': 
      return action.payload;
    case 'SET_TEACHER': 
      return action.payload;
    case 'SET_STUDENT': 
      return action.payload;
    default:
      return state;
  }
};