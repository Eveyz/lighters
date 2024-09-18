import React from "react";

import TableRow from './TableRow';

class TableForm extends React.Component {

  constructor(props) {
    super(props);

    this.tableRowContent = {
      category: '',
      serialName: '',
      type: '',
      ratio: '',
      keywords: ''
    }

    this.state = {
      courseContent: this.props.value[0] === "" ? [Object.assign({}, this.tableRowContent)] : this.props.value
    }

    this.addRow = this.addRow.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.saveValue = this.saveValue.bind(this)
  }

  addRow() {
    this.setState({
      courseContent: [...this.state.courseContent, Object.assign({}, this.tableRowContent)]
    })
  }

  deleteRow(idx) {
    let newState = this.state.courseContent.filter((ele, i) => i !== idx)
    this.setState({
      courseContent: newState
    })
    // console.log("state not updated: ", this.state.courseContent)
    this.props.saveValue(newState)
  }
  
  saveValue(idx, value) {
    var newCourseContent = this.state.courseContent.slice(0)
    newCourseContent[idx][value[1]] = value[2]
    this.setState({
      courseContent: newCourseContent
    })
    this.props.saveValue(this.state.courseContent)
  }

  render() {
    let tableRows = this.state.courseContent.map((row, idx) => {
      return <TableRow 
                key={idx}
                idx={idx} 
                row={row} 
                action={this.props.action} 
                deleteRow={this.deleteRow.bind(this, idx)}
                saveValue={this.saveValue.bind(this, idx)}
              />
    })

    return (
      <div>
        <br/>
        <div className="flex-row title">
          <div style={{width: "15%"}}>读物类型</div>
          <div style={{width: "25%"}}>读物系列名/书名/章节</div>
          <div style={{width: "10%"}}>类别</div>
          <div style={{width: "10%"}}>翻译比例</div>
          <div style={{width: "35%"}}>Key Words/Patterns</div>
          <div style={{width: "5%"}}></div>
        </div>
        {tableRows}
        <br/>
        <a className="btn" onClick={this.addRow}><i className="material-icons left">add</i>添加读物</a>
      </div>
    )
  }
}

export default TableForm;