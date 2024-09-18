import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  identityData: {}
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        identityData: {}
      }
    case "SET_CURRENT_IDENTITY_DATA":
      return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        identityData: action.identityData
      }
    case "RESET_TOKEN":
      return initialState
    default:
      return state;
  }
};