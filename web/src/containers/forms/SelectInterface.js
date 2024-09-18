import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

class SelectInterface extends React.Component {

  initMaterilize() {
    M.AutoInit();
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instance = M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, hover: true});
  }

  componentDidMount() {
    console.log("same right");
    this.initMaterilize();
  }

  componentDidUpdate() {
    console.log("same updated")
    this.initMaterilize();
  }

  render() {
    let defaultValue = this.props.serialName !== "" ? this.props.serialName : "default";
    // let name = this.props.disabled ? "Disabled" : "请选择绘本系列";
    if(this.props.disabled) {
      console.log("still not right");
      return (
        <div key="select-top-div">
          <select
            key={this.props.serialNameValue} 
            value={defaultValue} 
            onChange={this.selectSerial}
            disabled
            ref={this.serialNameValue}
          >
            <option key="default" value="default" disabled>请选择绘本系列</option>
            {this.props.serialsBooks}
          </select>
          <label>Disabled</label>
        </div>
      )
    }

    return (
      <div key="select-top-div">
        <select
          key={this.props.serialNameValue} 
          value={defaultValue} 
          onChange={this.selectSerial}
          ref={this.serialNameValue}
        >
          <option key="default" value="default" disabled>请选择绘本系列</option>
          {this.props.serialsBooks}
        </select>
        <label>请选择绘本系列</label>
      </div>
    )
  }

}

export default SelectInterface;