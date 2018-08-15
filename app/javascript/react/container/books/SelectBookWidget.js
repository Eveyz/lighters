import React from "react";
import SelectTag from "../forms/SelectTag";
import Book from "../books/Book";

class SelectBookWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grouped_books: {},
      category: "",
      categories: [],
      serialsNames: [],
      books: []
    };
    // hierachy => grouped_books -> links -> books
    // 分类 -> 系列名 -> 绘本

    // book fetch from server => [:id, :rlevel, :lslevel, :age, :category, :names, :links]
  }

  groupBooks(books) {
    var groupBooks = {};

    // group books by category
    books.forEach(function(book) {
      if(!(book.category in groupBooks)) {
        groupBooks[book.category] = [];
      }
      groupBooks[book.category].push(book);
    });

    // group books by serials name
    var serialsBooks;
    for(var category in groupBooks) {
      serialsBooks = {};
      if (groupBooks.hasOwnProperty(category)) {
        groupBooks[category].forEach(function(book) {
          var serialsName = book.serials;
          if(!(serialsName in serialsBooks)) {
            serialsBooks[serialsName] = [];
          }
          serialsBooks[serialsName].push(book);
        });
        groupBooks[category] = serialsBooks;
      }
    }
    return { grouped_books: groupBooks, categories: Object.keys(groupBooks) };
  }

  componentWillMount() {

    // books existing for course passed by props
    var _books = this.props.assignedBooks;
    // fetch all books from database if is admin
    if(_books.length <= 0) {
      $.getJSON("/books/books_keywords", (response) => { 
        _books = response;
        var obj = this.groupBooks(_books);
        this.setState(obj);
      });
    } else {
      var obj = this.groupBooks(_books);
      this.setState(obj);
    }
    this.initialMaterializeSelect();
  }

  initialMaterializeSelect() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }

  componentDidMount() {
    this.initialMaterializeSelect();
  }
  
  componentDidUpdate(prevProps) {
    this.initialMaterializeSelect();
  }

  selectCategory(category) {
    if(category === "default") {
      this.setState({ 
        category: "", 
        serialsNames: [], 
        books: [] 
      });
    } else {  
      let _books = this.state.grouped_books[category];
      let _serialsNames = Object.keys(_books);
      this.setState({
        category: category,
        serialsNames: _serialsNames,
        books: []
      });
    } 
  }

  selectSerial(serialsName) {
    if(serialsName === "default") {
      this.setState({
        books: []
      })
    } else {
      var _books = this.state.grouped_books[this.state.category][serialsName];
      this.setState({
        books: _books
      })
    }
  }

  // Output API for Parent COMPONENT
  clickButton(action, book) {
    // type : add or delete
    this.props.addBook(action, book);
  }

  render() {
    let _categories = this.state.categories;

    if(_categories.length <= 0) {
      return <h5 className="center-align">绘本加载中...</h5>;
    }
    
    let disable = Object.keys(this.state.grouped_books).length === 0 && this.state.grouped_books.constructor === Object ? true : false;

    let categorySelect = <SelectTag 
                            options={_categories} 
                            disable={disable} 
                            defaultOption="请选择绘本分类" 
                            selectOption={this.selectCategory.bind(this)}
                          />;

    disable = this.state.category ? false : true;
    var serialsSelect = <SelectTag 
                          options={this.state.serialsNames} 
                          disable={disable} 
                          defaultOption="请选择绘本系列" 
                          selectOption={this.selectSerial.bind(this)} 
                        />;

    let books = this.state.books.map((book, index) => {
      return(
        <Book key={index} edit={true} book={book} has_keywords={false} type="ADD" clickButton={this.clickButton.bind(this)} />
      )
    });

    let bookTable = this.state.books.length > 0 ? 
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
                        {books}
                      </tbody>
                    </table> :
                    "";

    return(
      <div>
        <div className="row no-margin">
          <div className="input-field col m6">{categorySelect}</div>
          <div className="input-field col m6">{serialsSelect}</div>
        </div>

        <div className="books-table">
          {bookTable}
        </div>
      </div>
    )
  }
}

export default SelectBookWidget;
