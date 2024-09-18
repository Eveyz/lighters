import React from 'react';
import M from 'materialize-css';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import TeacherForm from './TeacherForm';

class NewTeacher extends React.Component {
  componentDidMount() {
    M.updateTextFields();
  }

  render = () => {
    return(
      <div>
        <Header />
        <div className="container">
          <br/>
          <h5 className="center no-margin airfont lg airbnb-font"><b>教师档案登记</b></h5>

          <div className="row">
            <div className="col s12 m10 offset-m1">
              <h6 className="airbnb-font">请您务必仔细填写此表, 我们会根据此表来决定是否进行下一步的试课流程, 谢谢您的合作 (<span style={{color: "red"}}>*</span> 为必填项)</h6>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m10 offset-m1">
              <div className="card r-box-shadow">
                <div className="card-content" style={{padding: "50px"}}>
                  <h5 className="cyan-text airbnb-font" style={{marginTop: "0px"}}>填写基本资料</h5>
                  <TeacherForm 
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
}

export default NewTeacher;