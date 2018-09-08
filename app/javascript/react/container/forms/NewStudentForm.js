import React from "react";

class NewStudentForm extends React.Component {
  render() {
    return(
      <form>
        <div className="row">
          <div className="col s12 m10 offset-m1">
            <div className="card r-box-shadow">
              <div className="card-content" style={{padding: "50px"}}>
                <span className="card-title">学员基本信息</span>
                <div className="row">
                  <div className="input-field col m6 s12">
                    <input type="text" name="student[lastname]" autoComplete="lastname" className="input-field-required validate" id="lastname" ></input>
                    <label htmlFor="lastname">姓 <span style={{color: "red"}}>*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入姓</span>
                  </div>
      
                  <div className="input-field col m6 s12">
                    <input type="text" name="student[firstname]" autoComplete="firstname" className="input-field-required validate" id="firstname" ></input>
                    <label htmlFor="firstname">名 <span style={{color: "red"}}>*</span></label>
                    <span className="red-text input-error"><i className="tiny material-icons">report_problem</i> 请输入名字</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

export default NewStudentForm;