class assignBooksWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: '',
      allBookList: [],
    };
  }

  componentWillMount() {
    // current asigned books for course
    $.getJSON("get_books", (response) => { this.setState({ books: response }) });

    // all books from database
    $.getJSON("/books", (response) => { this.setState({ allBookList: response }) });
  }

  clickButton(type, book) {
    var url, method, message;
    if(type == "ADD") {
      url = "/courses/" + this.props.course_id + "/append_book";
      method = "post";
      message = "成功添加绘本";
    } else {
      url = "/courses/" + this.props.course_id + "/remove_book";
      method = "delete";
      message = "成功移除绘本";
    }
    $.ajax({
      url: url,
      type: method,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      dataType: 'json',
      data: { book_id: book.id },
      success: response => {
        console.log("after ajax ", response);
        this.setState({books: response.books});
        if(response.msg === "Validation failed: Book Dupliacte.") {
          M.toast({html: "绘本已添加过"});
        } else {
          M.toast({html: message});
        }
      }
    });
  }

  render() {
    // current asigned books
    var curbooksTable = this.state.books.length > 0 ? 
                        <BookTable 
                          type="DELETE" 
                          books={this.state.books} 
                          clickButton={this.clickButton.bind(this)} 
                        /> : 
                        <h6>目前还没有分配对应的绘本, 请从下面的书单中添加对应的绘本</h6>;

    var selectBookWidget = this.state.allBookList.length > 0 ?
                        <SelectBookWidget 
                          assignedBooks={this.state.allBookList} 
                          addBook={this.clickButton.bind(this)} 
                        /> : 
                        <h6 className="center">无法获取绘本资源，请确认已导入或者输入绘本资源</h6>;

    return (
      <div>
        <div className="row">
          <div className="col s12 m12">
            <h4 className="blue-text">{ this.props.course_name }</h4>
            <p>授课老师: { this.props.teacher }</p>
            <p>课程级别: { this.props.course_level } </p>
            <p>课程容量: { this.props.course_capacity }</p>
          </div>
        </div>
        <div className="row">

          <div className="col s12 m12">
            <div className="card">
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
    )
  }
}