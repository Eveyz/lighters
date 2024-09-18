import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import { selectCategory, selectSerial, resetDeault } from "../../actions/select_book_actions";
import BookTable from '../../components/books/bookTable';
import '../../css/App.css';

class SelectBookWidget extends React.Component {
  constructor(props) {
    super(props)

    this.categoryValue = React.createRef();
    this.serialNameValue = React.createRef();

    this.selectCategory = this.selectCategory.bind(this);
    this.selectSerial = this.selectSerial.bind(this);
  }

  initMaterilize() {
    M.AutoInit();
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, hover: true});
  }

  componentWillMount() {
    if(this.props.category !== "" && this.props.serialName !== "") {
      this.props.resetDeault(this.props.content);
    }
  }

  componentDidMount() {
    this.initMaterilize();
  }

  componentDidUpdate() {
    this.initMaterilize();
  }

  selectCategory() {
    let category = this.categoryValue.current.value;
    this.props.selectCategory(category, this.props.content);
  }

  selectSerial() {
    let serialName = this.serialNameValue.current.value;
    this.props.selectSerial(serialName, this.props.content);
  }
  
  render() {
    let categories = "";
    if(this.props.categories.length > 0) {
      categories = this.props.categories.map((category, idx) => {
        return <option key={idx}>{category}</option>;
      });
    }
    let categorySelect = <div>
                            <select
                              defaultValue="default" 
                              onChange={this.selectCategory}
                              ref={this.categoryValue}
                            >
                              <option key="default" value="default" disabled>请选择绘本分类</option>
                              {categories}
                            </select>
                            <label>请选择绘本分类</label>
                          </div>;

    let disabled = this.props.category === "" ? true : false;
    
    let serialsBooks = "";
    if(!disabled) {
      let serials = Object.keys(this.props.groupedBooks[this.props.category]);
      serialsBooks = serials.map((serial, idx) => {
        return <option key={idx}>{serial}</option>;
      });
    }
    let defaultValue = this.props.serialName !== "" ? this.props.serialName : "default";
    let serialsSelect = <div key="select-top-div">
                          <select
                            key={this.serialNameValue} 
                            value={defaultValue} 
                            onChange={this.selectSerial}
                            disabled={disabled}
                            ref={this.serialNameValue}
                          >
                            <option key="default" value="default" disabled>请选择绘本系列</option>
                            {serialsBooks}
                          </select>
                          <label>请选择绘本系列</label>
                        </div>;
    
    let bookTable = "";
    if(this.props.category !== "" && this.props.serialName !== "") {
      let books = this.props.groupedBooks[this.props.category][this.props.serialName];
      bookTable = books.length > 0 ? <BookTable content={this.props.content} books={books} type="ADD" /> : "";
    }

    return (
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

const mapStateToProps = (state, ownProps) => {
  switch(ownProps.content) {
    case 'REVIEW':
      return {
        categories: state.selectBooks.categories,
        groupedBooks: state.selectBooks.groupedBooks,
        category: state.reviewBooks.category,
        serialName: state.reviewBooks.serialName
      };
    case 'NEW':
      return {
        categories: state.selectBooks.categories,
        groupedBooks: state.selectBooks.groupedBooks,
        category: state.newBooks.category,
        serialName: state.newBooks.serialName
      };
    case 'FUTURE':
      return {
        categories: state.selectBooks.categories,
        groupedBooks: state.selectBooks.groupedBooks,
        category: state.futureBooks.category,
        serialName: state.futureBooks.serialName
      };
    default:
      return {
        categories: state.selectBooks.categories,
        groupedBooks: state.selectBooks.groupedBooks,
        category: state.selectBooks.category,
        serialName: state.selectBooks.serialName
      };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectCategory: (category, content) => dispatch(selectCategory(category, content)),
    selectSerial: (serialName, content) => dispatch(selectSerial(serialName, content)),
    resetDeault: (content) => dispatch(resetDeault(content))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBookWidget);