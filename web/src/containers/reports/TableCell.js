import React from 'react';

import { tableFormRatio } from '../../ultis'

class TableCell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: "READ",
      cellValue: this.props.value || ''
    }
    this.cellContent = React.createRef()

    this.edit = this.edit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.autoSize = this.autoSize.bind(this)
  }

  edit() {
    this.setState({mode: "EDIT"})
  }

  cancelEdit() {
    let inputValue = this.cellContent.current.value.trim()
    if(inputValue) {
      this.setState({
        mode: "READ",
        cellValue: inputValue
      })
      this.props.saveValue([this.props.idx, this.props.ky, inputValue])
    } else {
      this.setState({mode: "READ"})
    }
  }

  autoSize(e) {
    e.target.style.cssText = 'height:auto; padding:0';
    e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
  }

  render() {
    let inputForm = <div style={{width: tableFormRatio[this.props.ky]}}>
                      <textarea
                        type="text"
                        className="cell-input browser-default"
                        defaultValue={this.props.value}
                        ref={this.cellContent}
                        autoFocus
                        onBlur={this.cancelEdit}
                        onKeyDown={this.autoSize}
                      ></textarea>
                    </div>
    
    if(this.state.mode === "EDIT") {
      return inputForm;
    }

    return(
      <div style={{width: tableFormRatio[this.props.ky]}} className="clickable hover-highlight valign-wrapper" onClick={this.edit} ><span>{this.props.value}</span></div>
    )
  }
}

export default TableCell;