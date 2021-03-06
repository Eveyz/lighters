import React from "react";
import SelectBookWidget from "../books/SelectBookWidget";
import BookCards from "../books/BookCards";
import BookTable from "../books/BookTable";

class SelectBooksForReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedBooks: [],
      book_ids: new Set()
    };
  }

  componentWillMount() {
    if(this.props.action === "edit" || (this.props.action === "new" && this.props.field === "review")) {
      $.getJSON("/reports/get_previous_report_books", 
        { 
          course_id: this.props.course_id, 
          student_id: this.props.student_id,
          report_id: this.props.report_id,
          // passing action to controller to differentiate new or edit
          // if action is new then should fetch review from previous report
          actions: this.props.action,
          field: this.props.field
        }, 
        (response) => { 
          var _ids = new Set();
          var _book_ids = response.map((book) => { _ids.add(book.id) });
          this.setState({ 
            addedBooks: response,
            book_ids: _ids 
          }) 
        });
    }
  }

  addBook(type, book) {
    // var newBooks = [];
    var _book_ids = new Set();
    if(type === "ADD") {
      _book_ids = this.state.book_ids;
      if(_book_ids.has(book.id)) {
        M.toast({html: "绘本已添加过"});
      } else {
        _book_ids.add(book.id);
        // newBooks = this.state.addedBooks;
        // newBooks.push(book);
        this.setState({ 
          addedBooks: [...this.state.addedBooks, book], 
          book_ids: _book_ids 
        });
      }
    }
  }

  removeBook(action, book) {
    let books = this.state.addedBooks;
    let index = books.indexOf(book);
    var _book_ids;
    if (index > -1) {
      books.splice(index, 1);
      _book_ids = this.state.book_ids;
      _book_ids.delete(book.id)
    }
    this.setState({
      addedBooks: books,
      book_ids: _book_ids
    });
  }

  render() {
    var selectBookWidget = this.props.assignedBooks.length > 0 ?
                        <SelectBookWidget 
                          assignedBooks={this.props.assignedBooks} 
                          addBook={this.addBook.bind(this)} 
                        /> : 
                        <h6 className="center">此课程还没有绘本资源，请联系管理员添加</h6>;

    var bookTable = "";
    if(this.state.addedBooks.length > 0) {
      if(this.props.field != "future_books") {
        bookTable = <BookCards 
                      books={this.state.addedBooks} 
                      edit={true}
                      type="DELETE"
                      model={this.props.model}
                      field={this.props.field}
                      clickButton={this.removeBook.bind(this)}
                    />;
      } else {
        bookTable = <BookTable 
                      type="DELETE" 
                      model={this.props.model}
                      field={this.props.field}
                      books={this.state.addedBooks} 
                      clickButton={this.removeBook.bind(this)} 
                    />;
      }
    }   

    return(
      <div>
        <div>
          {bookTable}
        </div>
        {selectBookWidget}
      </div>
    )
  }
}

export default SelectBooksForReport;