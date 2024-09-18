import React, { Component } from 'react';
import '../../css/App.css';

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import StudentForm from '../../containers/students/StudentForm';

class NewStudent extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className="bg-light-grey">
          <div className="container">
            <br/>
            <br/>
            <h3 className="center no-margin airfont lg">学员调查问卷</h3>

            <div className="row">
              <div className="col s12 m10 offset-m1">
                <h5>请家长务必仔细填写此调查问卷, 我们会根据此问卷安排对应试课老师和绘本 (<span style={{color: "red"}}>*</span> 为必填项)</h5>
              </div>
            </div>
            <StudentForm />
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default NewStudent;