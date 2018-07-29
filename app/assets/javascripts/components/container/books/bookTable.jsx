class BookTable extends React.Component {

  clickButton(action, book) {
    this.props.clickButton(action, book);
  }

  render() {
    var bookList = this.props.books.map((book, index) => {
                      return (
                        <Book 
                          key={index} 
                          book={book} 
                          type={this.props.type} 
                          edit={this.props.edit}
                          has_keywords={this.props.has_keywords} 
                          clickButton={this.clickButton.bind(this)} />
                      );
                    });
    return(
      <table>
        <thead>
          <tr>
            <th></th>
            <th>RAZ等级</th>
            <th>蓝思等级</th>
            <th>绘本分类</th>
            <th>绘本系列名</th>
            <th>绘本名称</th>
          </tr>
        </thead>

        <tbody>
          {bookList}
        </tbody>
      </table>
    )
  }
}

class BookCards extends React.Component {

  clickButton(action, book) {
    this.props.clickButton(action, book);
  }

  render() {
    var bookList = this.props.books.map((book, index) => {
                      return (
                        <BookCard 
                          key={book.id} 
                          book={book} 
                          type={this.props.type} 
                          edit={this.props.edit}
                          model={this.props.model}
                          field={this.props.field}
                          clickButton={this.clickButton.bind(this)}
                        />
                      );
                    });

    return(
      <div>
        {bookList}
      </div>
    )
  }
}