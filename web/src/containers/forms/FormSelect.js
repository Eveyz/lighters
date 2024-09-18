import React from 'react';
import Option from '../../components/Option';

class FormSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    };
    this.inputValue = React.createRef();
    this.handleChange = this.handleChange.bind(this);
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
    let prompt = this.props.prompt ? <option value="default" disabled>{this.props.prompt}</option> : "";
    let options = this.props.options.map((option, idx) => {
      return <Option key={idx} id={option} value={option} />
    });

    return(
      <div className={this.props.classes}>
        <select
          name={this.props.name}
          ref={this.props.refFromParent}
          onChange={this.handleChange}
          onBlur={this.handleChange}
          defaultValue={this.props.action === "EDIT" ? this.props.value : ""}
        >
          {prompt}
          {options}
        </select>
        <label htmlFor={this.props.name}>
          {this.props.label} {required}
        </label>
        {msg}
      </div>
    )
  }
}

export default FormSelect;