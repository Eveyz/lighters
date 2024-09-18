import React, { useState } from 'react';

import QuillTextEditor from '../TextEditor/Quill';

const FormTextarea = props => {

  const [hasError, setHasError] = useState(false)

  const handleChange = (name, val) => {
    if(!val || val.length === 0) {
      setHasError(true)
    } else {
      if(hasError) {
        setHasError(true)
      }
    }
    props.getInputData(name, val);
  }

  let hideOrNot = hasError ? "red-text" : "red-text hide";
  let msg = props.required ? 
            <span className={hideOrNot}>
              <i className="tiny material-icons">report_problem</i> {props.errorMsg}
            </span> :
            ""
            
  let defaultValue = ""
  if(props.action === "EDIT") defaultValue = props.value

  return(
    <div className={props.classes}>
      <QuillTextEditor
        name={props.name}
        id={props.name}
        value={defaultValue}
        onChange={handleChange}
        onBlur={handleChange}
      />
      {msg}
    </div>
  )
}

export default FormTextarea

// class FormTextarea extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       hasError: false
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     console.log("why not update select field here: ", this.props)
//     M.AutoInit()
//     M.updateTextFields()
//   }

//   handleChange = (name, val) => {
//     if(!val || val.length === 0) {
//       this.setState({hasError: true});
//     } else {
//       if(this.state.hasError) {
//         this.setState({hasError: false});
//       }
//     }
//     this.props.getInputData(name, val);
//   }

//   render() {
//     let hideOrNot = this.state.hasError ? "red-text" : "red-text hide";
//     let msg = this.props.required ? 
//               <span className={hideOrNot}>
//                 <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
//               </span> :
//               ""
              
//     let defaultValue = ""
//     if(this.props.action === "EDIT") defaultValue = this.props.value

//     return(
//       <div className={this.props.classes}>
//         <QuillTextEditor
//           name={this.props.name}
//           id={this.props.name}
//           value={defaultValue}
//           onChange={this.handleChange}
//           onBlur={this.handleChange}
//         />
//         {msg}
//       </div>
//     )
//   }
// }

// export default FormTextarea;