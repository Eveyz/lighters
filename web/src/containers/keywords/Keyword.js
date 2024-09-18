import React from "react";

class Keyword extends React.Component {

  deleteKeyword() {
    this.props.deleteKeyword(this.props.keyword);
  }

  render() {
    const icon = this.props.edit ? <span><i className="close material-icons" onClick={this.deleteKeyword.bind(this)}>close</i></span> : "";
    var input = "";
    if(this.props.model === "book") {
      input = <input type="hidden" name="book[keywords][]" value={this.props.keyword.content} />;
    }
    return (
      <span>
        <div className="chip">
          {input}
          {this.props.keyword.content}
          {icon}
        </div>
      </span>
    )
  }
}

export default Keyword;