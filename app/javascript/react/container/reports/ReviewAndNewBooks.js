import React from "react";
import SelectBooksForReport from "./SelectBooksForReport";

class ReviewAndNewBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedBooks: [],
      // review books are for reviewing last course content
    };
  }

  componentWillMount() {
    // get course's books
    $.getJSON("/courses/" + this.props.course_id + "/get_books", (response) => { 
      this.setState({ assignedBooks: response }) 
    });
  }

  render() {
    return(
      <div>
        <div className="row no-margin">
            <div className="input-field col m12 na-margin">
              <h5 className="orange-text">复习内容 <span style={{color: "red"}}>*</span></h5>
            </div>
          </div>

          <SelectBooksForReport
            field="review"
            model="report"
            action={this.props.action}
            add={false}
            course_id={this.props.course_id}
            student_id={this.props.student_id}
            report_id={this.props.report_id}
            assignedBooks={this.state.assignedBooks}
          />

          <br/>

          <div className="row no-margin">
            <div className="input-field col m12 no-margin">
              <h5 className="cyan-text">新课内容 <span style={{color: "red"}}>*</span></h5>
            </div>
          </div>

          <SelectBooksForReport 
            field="content"
            model="report"
            action={this.props.action}
            add={true}
            course_id={this.props.course_id}
            student_id={this.props.student_id}
            report_id={this.props.report_id}
            assignedBooks={this.state.assignedBooks}
          />

          <br/>

          <div className="row no-margin">
            <div className="input-field col m12 no-margin">
              <h5 className="teal-text">下次课书目 <span style={{color: "red"}}>*</span></h5>
            </div>
          </div>

          <SelectBooksForReport 
            field="future_books"
            model="report"
            action={this.props.action}
            add={true}
            course_id={this.props.course_id}
            student_id={this.props.student_id}
            report_id={this.props.report_id}
            assignedBooks={this.state.assignedBooks}
          />

      </div>
    )
  }
}

export default ReviewAndNewBooks;