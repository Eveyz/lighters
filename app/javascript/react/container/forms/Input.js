import React from "react";

class FormInput extends React.Component {
  render() {
    return(
      <input name={this.props.name} value={this.props.value} type={this.props.type} />
    )
  }
};

export default FormInput;