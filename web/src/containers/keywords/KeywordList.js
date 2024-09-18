import React from "react";
import Keyword from "./Keyword";

class KeywordList extends React.Component {

  deleteKeyword(keyword) {
    this.props.deleteKeyword(keyword);
  }

  renderList() {
    return this.props.keywords.map((keyword, index) => {
      return (
        <Keyword 
          key={keyword + "-" + index} 
          keyword={keyword} 
          edit={this.props.edit} 
          model={this.props.model}
          deleteKeyword={this.deleteKeyword.bind(this)} 
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

export default KeywordList;