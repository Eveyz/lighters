class AddBooksWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: '',
      allBookList: [],
    };
  }

  componentWillMount() {
    $.getJSON("get_books", (response) => { this.setState({ books: response }) });
    $.getJSON("/books", (response) => { this.setState({ allBookList: response }) });
  }

  clickButton(type, id) {
    var url, method, message;
    if(type == "add") {
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
      data: { book_id: id },
      success: response => {
        this.setState({books: response.courses});
        if(response.msg) {
          M.toast({html: "绘本已添加过"});
        } else {
          M.toast({html: message});
        }
      }
    });
  }

  render() {
    var curbooksTable = this.state.books.length > 0 ? <BookTable type="delete" books={this.state.books} clickButton={this.clickButton.bind(this)} /> : <h6>目前还没有分配对应的绘本, 请从下面的书单中添加对应的绘本</h6>;
    var booksTable = <BookTable type="add" books={this.state.allBookList} clickButton={this.clickButton.bind(this)} />;

    return (
      <div>
        <div className="row">
          <div className="col s12 m6">
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
                <h5 className="blue-text">当前书单</h5>
                {curbooksTable}
                <br/>
                <h5 className="green-text">所有绘本书单</h5>
                {booksTable}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class BookTable extends React.Component {

  clickButton(type, id) {
    this.props.clickButton(type, id);
  }

  render() {
    var bookList = this.props.books.map((book, index) => {
                            return (
                              <Book key={index} book={book} type={this.props.type} clickButton={this.clickButton.bind(this)} />
                            );
                          });
    return(
      <table>
        <thead>
          <tr>
            <th>RAZ等级</th>
            <th>蓝思等级</th>
            <th>年龄段</th>
            <th>绘本分类</th>
            <th>系列名(links)</th>
            <th colSpan="3"></th>
          </tr>
        </thead>

        <tbody>
          {bookList}
        </tbody>
      </table>
    )
  }
}

class Book extends React.Component {
  
  clickButton() {
    this.props.clickButton(this.props.type, this.props.book[0]);
  }

  render() {
    var button = this.props.type == "add" ? <a herf="javascript:;" className="btn green" onClick={this.clickButton.bind(this)} >添加</a> : <a herf="javascript:;" className="btn red" onClick={this.clickButton.bind(this)} >移除</a>;
    return(
      <tr>
        <td>{this.props.book[1]}</td>
        <td>{this.props.book[2]}</td>
        <td>{this.props.book[3]}</td>
        <td>{this.props.book[4]}</td>
        <td>{this.props.book[5]}</td>
        <td>{button}</td>
      </tr>
    )
  }
}
