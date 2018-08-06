import React from "react";
import BookCard from "./BookCard";

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

export default BookCards;