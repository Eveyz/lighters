import React from "react";
import BookCard from "./BookCard";

class BookCards extends React.Component {

  clickButton(book, content) {
    this.props.clickButton(book, content);
  }

  render() {
    var bookList = this.props.books.map((book, index) => {
                      return (
                        <BookCard 
                          key={book._id} 
                          book={book} 
                          content={this.props.content}
                          type={this.props.type} 
                          edit={this.props.edit}
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