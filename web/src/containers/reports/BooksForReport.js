import React from "react";
import { connect } from 'react-redux';
import SelectBookWidget from '../books/SelectBookWidget';
import { selectCategory, selectSerial, resetDeault, removeSelectedBook } from "../../actions/select_book_actions";
import BookTable from '../../components/books/bookTable';
import BookCards from '../books/BookCards';

class BooksForReport extends React.Component {
  constructor(props) {
    super(props);

    this.removeBook = this.removeBook.bind(this);
  }

  removeBook(book, content) {
    this.props.removeBook(book, content);
  }

  render() {
    let review_books = this.props.reviewBooks;
    let new_books = this.props.newBooks;
    let future_books = this.props.futureBooks;

    let review_books_table = "";
    let new_books_table = "";
    let future_books_table = "";

    review_books_table = <BookCards 
                            type="DELETE" 
                            edit={true}
                            content="REVIEW"
                            books={review_books} 
                            clickButton={this.removeBook.bind(this)} 
                          />;
    
    new_books_table = <BookCards 
                        type="DELETE" 
                        edit={true}
                        content="NEW"
                        books={new_books} 
                        clickButton={this.removeBook.bind(this)} 
                      />;

    future_books_table = <BookTable 
                          books={future_books} 
                          edit={true}
                          type="DELETE"
                          content="FUTURE"
                        />;
    let space = future_books.length > 0 ? <br/> : "";

    return(
      <div>
        <div className="row no-margin">
          <div className="input-field col m12">
            <h5 className="orange-text">复习内容</h5>
          </div>
        </div>
        {review_books_table}
        <SelectBookWidget 
          content="REVIEW"
        />

        <br/>
        <div className="row no-margin">
          <div className="input-field col m12">
            <h5 className="cyan-text">新课内容</h5>
          </div>
        </div>
        {new_books_table}
        <SelectBookWidget 
          content="NEW"
        />

        <br/>
        <div className="row no-margin">
          <div className="input-field col m12">
            <h5 className="teal-text">下次课书目</h5>
          </div>
        </div>
        {future_books_table}
        {space}
        <SelectBookWidget 
          content="FUTURE"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectBooks: state.selectBooks.books,
    newBooks: state.newBooks.books,
    reviewBooks: state.reviewBooks.books,
    futureBooks: state.futureBooks.books
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectCategory: (category, content) => dispatch(selectCategory(category, content)),
    selectSerial: (serialName, content) => dispatch(selectSerial(serialName, content)),
    removeBook: (book, content) => dispatch(removeSelectedBook(book, content)),
    resetDeault: (content) => dispatch(resetDeault(content))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForReport);