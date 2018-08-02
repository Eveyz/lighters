import React from "react";

class OptionTag extends React.Component {
  render() {
    return(
      <option value={this.props.option}>{this.props.option}</option>
    )
  }
};

export default OptionTag;