import React, { useEffect } from 'react';
import Header from '../../../../components/layouts/Header';
import Footer from '../../../../components/layouts/Footer';
import M from 'materialize-css';

import AdminTeacherNewForm from './AdminTeacherNewForm';

const AdminTeacherNew = props => {

  useEffect(() => {
    M.updateTextFields();
  }, [])

  return (
    <div>
      <Header />
        <div className="container">
          <br/>

          <div className="row">
            <div className="col s12 m10 offset-m1">
              <div className="card r-box-shadow">
                <div className="card-content" style={{padding: "50px"}}>
                  <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>新建教师</h5>
                  <AdminTeacherNewForm 
                    teacher={{}} 
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

export default AdminTeacherNew