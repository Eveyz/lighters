import React from 'react';
import M from 'materialize-css';
import '../../css/App.css';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';

class FormCheck extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      showHidden: false
    };
    this.inputValue = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleOtherInput = this.handleOtherInput.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (e) => {
    let val = e.target.value;
    if(!val) {
      // if selection is empty set error
      this.setState({hasError: true});
    } else {
      if(val === "other") {
        // show input for other selection
        this.setState({showHidden: true});
      } else {
        // selection is valid
        this.setState({hasError: false, showHidden: false});
      }
      this.props.getInputData(this.props.name, val);
    }
  }

  handleOtherInput = (e) => {
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
    let msg = this.props.required && !this.state.showHidden ? 
              <span className={hideOrNot}>
                <i className="tiny material-icons">report_problem</i> {this.props.errorMsg}
              </span> :
              "";

    let options = "";
    if(this.props.inputType === "radio") {
      options = this.props.options.map((option, idx) => {
        return <RadioButton
                  key={idx}
                  name={this.props.name}
                  htmlID={this.props.name + "" + idx}
                  classes="radio-field-required"
                  label={option}
                  value={option}
                  handleChange={this.handleChange}
                />
      });
    } else if(this.props.inputType === "checkbox") {
      options = this.props.options.map((option, idx) => {
        return <CheckBox
                  key={idx}
                  name={this.props.name}
                  htmlID={this.props.name + "" + idx}
                  classes="filled-in checkbox-field-required"
                  label={option}
                  value={option}
                  handleChange={this.handleChange}
                />
      });
    }

    let otherOption = "";
    let hiddenInput = this.state.showHidden ? <input 
                                                type="text"
                                                name={this.props.name + "Other"} 
                                                placeholder="请具体说明"
                                                autoFocus={true}
                                                onChange={this.handleOtherInput}
                                                onBlur={this.handleOtherInput}
                                              /> : "";
    let msgClasses = this.state.hasError ? "red-text input-error" : "red-text input-error hide";
    if(this.props.otherOption) {
      otherOption = 
      <p>
        <input 
          type={this.props.inputType} 
          value={"other"}
          name={this.props.name}
          id={this.props.name + "Other"}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.name + "Other"}>
          {this.props.otherLabel}
        </label>
        {hiddenInput}
        <span className={msgClasses}><i className="tiny material-icons">report_problem</i> 请具体说明</span>
      </p>
    }

    return(
      <div className={this.props.classes}>
        <p>{this.props.label} {required}</p>
        {options}
        {otherOption}
        {msg}
      </div>
    )
  }
}

export default FormCheck;