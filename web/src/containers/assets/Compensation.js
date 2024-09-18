import React, { useState, useRef, useEffect } from 'react';
import M from 'materialize-css';

// import { getCompensations, addCompensation, updateCompensation, deleteCompensation } from '../../actions/compensations_actions';
import axios from 'axios';

const Compensation = props => {

  const [add, setAdd] = useState(false)
  const [mode, setMode] = useState("NEW")
  const [compensation, setCompensation] = useState({})
  
  var amount = useRef(null)
  var type = useRef(null)
  var memo = useRef(null)

  useEffect(() => {
    M.AutoInit()
    M.updateTextFields()
  }, [add])

  const addEntry = () => {
    setAdd(true)
    setMode("NEW")
  }

  const updateCompensation = (c) => (e) => {
    setAdd(true)
    setMode("EDIT")
    setCompensation(c)
  }

  const cancel = () => {
    setAdd(false)
  }

  const handleSubmit = (e) => {
    let val = amount.current.value
    if(!val) {
      window.Materialize.toast('数值不能为0', 1000);
    } else {
      let c = {
        paycheck_id: props.paycheck_id,
        type: type.current.value,
        amount: amount.current.value,
        memo: memo.current.value
      }
      if(mode === "NEW") {
        axios.post(`/compensations`, c)
        .then(res => {
          props.addCompensation(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        // updateCompensation(this.compensation._id, c)
        axios.put(`/compensations/${compensation._id}`, c)
        .then(res => {
          props.updateCompensation(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
      setAdd(false)
    }
  }

  const deleteCompensation = (id) => {
    axios.delete(`/compensations/${id}`)
    props.deleteCompensation(id)
  }

  let button = add || props.paid ? <button disabled className="btn cyan">新增条目</button> : <button onClick={addEntry} className="btn cyan">新增条目</button>

  let compensationList = props.compensations.map((c, idx) => {
    let td = c.type !== "罚款" ? <td className="green-text">+{c.amount.toFixed(2)}</td> : <td className="red-text">-{c.amount.toFixed(2)}</td>

    if(props.paid) {
      return  <tr key={idx} className="action-hide">
                <td>{c.type}</td>
                {td}
                <td>{c.memo}</td>
                <td></td>
              </tr>
    }
    return <tr key={idx} className="action-hide">
              <td>{c.type}</td>
              {td}
              <td>{c.memo}</td>
              {
                props.paid ?
                ""
                :
                <React.Fragment>
                  <td><button className="btn" onClick={updateCompensation(c)}>编辑</button></td>
                  <td><button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) deleteCompensation(c._id)}}>删除</button></td>
                </React.Fragment>
              }
            </tr>
  })

  let compenTable = props.compensations.length > 0 && !add ? 
                    <table className="highlight">
                      <thead>
                        <tr>
                          <th>类型</th>
                          <th>数目(元)</th>
                          <th>备注</th>
                          <th colSpan="2"></th>
                        </tr>
                      </thead>

                      <tbody>
                        {compensationList}
                      </tbody>
                    </table> : ""

  let f = add ? 
          <div>
            <br/>
            <div className="row no-margin-bottom">
              <div className="input-field col s6 no-margin-bottom">
                <select ref={type} defaultValue={compensation._id ? compensation.type : ""}>
                  <option value="奖励">奖励</option>
                  <option value="津贴">津贴</option>
                  <option value="罚款">罚款</option>
                </select>
                <label>选择类型</label>
              </div>
              <div className="input-field col s6 no-margin-bottom">
                <input ref={amount} defaultValue={compensation._id ? compensation.amount : ""} id="amount" type="number" className="validate" />
                <label htmlFor="amount">数目</label>
              </div>
            </div>
            <div className="row no-margin-bottom">
              <div className="input-field col s12 no-margin-bottom">
                <input ref={memo} defaultValue={compensation._id ? compensation.memo : ""} id="memo" type="text" className="validate" />
                <label htmlFor="memo">备注(选填)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button className="btn" onClick={handleSubmit}>提交</button>
                <button onClick={cancel} className="btn white black-text right">取消</button>
              </div>
            </div>
            <hr/>
          </div> : ""
  
  return(
    <div>
      {compenTable}
      <br/>
      {button}
      {f}
    </div>
  )
}

export default Compensation

// class Compensation extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       add: false,
//       mode: "NEW"
//     }

//     this.amount = React.createRef()
//     this.type = React.createRef()
//     this.memo = React.createRef()
//     this.compensation = {}
//   }

//   componentWillMount() {
//     if(this.props.paycheck_id) {
//       this.props.getCompensations(`?paycheck_id=${this.props.paycheck_id}`)
//     }
//   }

//   componentDidUpdate() {
//     M.AutoInit()
//     M.updateTextFields()
//   }

//   addEntry = () => {
//     this.setState({add: true, mode: "NEW"})
//   }

//   updateCompensation = (c) => (e) => {
//     this.setState({add: true, mode: "EDIT"})
//     this.compensation = c
//   }

//   cancel = () => {
//     this.setState({add: false})
//   }

//   handleSubmit = (e) => {
//     let val = this.amount.current.value
//     if(!val) {
//       window.Materialize.toast('数值不能为0', 1000);
//     } else {
//       let c = {
//         paycheck_id: this.props.paycheck_id,
//         type: this.type.current.value,
//         amount: this.amount.current.value,
//         memo: this.memo.current.value
//       }
//       this.state.mode === "NEW" ? this.props.addCompensation(c) : this.props.updateCompensation(this.compensation._id, c)
//       this.setState({add: false})
//     }
//   }

//   deleteCompensation = (id) => {
//     this.props.deleteCompensation(id)
//   }

//   render() {
//     let button = this.state.add || this.props.paid ? "" : <button onClick={this.addEntry} className="btn cyan">新增条目</button>

//     let compensationList = this.props.compensations.map((c, idx) => {
//       let td = c.type !== "罚款" ? <td className="green-text">+{c.amount.toFixed(2)}</td> : <td className="red-text">-{c.amount.toFixed(2)}</td>

//       if(this.props.paid) {
//         return  <tr key={idx} className="action-hide">
//                   <td>{c.type}</td>
//                   {td}
//                   <td>{c.memo}</td>
//                   <td></td>
//                 </tr>
//       }
//       return <tr key={idx} className="action-hide">
//                 <td>{c.type}</td>
//                 {td}
//                 <td>{c.memo}</td>
//                 <td><button className="btn" onClick={this.updateCompensation(c)}>编辑</button></td>
//                 <td><button className="btn red" onClick={() => { if (window.confirm('确定要删除此条目?')) this.deleteCompensation(c._id)}}>删除</button></td>
//               </tr>
//     })

//     let compenTable = this.props.compensations.length > 0 && !this.state.add ? 
//                       <table className="highlight">
//                         <thead>
//                           <tr>
//                             <th>类型</th>
//                             <th>数目(元)</th>
//                             <th>备注</th>
//                             <th colSpan="2"></th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {compensationList}
//                         </tbody>
//                       </table> : ""

//     let f = this.state.add ? 
//             <div>
//               <br/>
//               <div className="row no-margin-bottom">
//                 <div className="input-field col s6 no-margin-bottom">
//                   <select ref={this.type} defaultValue={this.compensation._id ? this.compensation.type : ""}>
//                     <option value="奖励">奖励</option>
//                     <option value="津贴">津贴</option>
//                     <option value="罚款">罚款</option>
//                   </select>
//                   <label>选择类型</label>
//                 </div>
//                 <div className="input-field col s6 no-margin-bottom">
//                   <input ref={this.amount} defaultValue={this.compensation._id ? this.compensation.amount : ""} id="amount" type="number" className="validate" />
//                   <label htmlFor="amount">数目</label>
//                 </div>
//               </div>
//               <div className="row no-margin-bottom">
//                 <div className="input-field col s12 no-margin-bottom">
//                   <input ref={this.memo} defaultValue={this.compensation._id ? this.compensation.memo : ""} id="memo" type="text" className="validate" />
//                   <label htmlFor="memo">备注(选填)</label>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="input-field col s12">
//                   <button className="btn" onClick={this.handleSubmit}>提交</button>
//                   <button onClick={this.cancel} className="btn white black-text right">取消</button>
//                 </div>
//               </div>
//               <hr/>
//             </div> : ""
    
//     return(
//       <div>
//         {compenTable}
//         <br/>
//         {button}
//         {f}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     compensations: state.compensationsData.compensations
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getCompensations: (id) => {
//       dispatch(getCompensations(id))
//     },
//     addCompensation: (compensation) => {
//       dispatch(addCompensation(compensation))
//     },
//     updateCompensation: (id, field) => {
//       dispatch(updateCompensation(id, field))
//     },
//     deleteCompensation: (id) => {
//       dispatch(deleteCompensation(id))
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Compensation)