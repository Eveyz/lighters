import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios'

// import { updateTeacher } from '../../actions/teachers_actions';

const Teacher = props => {

  const [teacher, setTeacher] = useState(props.teacher)
  const dropdown = useRef(null)

  useEffect(() => {
    M.AutoInit();
    M.Dropdown.init(dropdown.current, {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true,
      hover: true
    });
  }, [])

  const updateTeacher = type => e => {
    e.preventDefault();
    let field = {};
    let update = true; // in case of level 1
    if(type === "STATUS") {
      field = teacher.status === "pending" ? {status: "active"} : {status: "pending"};
    } else if(type === "LEVELUP") {
      field = {level: teacher.level + 1};
    } else if(type === "LEVELDOWN") {
      if(teacher.level === 1) {
        update = false;
        window.Materialize.toast('已到最低等级', 1000, 'yellow');
      } else {
        field = {level: teacher.level - 1};
      }
    }
    if(update) {
      axios.put(`/teachers/${teacher._id}`, field)
      .then(res => {
        if(type === "STATUS") {
          props.updatedTeacher()
          window.Materialize.toast('更新成功', 1000, 'green');
        } else {
          setTeacher(res.data)
          window.Materialize.toast('更新成功', 1000, 'green');
        }
      })
    }
  }

  let action = "待工";
  let classes = "btn red";
  if(teacher.status === "pending") {
    action = "激活";
    classes = "btn green";
  }

  if(props.tab === "RESET_REQUIRED") {
    return (
      <tr>
        <td><Link to={`/teachers/${teacher._id}/view`}><span className="airbnb-font">{teacher.lastname + teacher.firstname}</span></Link></td>
        <td>{teacher.gender}</td>
        <td>{teacher.systemid}</td>
        <td>{teacher.systemid}</td>
        <td>
          <a ref={dropdown} className='dropdown-trigger icon-link-wrapper' href='' data-target={props.id}><i className="material-icons circle-icon">more_vert</i></a>

          <ul id={props.id} className='dropdown-content'>
            <li><Link to={`/admin/teachers/${teacher._id}/edit`} className="aribnb-font bold">编辑</Link></li>
            <li><Link to={`/teachers/${teacher._id}`} className="aribnb-font bold">查看</Link></li>
            <li className="divider"></li>
            <li><a className="aribnb-font bold red-text" href="">注销</a></li>
          </ul>
        </td>
      </tr>
    )
  }

  return(
    <tr>
      <td><Link to={`/teachers/${teacher._id}/view`}><span className="airbnb-font">{teacher.lastname + teacher.firstname}</span></Link></td>
      <td>{teacher.age}</td>
      <td>{`${teacher.level}级`}</td>
      <td>{teacher.gender}</td>
      <td>{teacher.city}</td>
      <td><button className={classes} onClick={updateTeacher("STATUS")}>{action}</button></td>
      <td>
        <a ref={dropdown} className='dropdown-trigger icon-link-wrapper' href='' data-target={props.id}>
          <i className="material-icons circle-icon">more_vert</i>
        </a>

        <ul id={props.id} className='dropdown-content'>
          <li><a className="aribnb-font bold" href="" onClick={updateTeacher("LEVELUP")}>升级</a></li>
          <li><a className="aribnb-font bold" href="" onClick={updateTeacher("LEVELDOWN")}>降级</a></li>
          <li><Link to={`/admin/teachers/${teacher._id}/edit`} className="aribnb-font bold">编辑</Link></li>
          <li><Link to={`/teachers/${teacher._id}/view`} className="aribnb-font bold">查看</Link></li>
          <li className="divider"></li>
          <li><a className="aribnb-font bold red-text" href="">注销</a></li>
        </ul>
      </td>
    </tr>
  )
}

export default Teacher

// class Teacher extends React.Component {
//   constructor(props) {
//     super(props)

//     this.dropdown = React.createRef();
//     this.updateTeacher = this.updateTeacher.bind(this);
//   }

//   componentDidMount() {
//     M.AutoInit();
//     M.Dropdown.init(this.dropdown.current, {
//       inDuration: 300,
//       outDuration: 225,
//       constrainWidth: true,
//       hover: true
//     });
//   }

//   updateTeacher = type => e => {
//     e.preventDefault();
//     let field = {};
//     let update = true;
//     if(type === "STATUS") {
//       field = this.props.teacher.status === "pending" ? {status: "active"} : {status: "pending"};
//     } else if(type === "LEVELUP") {
//       field = {level: this.props.teacher.level + 1};
//     } else if(type === "LEVELDOWN") {
//       if(this.props.teacher.level === 1) {
//         update = false;
//         window.Materialize.toast('已到最低等级', 1000);
//       } else {
//         field = {level: this.props.teacher.level - 1};
//       }
//     }
//     if(update) {
//       this.props.updateTeacher(this.props.teacher._id, field);
//     }
//   }

//   render() {
//     let action = "待工";
//     let classes = "btn red";
//     if(this.props.teacher.status === "pending") {
//       action = "激活";
//       classes = "btn green";
//     }

//     if(this.props.tab === "RESET_REQUIRED") {
//       return (
//         <tr>
//           <td><Link to={`/teachers/${this.props.teacher._id}/view`}><span className="airbnb-font">{this.props.teacher.lastname + this.props.teacher.firstname}</span></Link></td>
//           <td>{this.props.teacher.gender}</td>
//           <td>{this.props.teacher.systemid}</td>
//           <td>{this.props.teacher.systemid}</td>
//           <td>
//             <a ref={this.dropdown} className='dropdown-trigger icon-link-wrapper' href='' data-target={this.props.id}><i className="material-icons circle-icon">more_vert</i></a>

//             <ul id={this.props.id} className='dropdown-content'>
//               <li><Link to={`/admin/teachers/${this.props.teacher._id}/edit`} className="aribnb-font bold">编辑</Link></li>
//               <li><Link to={`/teachers/${this.props.teacher._id}`} className="aribnb-font bold">查看</Link></li>
//               <li className="divider"></li>
//               <li><a className="aribnb-font bold red-text" href="">注销</a></li>
//             </ul>
//           </td>
//         </tr>
//       )
//     }

//     return(
//       <tr>
//         <td><Link to={`/teachers/${this.props.teacher._id}/view`}><span className="airbnb-font">{this.props.teacher.lastname + this.props.teacher.firstname}</span></Link></td>
//         <td>{this.props.teacher.age}</td>
//         <td>{`${this.props.teacher.level}级`}</td>
//         <td>{this.props.teacher.gender}</td>
//         <td>{this.props.teacher.city}</td>
//         <td><button className={classes} onClick={this.updateTeacher("STATUS")}>{action}</button></td>
//         <td>
//           <a ref={this.dropdown} className='dropdown-trigger icon-link-wrapper' href='' data-target={this.props.id}>
//             <i className="material-icons circle-icon">more_vert</i>
//           </a>

//           <ul id={this.props.id} className='dropdown-content'>
//             <li><a className="aribnb-font bold" href="" onClick={this.updateTeacher("LEVELUP")}>升级</a></li>
//             <li><a className="aribnb-font bold" href="" onClick={this.updateTeacher("LEVELDOWN")}>降级</a></li>
//             <li><Link to={`/admin/teachers/${this.props.teacher._id}/edit`} className="aribnb-font bold">编辑</Link></li>
//             <li><Link to={`/teachers/${this.props.teacher._id}`} className="aribnb-font bold">查看</Link></li>
//             <li className="divider"></li>
//             <li><a className="aribnb-font bold red-text" href="">注销</a></li>
//           </ul>
//         </td>
//       </tr>
//     )
//   }
// }

// const mapStateToProps = state => {
//   // this.props.search
//   return {
//     teachers: state.teachersData.teachers,
//     students: state.studentsData.students
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateTeacher: (id, field) => dispatch(updateTeacher(id, field))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
