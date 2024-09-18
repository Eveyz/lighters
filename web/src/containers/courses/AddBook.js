import React from 'react';
import { connect } from 'react-redux';

import '../../css/App.css';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import BookTable from '../../components/books/bookTable';
import Breadcrumb from '../../components/layouts/Breadcrumb';
import SelectBookWidget from '../../containers/books/SelectBookWidget';
import { groupBooksAction, selectCategory, selectSerial, resetDeault } from "../../actions/select_book_actions";

class CourseAddBook extends React.Component {

  componentWillMount() {
    this.props.groupBooks(this.props.books)
  }
  
  render() {
    let teachers = this.props.course.teachers.map((teacher, index) => {
      return (
        <span key={index}>{teacher.lastname + teacher.firstname} </span>
      )
    });
    let curbooksTable = this.props.assignedBooks.length > 0 ? 
                        <BookTable 
                          content="ADMIN"
                          books={this.props.assignedBooks} 
                          type="DELETE" 
                        /> : 
                        <h6>目前还没有分配对应的绘本, 请从下面的书单中添加对应的绘本</h6>;

    let selectBookWidget = this.props.books.length > 0 ?
      <SelectBookWidget 
        content="ADMIN"
        groupedBooks={this.props.selectBooks.groupedBooks}
        category={this.props.selectBooks.category}
        categories={this.props.selectBooks.categories}
        serialName={this.props.selectBooks.serialName}
        selectCategory={this.props.selectCategory}
        selectSerial={this.props.selectSerial}
        resetDeault={this.props.resetDeault}
      /> : 
      <h6 className="center">无法获取绘本资源，请确认已导入或者输入绘本资源</h6>;

    return (
      <div>
        <Header />
        <div className="bg-light-grey page-min-height">
          <Breadcrumb action="addBooks"/>

          <div className="container">

            <div className="row">
              <div className="col s12 m12">
                <h3>{this.props.course.name}</h3>
                <p>授课老师: {teachers}</p>
                <p>课程级别: {this.props.course.level}</p>
                <p>课程容量: {this.props.course.capacity}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12">
                <div className="card r-box-shadow" style={{padding: "0px 30px 0px 30px"}}>
                  <div className="card-content">
                    <h5 className="blue-text">学生专属书单</h5>
                    {curbooksTable}
                    <br/>
                    <h5 className="green-text">所有绘本书单</h5>
                    {selectBookWidget}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    identity: state.auth.user.userTokenData.identity,
    course: state.coursesData.currentCourse,
    search: state.coursesData.searchStudent,
    courses: state.coursesData.courses,
    assignedBooks: state.coursesData.currentCourse.books,
    students: state.studentsData.students,
    books: state.booksData.books,
    selectBooks: state.selectBooks
  };
}

const mapDispatchToProps = dispatch => {
  return {
    groupBooks: (books) => dispatch(groupBooksAction(books)),
    selectCategory: (category, content) => dispatch(selectCategory(category, content)),
    selectSerial: (serialName, content) => dispatch(selectSerial(serialName, content)),
    resetDeault: (content) => dispatch(resetDeault(content))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAddBook);