import React from "react";
import Book from "./Book";
import FormInput from "../forms/Input";

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
                          model={this.props.model}
                          field={this.props.field}
                          has_keywords={this.props.has_keywords} 
                          clickButton={this.clickButton.bind(this)} />
                      );
                    });
    
    var inputs = "";
    if(this.props.model === "report") {
      var paramsName = this.props.model + "[" + this.props.field + "]" + "[]";
      inputs = this.props.books.map((book, index) => {
        return (
          <FormInput key={index} type="hidden" name={paramsName} value={book.id} />
        );
      });
    }

    return(
      <div>
        {inputs}
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
      </div>
    )
  }
}

export default BookTable;