import React from 'react';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import PathNavigator from '../layouts/PathNavigator';
import BookwithFormik from './BookwithFormik';

class NewBook extends React.Component {
  render = () => {
    return(
      <div>
        <Header />
        <PathNavigator 
          path={"/books"} 
          content={"新建绘本"} 
        />
        <div className="container">

          <div className="row">
            <div className="col m12 s12 l8 offset-l2">
              <div className="card r-box-shadow">
                <div className="card-content" style={{padding: "50px"}}>
                  <h4 className="cyan-text" style={{marginTop: "0px"}}>填写绘本资料</h4>
                  <BookwithFormik 
                    book={{}} 
                    action="NEW"
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

export default NewBook;