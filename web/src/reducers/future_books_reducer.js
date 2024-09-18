const initialState = {
  groupedBooks: {},
  categories: [],
  category: "",
  serialName: "",
  books: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'FUTURE_GROUPED_BOOKS':
      return {
        groupedBooks: action.payload.groupedBooks,
        categories: action.payload.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books
      }
    case 'FUTURE_SELECT_CATEGORY':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: action.payload,
        serialName: "",
        books: state.books
      }
    case 'FUTURE_SELECT_SERIAL':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: action.payload,
        books: state.books
      }
    case 'FUTURE_RESET_SELECT_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: "",
        serialName: "",
        books: state.books
      }
    case 'FUTURE_ADD_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: [...state.books, action.payload]
      }
    case 'FUTURE_UPDATE_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: action.payload,
        newKeywords: state.newKeywords
      }
    case 'FUTURE_REMOVE_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books.filter(book => book !== action.payload)
      }
    default:
      return state;
  }
};