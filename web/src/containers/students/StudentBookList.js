import React from 'react';
import { Row } from 'react-materialize';

import PaginationContainer from '../../containers/PaginationContainer';
import BookList from '../../containers/books/BookList';

class StudentBookList extends React.Component {

  render() {
    let bookContent = <h5 className="center">当前没有绘本</h5>
                        
    if(this.props.books.length > 0) {
      bookContent = <PaginationContainer 
                      itemsPerPage={10} 
                      data={this.props.books} 
                      readOnly={false} 
                    >
                      <BookList />
                    </PaginationContainer>;
    }

    return (
      <div>
        <div className="no-margin">
          <h6>当前所有绘本</h6>
          <Row>
            <div className="card white r-box-shadow">
              <div className="card-content">
                {bookContent}
              </div>
            </div>
          </Row>
        </div>
      </div>
    )
  }
}

export default StudentBookList;