import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';

import { getBooks, addBook, deleteBook } from "../../actions/books_actions.js";
import { setLoadingStatus } from "../../actions/status_actions";

import Header from '../../components/layouts/Header';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import PaginationContainer from '../../containers/PaginationContainer';
import BookList from './BookList';

class BookListContainer extends React.Component {

  componentWillMount() {
    this.props.setLoadingStatus(true)
    this.props.fetchBooks()
  }

  render() {

    return (
      <div>
        <Header />
        <Breadcrumb action="books" />
        <div className="container">
          <br />
          <Row>
            <Col m={2}>
              <Link to="/books/new" className="btn"><i className="material-icons left">add</i>添加绘本</Link>
            </Col>
            <Col m={10}>
              <Link to="/books/new" className="btn cyan">从CSV中导入</Link>
            </Col>
          </Row>
          <br/>
          <Row>
            <PaginationContainer 
              itemsPerPage={10} 
              data={this.props.books} 
              readOnly={false} 
            >
              <BookList />
            </PaginationContainer>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.booksData.books
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: (status) => {
      dispatch(setLoadingStatus(status))
    },
    fetchBooks: () => {
      dispatch(getBooks())
    },
    addBook: () => dispatch(addBook()),
    deleteBook: () => dispatch(deleteBook())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer);