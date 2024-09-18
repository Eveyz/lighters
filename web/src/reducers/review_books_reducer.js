const initialState = {
  groupedBooks: {},
  categories: [],
  category: "",
  serialName: "",
  books: [],
  newKeywords: []
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'REVIEW_GROUPED_BOOKS':
      return {
        groupedBooks: action.payload.groupedBooks,
        categories: action.payload.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books,
        newKeywords: state.newKeywords
      }
    case 'REVIEW_SELECT_CATEGORY':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: action.payload,
        serialName: "",
        books: state.books,
        newKeywords: state.newKeywords
      }
    case 'REVIEW_SELECT_SERIAL':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: action.payload,
        books: state.books,
        newKeywords: state.newKeywords
      }
    case 'REVIEW_RESET_SELECT_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: "",
        serialName: "",
        books: state.books,
        newKeywords: state.newKeywords
      }
    case 'REVIEW_ADD_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: [...state.books, action.payload],
        newKeywords: state.newKeywords
      }
    case 'REVIEW_UPDATE_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: action.payload,
        newKeywords: state.newKeywords
      }
    case 'REVIEW_REMOVE_BOOKS':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books.filter(book => book._id !== action.payload._id),
        newKeywords: state.newKeywords
      }
    case 'REVIEW_ADD_KEYWORD':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books.map(book => {
          let _book = Object.assign({}, book);
          if(book._id === action.payload.book_id) {
            _book.keywords = [..._book.keywords, action.payload];
          }
          return _book;
        }),
        newKeywords: [...state.newKeywords, action.payload]
      }
    case 'REVIEW_REMOVE_KEYWORD':
      return {
        groupedBooks: state.groupedBooks,
        categories: state.categories,
        category: state.category,
        serialName: state.serialName,
        books: state.books.map(book => {
          let _book = Object.assign({}, book);
          if(book._id === action.payload.book_id) {
            _book.keywords = _book.keywords.filter(ky => ky.content !== action.payload.content);
          }
          return _book;
        }),
        newKeywords: state.newKeywords.filter(ky => ky.content !== action.payload.content)
      }
    default:
      return state;
  }
};