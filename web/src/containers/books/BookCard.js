import React from "react";
import KeywordList from "../keywords/KeywordList";
import { connect } from 'react-redux';

import { addKeyword, removeKeyword } from '../../actions/select_book_actions';

class BookCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: this.props.book.keywords || [],
      add: false,
      inputValue: "",
    };

    this.addKeyword = this.addKeyword.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  removeBook(e) {
    e.preventDefault();
    this.props.clickButton(this.props.book, this.props.content);
  }

  cancel(e) {
    e.preventDefault()
    this.setState({
      add: false
    })
  }

  switchMode(e) {
    e.preventDefault();
    const status = this.state.add ? false : true;
    this.setState({
      add: status
    });
  }

  addWidget() {
    return (
      <div className="card-action">
        <input 
          type="text"
          onChange={this.updateInputValue.bind(this)} autoFocus />
        <a className="waves-effect waves-light btn" onClick={this.addKeyword}>添加</a>
        <a className="waves-effect waves-light white btn black-text right" onClick={this.cancel}>返回</a>
      </div>
    )
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  addKeyword(e) {
    e.preventDefault()
    const _keyword = {
      book_id: this.props.book._id,
      content: this.state.inputValue
    };
    let index = this.state.keywords.findIndex(ky => ky.content === _keyword.content);
    if(_keyword.content) {
      if(index > -1) {
        window.Materialize.toast('关键词已经存在', 1000);
      } else {
        this.setState({
          keywords: [...this.state.keywords, _keyword],
          add: false
        });
        this.props.addKeyword(_keyword, this.props.content);
      }
    } else {
      window.Materialize.toast('关键词不能为空', 1000);
    }
  }

  deleteKeyword(keyword) {
    let _keywords = this.state.keywords;
    let index = _keywords.findIndex(ky => ky.content === keyword.content);
    if (index > -1) {
      _keywords.splice(index, 1);
      this.setState({
        keywords: _keywords,
        add: false
      });
      this.props.removeKeyword(keyword, this.props.content);
    }
  }

  render() {
    const isAdding = this.state.add;
    let action;
    if(isAdding) {
      action = this.addWidget();
    } else {
      action = this.props.edit ? 
              <div className="card-action">
                <a className="green-text" href="" onClick={this.switchMode.bind(this)}><b>添加关键词</b></a>
                <a className="red-text text-lighten-1" href="" onClick={this.removeBook.bind(this)}><b>移除绘本</b></a>
              </div>
              : '';
    }

    var keywordsList = <KeywordList 
                        identify={this.props.book._id}
                        keywords={this.state.keywords} 
                        edit={this.props.edit} 
                        deleteKeyword={this.deleteKeyword.bind(this)} 
                       />;

    const inputForm = <input type="hidden" />;

    let classes = this.props.content === "REVIEW" ? "card-title orange-text" : "card-title cyan-text";

    let border = this.props.content === "REVIEW" ? {borderLeft: "3px solid #ff9800"} : {borderLeft: "3px solid #00bcd4"};

    return(
      <div className="row no-margin">
        <div className="col s12 m12">
          <div className="card r-box-shadow" style={border}>
            <div className="card-content">
              <span className={classes}><b>{this.props.book.name}</b></span>
              <table>
                <thead>
                  <tr>
                    <th>RAZ等级</th>
                    <th>蓝思等级</th>
                    <th>绘本分类</th>
                    <th>绘本系列名</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.book.rlevel}</td>
                    <td>{this.props.book.lslevel}</td>
                    <td>{this.props.book.category}</td>
                    <td>{this.props.book.serials}</td>
                  </tr>
                </tbody>
              </table>
              <br/>
              <h6 className="orange-text">关键词:</h6>
              <br/>
              {keywordsList}
            </div>
            {action}
            {inputForm}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  switch(ownProps.content) {
    case 'REVIEW':
      return {
        keywords: state.reviewBooks.newKeywords
      };
    case 'NEW':
      return {
        keywords: state.newBooks.newKeywords
      };
    default:
      return {
        keywords: state.futureBooks.newKeywords
      };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addKeyword: (keyword, content) => dispatch(addKeyword(keyword, content)),
    removeKeyword: (keyword, content) => dispatch(removeKeyword(keyword, content))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);