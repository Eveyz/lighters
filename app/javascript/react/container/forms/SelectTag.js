import React from "react";
import OptionTag from "./OptionTag";

class SelectTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "default"
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.options != this.props.options) {
      this.setState({ value: "default" });
    }
  }

  selectOption(event) {
    var val = event.target.value
    this.setState({ value: val});
    this.props.selectOption(val);
  }

  render() {
    let options = this.props.options.map((option, index) => {
      return (
        <option key={index}>{option}</option>
      );
    });

    if(this.props.disable) {
      return(
        <select defaultValue="default" disabled>
          <option value="default">{this.props.defaultOption}</option>
        </select>
      )
    }
    
    return(
      <select value={this.state.value} onChange={this.selectOption.bind(this)} >
        <option key='default' value="default">
          {this.props.defaultOption}
        </option>
        {options}
      </select>
    )
  }
}

export default SelectTag;