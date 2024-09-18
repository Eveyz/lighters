import React from 'react';
import { connect } from 'react-redux';

import { postBook, removeBook } from '../../actions/courses_actions';
import { appendBook, removeSelectedBook } from '../../actions/select_book_actions';

class BookWidget extends React.Component {
  constructor(props) {
    super(props)

    this.clickButton = this.clickButton.bind(this);
  }

  clickButton() {
    if(this.props.type === "ADD") {
      const _book_id = this.props.book._id;
      let found = this.props.books.findIndex(book => book._id === _book_id);
      if(found !== -1) {
        window.Materialize.toast('请不要重复添加绘本', 1000);
      } else {
        if(this.props.content === "ADMIN")
          this.props.addBook(this.props.course._id, this.props.book._id);
        else
          this.props.appendBook(this.props.book, this.props.content);
      }

    } else {

      if(this.props.content === "ADMIN")
        this.props.removeBook(this.props.course._id, this.props.book._id);
      else
        this.props.removeSelectedBook(this.props.book, this.props.content);

    }
  }

  render() {
    let iconStyle = {
      cursor: "pointer"
    };
    let button = this.props.type === "ADD" ? 
    <i className="material-icons green-text icon-clickable" style={iconStyle} onClick={this.clickButton.bind(this)}>add</i> 
    : 
    <i className="material-icons red-text icon-clickable" style={iconStyle} onClick={this.clickButton.bind(this)}>delete</i>

    if(this.props.keywords) {
      let keywords = [];
      this.props.book.keywords.forEach(function(keyword) {
        keywords.push(keyword["content"]);
      });

      // var keywordsList = <KeywordList keywords={keywords} edit={this.props.edit} deleteKeyword={this.deleteKeyword.bind(this)} />

      let keywordsList = "";

      return(
        <tr>
          <td>{button}</td>
          <td>{this.props.book.lightersLevel}</td>
          <td>{this.props.book.lexileLevel}</td>
          <td>{this.props.book.category}</td>
          <td>{this.props.book.serials}</td>
          <td>{this.props.book.name}</td>
          <td>{keywordsList}</td>
        </tr>
      )
    }

    return(
      <tr>
        <td>{button}</td>
        <td>{this.props.book.lightersLevel}</td>
        <td>{this.props.book.lexileLevel}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
      </tr>
    )
  }
}

const mapStatetoProps = (state, ownProps) => {
  switch(ownProps.content) {
    case 'REVIEW':
      return {
        course: state.coursesData.currentCourse,
        books: state.reviewBooks.books
      };
    case 'NEW':
      return {
        course: state.coursesData.currentCourse,
        books: state.newBooks.books
      };
    case 'FUTURE':
      return {
        course: state.coursesData.currentCourse,
        books: state.futureBooks.books
      };
    default:
      return {
        course: state.coursesData.currentCourse,
        books: state.coursesData.currentCourse.books
      };
  }
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addBook: (id, bookID) => dispatch(postBook(id, bookID)),
    removeBook: (id, bookID) => dispatch(removeBook(id, bookID)),
    appendBook: (book, content) => dispatch(appendBook(book, content)),
    removeSelectedBook: (book, content) => dispatch(removeSelectedBook(book, content))
  }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BookWidget) 