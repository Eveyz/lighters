import React from 'react';
import M from 'materialize-css';
import '../../css/App.css';

class FormPick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();
  }

  handleChange = (e) => {
    let val = e.target.value;
    if(!val) {
      this.setState({hasError: true});
    } else {
      if(this.state.hasError) {
        this.setState({hasError: false});
      }
    }
    this.props.getInputData(this.props.name, val);
  }

  render() {
    let hideOrNot = this.state.hasError ? "red-text" : "red-text hide";
    let required = this.props.required ? <span className="required">*</span> : "";
    let msg = this.props.required ? 
              <span className={hideOrNot}>
                <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
              </span> :
              "";

    let defaultValue = "";

    if(this.props.action === "EDIT") {
      defaultValue = this.props.value;
    } else {
      if(this.props.type === "date") {
        let date = new Date();
        var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let today = date.getFullYear() + "-" + monthNames[date.getMonth()] + "-" + date.getDate();
        defaultValue = today.replace(/(^|\D)(\d)(?!\d)/g, '$10$2')
      }
    }

    let pickerInput = this.props.type === "date" ? 
    <input 
      name={this.props.name}
      id={this.props.name}
      className="input-field-required validate"
      type="date"
      defaultValue={defaultValue}
      ref={this.props.refFromParent} 
      onChange={this.handleChange}
    /> 
    :
    <input 
      name={this.props.name} 
      id={this.props.name} 
      className="input-field-required validate timepicker"
      type="text"
      defaultValue={defaultValue}
      ref={this.props.refFromParent} 
      onFocus={this.handleChange}
      onChange={this.handleChange}
    />

    return(
      <div className={this.props.classes}>
        {pickerInput}
        <label htmlFor={this.props.name}>
          {this.props.label} {required}
        </label>
        {msg}
      </div>
    )
  }
}

export default FormPick;