import React from 'react'
import M from 'materialize-css'

import { CHINESE_MAPPING } from '../../ultis'

class TableFilter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      field: "default",
      options: []
    }

    this.filterField = React.createRef()
    this.filterValue = React.createRef()
    this.filterItems = this.filterItems.bind(this)
    this.selectDiffField = this.selectDiffField.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    M.AutoInit()
  }

  componentDidUpdate() {
    M.AutoInit()
  }

  refresh() {
    this.filterValue.current.value = ""
    this.filterField.current.value = "default"
    this.props.filterItems(this.props.items) // restore back to original items
    this.setState({
      field: "default",
      options: []
    })
  }

  selectDiffField() {
    this.filterValue.current.value = "default"
    this.props.filterItems(this.props.items) // restore back to original items
    this.setState({
      field: this.filterField.current.value,
      options: [...this.props.options[this.filterField.current.value]]
    })
  }

  filterItems() {
    const val = this.filterValue.current.value
    const field = this.filterField.current.value
    const res = val ? 
    this.props.items.filter(item => {
      if(typeof(item[field]) === "number") {
        return item[field] >= val 
      } else {
        return item[field].includes(val) 
      }
    })
    : this.props.items
    this.props.filterItems(res)
  }

  render() {
    const { fields } = this.props
    const { field, options } = this.state

    const fieldOptions = Object.keys(fields).map((h, idx) => {
      return <option key={idx} value={h}>{CHINESE_MAPPING[h]}</option>
    })

    var t = "string"
    if(this.props.items.length > 0) {
      t = typeof(this.props.items[0][field])
    }
    var valueOptions = null
    if(field !== "default") {
      if(t === "number") {
        valueOptions = <div className="input-field col m5 s12" key="text-input">
          <input ref={this.filterValue} placeholder="大于或等于" type="text" onChange={this.filterItems} />
        </div>
      } else {
        valueOptions = <div className="input-field col m5 s12" key="not-dsiabled">
          <select ref={this.filterValue} defaultValue="default" onChange={this.filterItems}>
            <option value="default" disabled>选择属性值</option>
            {
              options.map((o, idx) => {
                return <option key={idx} value={o}>{o}</option>
              })
            }
          </select>
          <label>属性值</label>
        </div>
      }
    } else {
      valueOptions = <div className="input-field col m5 s12" key="dsiabled">
        <select ref={this.filterValue} disabled defaultValue="default">
          <option value="default" disabled>选择属性值</option>
        </select>
        <label>属性值</label>
      </div>
    } 

    return (
      <div>
        <div className="row no-margin">
          <div className="input-field col m5 s12">
            <select ref={this.filterField} defaultValue="default" onChange={this.selectDiffField}>
              <option value="default" disabled>选择属性</option>
              {fieldOptions}
            </select>
            <label>筛选</label>
          </div>
          {valueOptions}
          <div className="input-field col m2 s12" style={{marginTop: "30px"}}>
            <i className="material-icons left blue-text clickable" onClick={this.refresh}>refresh</i>
          </div>
        </div>
      </div>
    )
  }
}

export default TableFilter