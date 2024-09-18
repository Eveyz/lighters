import { 
  SELECT_CATEGORY, SELECT_SERIAL, RESET_SELECT_BOOKS, SELECT_ADD_BOOK, SELECT_REMOVE_BOOK, SELECT_ADD_KEYWORD, SELECT_REMOVE_KEYWORD,
  REVIEW_RESET_SELECT_BOOKS, REVIEW_SELECT_CATEGORY, REVIEW_SELECT_SERIAL, REVIEW_ADD_BOOKS, REVIEW_UPDATE_BOOKS, REVIEW_REMOVE_BOOKS, REVIEW_ADD_KEYWORD, REVIEW_REMOVE_KEYWORD,
  NEW_RESET_SELECT_BOOKS, NEW_SELECT_CATEGORY, NEW_SELECT_SERIAL, NEW_ADD_BOOKS, NEW_UPDATE_BOOKS, NEW_REMOVE_BOOKS, NEW_ADD_KEYWORD, NEW_REMOVE_KEYWORD,
  FUTURE_RESET_SELECT_BOOKS, FUTURE_SELECT_CATEGORY, FUTURE_SELECT_SERIAL, FUTURE_ADD_BOOKS, FUTURE_UPDATE_BOOKS, FUTURE_REMOVE_BOOKS, FUTURE_ADD_KEYWORD, FUTURE_REMOVE_KEYWORD,
  GROUPED_BOOKS
} from './constants';
import { groupBooks } from '../ultis';

export const resetDeault = (content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_RESET_SELECT_BOOKS, payload: ""});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_RESET_SELECT_BOOKS, payload: ""});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_RESET_SELECT_BOOKS, payload: ""});
      }
    default:
      return (dispatch) => {
        dispatch({type: RESET_SELECT_BOOKS, payload: ""});
      }
  }
};

export const selectCategory = (category, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_SELECT_CATEGORY, payload: category});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_SELECT_CATEGORY, payload: category});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_SELECT_CATEGORY, payload: category});
      }
    default:
      return (dispatch) => {
        dispatch({type: SELECT_CATEGORY, payload: category});
      }
  }
};

export const selectSerial = (serialName, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_SELECT_SERIAL, payload: serialName});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_SELECT_SERIAL, payload: serialName});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_SELECT_SERIAL, payload: serialName});
      }
    default:
      return dispatch => {
        dispatch({type: SELECT_SERIAL, payload: serialName})
      }
  }
};

export const appendBook = (book, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_ADD_BOOKS, payload: book});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_ADD_BOOKS, payload: book});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_ADD_BOOKS, payload: book});
      }
    default:
      return dispatch => {
        dispatch({type: SELECT_ADD_BOOK, payload: book})
      }
  }
}

export const removeSelectedBook = (book, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_REMOVE_BOOKS, payload: book});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_REMOVE_BOOKS, payload: book});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_REMOVE_BOOKS, payload: book});
      }
    default:
      return dispatch => {
        dispatch({type: SELECT_REMOVE_BOOK, payload: book})
      }
  }
}

export const updateBooks = (review_books, new_books, future_books) => {
  return (dispatch) => {
    dispatch({type: REVIEW_UPDATE_BOOKS, payload: review_books});
    dispatch({type: NEW_UPDATE_BOOKS, payload: new_books});
    dispatch({type: FUTURE_UPDATE_BOOKS, payload: future_books});
  }
}

export const addKeyword = (keyword, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_ADD_KEYWORD, payload: keyword});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_ADD_KEYWORD, payload: keyword});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_ADD_KEYWORD, payload: keyword});
      }
    default:
      return dispatch => {
        dispatch({type: SELECT_ADD_KEYWORD, payload: keyword})
      }
  }
}

export const removeKeyword = (keyword, content) => {
  switch(content) {
    case 'REVIEW':
      return (dispatch) => {
        dispatch({type: REVIEW_REMOVE_KEYWORD, payload: keyword});
      }
    case 'NEW':
      return (dispatch) => {
        dispatch({type: NEW_REMOVE_KEYWORD, payload: keyword});
      }
    case 'FUTURE':
      return (dispatch) => {
        dispatch({type: FUTURE_REMOVE_KEYWORD, payload: keyword});
      }
    default:
      return dispatch => {
        dispatch({type: SELECT_REMOVE_KEYWORD, payload: keyword})
      }
  }
}

export const groupBooksAction = (books) => {
  return dispatch => {
    dispatch({type: GROUPED_BOOKS, payload: groupBooks(books)})
  }
}