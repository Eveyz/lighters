const initialState = {
  currentBook: {},
  books: [],
  count: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_BOOKS':
      return {
        currentBook: state.currentBook,
        books: [...action.payload]
      }
    case 'GET_BOOKS_SIZE':
      return {
        currentBook: state.currentBook,
        books: [...state.books],
        count: action.payload
      }
    case 'SELECT_BOOK':
      return {
        currentBook: action.payload,
        books: [...state.books]
      }
    case 'ADD_BOOK':
      return {
        currentBook: action.payload,
        books: [...state.books, ...action.payload]
      }
    case 'DELETE_BOOK': 
      return {
        currentBook: state.currentBook._id === action.payload ? {} : state.currentBook,
        books: state.books.filter(book => book._id !== action.payload)
      }
    case 'UPDATE_BOOK':
      const idx = state.books.findIndex(book => book._id === action.payload._id);
      return {
        currentBook: action.payload,
        books: [
                    ...state.books.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.books.slice(idx + 1), // everything after current obj
                  ]
      }
    default:
      return state;
  }
};