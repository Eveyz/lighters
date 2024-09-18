import React from 'react';

const SearchTeacherList = props => {

  const selectTeacher = (teacher) => e => {
    props.selectTeacher(teacher)
    props.setMode("VIEW_TEACHER")
  }

  let teacherList = props.data.map((teacher, idx) => {
    return <tr
            key={idx} 
            onClick={selectTeacher(teacher)} 
            className="action-hide clickable"
           >
              <td>{teacher.lastname}{teacher.firstname}</td>
              <td>{teacher.level}级</td>
            </tr>
  })
  let teacherContent = <table className="highlight">
                        <thead>
                          <tr>
                            <th>教师姓名</th>
                            <th>教师等级</th>
                          </tr>
                        </thead>

                        <tbody>
                          {teacherList}
                        </tbody>
                      </table>

  return(
    <div>
      {teacherContent}
    </div>
  )
}

export default SearchTeacherList

// class SearchTeacherList extends React.Component {

//   selectTeacher = (teacher, teacher_id) => e => {
//     this.props.selectTeacher(teacher)
//     this.props.getPaychecks(`?teacher_id=${teacher_id}`)
//     this.props.setMode("VIEW_TEACHER")
//   }
  
//   render() {
//     let teacherList = this.props.data.map((teacher, idx) => {
//       return <tr
//               key={idx} 
//               onClick={this.selectTeacher(teacher, teacher._id)} 
//               className="action-hide clickable"
//              >
//                 <td>{teacher.lastname}{teacher.firstname}</td>
//                 <td>{teacher.level}级</td>
//               </tr>
//     })
//     let teacherContent = <table className="highlight">
//                           <thead>
//                             <tr>
//                               <th>教师姓名</th>
//                               <th>教师等级</th>
//                             </tr>
//                           </thead>

//                           <tbody>
//                             {teacherList}
//                           </tbody>
//                         </table>

//     return(
//       <div>
//         {teacherContent}
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     mode: state.mode.value
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     selectTeacher: (teacher) => {
//       dispatch(selectTeacher(teacher))
//     },
//     getPaychecks: (query) => {
//       dispatch(getPaychecks(query))
//     },
//     setMode: (mode) => {
//       dispatch(setMode(mode))
//     }
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchTeacherList)