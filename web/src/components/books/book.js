import React from 'react';
import 'materialize-css/dist/js/materialize.min';
import M from 'materialize-css';
import { connect } from 'react-redux';

import { selectBook, editBook, deleteBook } from '../../actions/books_actions';

class Book extends React.Component {
  constructor(props) {
    super(props)

    this.dropdown = React.createRef();
    
    this.editBook = this.editBook.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
  }

  componentDidMount() {
    M.AutoInit();
  }

  editBook = (e) => {
    e.preventDefault()
    this.props.editBook(this.props.book, `/books/${this.props.book._id}/edit`)
  }

  deleteBook = () => {
    this.props.deleteBook(this.props.book._id)
  }

  selectBook = (e) => {
    e.preventDefault()
    this.props.selectBook(this.props.book, `/books/${this.props.book._id}/show`)
  }

  render() {
    let operations = this.props.readOnly ?  
    <td><button className="btn cyan">查看</button></td>
    : 
    <td>
      <a className='dropdown-trigger btn' href='' data-target={this.props.id}>更多操作</a>

      <ul id={this.props.id} className='dropdown-content'>
        <li><a href="" onClick={this.editBook}>编辑</a></li>
        <li><a href="" onClick={this.selectBook} target="_blank">查看</a></li>
        <li><a href="" className="red-text" onClick={() => { if (window.confirm('确认要删除绘本嘛?')) this.deleteBook() }}>删除</a></li>
      </ul>
    </td>;
    return(
      <tr>
        <td>{this.props.book.lightersLevel}</td>
        <td>{this.props.book.razLevel}</td>
        <td>{this.props.book.lexileLevel}</td>
        <td>{this.props.book.age}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
        {operations}
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editBook: (book, path) => dispatch(editBook(book, path)),
    selectBook: (book, path) => dispatch(selectBook(book, path)),
    deleteBook: (book_id) => dispatch(deleteBook(book_id))
  };
}

export default connect(null, mapDispatchToProps)(Book);
