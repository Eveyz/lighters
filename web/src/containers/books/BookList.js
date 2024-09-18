import React from 'react';
import { Row, Col, Table } from 'react-materialize';

import Book from '../../components/books/book';

class BooksList extends React.Component {

  render() {
    let bookContent = <div className="col m12">
                        <div className="card white r-box-shadow">
                          <div className="card-content">
                            <h4 className="center">当前没有绘本，请添加</h4>
                          </div>
                        </div>
                      </div>;
    if(this.props.data.length > 0) {
      let bookList = this.props.data.map((book, index) => {
        return (
          <Book key={index} id={index} book={book} readOnly={this.props.readOnly} />
        );
      });
      bookContent = <Row>
                      <Col m={12}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Lighters级别</th>
                              <th>RAZ级别</th>
                              <th>Lexile级别</th>
                              <th>年龄段</th>
                              <th>绘本分类</th>
                              <th>系列名</th>
                              <th>绘本名</th>
                              <th colSpan="3">更多操作</th>
                            </tr>
                          </thead>

                          <tbody>
                            {bookList}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
    }

    return (
      <div>
        {bookContent}
      </div>
    )
  }
}

export default BooksList;