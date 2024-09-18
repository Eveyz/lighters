import React from 'react';
import { connect } from 'react-redux';

import SearchTeacherList from './SearchTeacherList';

class SearchTeacher extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }
    this.teachers = []
  }

  searchTeacher = (e) => {
    let val = e.target.value
    if(val) {
      this.teachers = this.props.teachers.filter((teacher, idx) => {
        return (teacher.lastname + teacher.firstname).includes(val)
      })
    } else {
      this.teachers = []
    }
    this.setState({value: val})
  }
  
  render() {
    let teacherContent = ""
    if(this.teachers.length > 0) {
      teacherContent = this.teachers.length > 0 ? 
                <SearchTeacherList teachers={this.teachers} />
                :
                <h6 className="airbnb-font bold center">搜索不到对应的教师</h6>
    }

    return(
      <div>
        <input 
          type="text"
          onChange={this.searchTeacher}
          autoFocus
          placeholder="请输入教师名字"
        />
        {teacherContent}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    teachers: state.teachersData.teachers
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTeacher)