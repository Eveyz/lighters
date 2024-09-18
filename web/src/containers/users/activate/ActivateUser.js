import React from 'react';
import Header from '../../../components/layouts/Header';
import Footer from '../../../components/layouts/Footer';

import ActivateForm from './ActivateForm';

class ActivateUser extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <div className="container">
            <br/>
            <div className="row">
              <div className="col s12 m10 offset-m1">
                <div className="card r-box-shadow">
                  <div className="card-content" style={{padding: "50px"}}>
                    <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>激活账号</h5>
                    <ActivateForm id={this.props.match.params._id} />
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

export default ActivateUser;