import { connect } from 'react-redux';
import { userFromToken, resetToken, adminInit } from '../actions/users_actions';
import { selectCategory } from '../actions/select_book_actions';
import App from '../components/App';

// Actions
import { getTeacher } from '../actions/teachers_actions';
import { getStudent } from '../actions/students_actions';

const mapStateToProps = state => {
  // this.props.search
  return {
    auth: state.auth,
    category: state.selectBooks.category,
    review_category: state.reviewBooks.category,
    new_category: state.newBooks.category,
    future_category: state.futureBooks.category
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = localStorage.getItem("jwtToken");
  return {
    loadUserFromToken: () => {
      if(!token || token === "") {//if there is no token, dont bother
        return;
      }
      //fetch user from token (if server deems it’s valid token)
      dispatch(userFromToken(token))
    },
    adminInit: () => {
      if(!token || token === "") {//if there is no token, dont bother
        return;
      }
      dispatch(adminInit(token))
    },
    resetMe: () => { // logout
      dispatch(resetToken());
    },
    selectCategory: (category, content) => dispatch(selectCategory(category, content)),
    getTeacher: (id) => {
      dispatch(getTeacher(id))
    },
    getStudent: (id) => {
      dispatch(getStudent(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);