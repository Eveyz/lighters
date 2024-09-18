import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import PathNavigator from '../layouts/PathNavigator';
import BookwithFormik from './BookwithFormik';

class EditBook extends React.Component {
  componentDidMount() {
    M.updateTextFields();
  }

  render = () => {
    return(
      <div>
        <Header />
        <PathNavigator 
          path={"/books"} 
          content={"编辑绘本"} 
        />
        <div className="container">

          <div className="row">
            <div className="col m12 s12 l8 offset-l2">
              <div className="card r-box-shadow">
                <div className="card-content" style={{padding: "50px"}}>
                  <h4 className="cyan-text" style={{marginTop: "0px"}}>填写绘本资料</h4>
                  <BookwithFormik 
                    book={this.props.book} 
                    prevFile={this.props.book.file}
                    action="EDIT"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.booksData.currentBook
  };
}

export default connect(mapStateToProps, null)(EditBook);