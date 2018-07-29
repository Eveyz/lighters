class KeywordWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: this.props.keywords || [],
      add: false,
      inputValue: ''
    };
  }

  addWidget() {
    return (
      <div className="card-action">
        <input 
          type="text"
          onChange={this.updateInputValue.bind(this)} autoFocus />
        <a className="waves-effect waves-light btn" onClick={this.addKeyword.bind(this)}>添加</a>
        <a className="waves-effect waves-light white btn black-text right" onClick={this.cancel.bind(this)}>返回</a>
      </div>
    )
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  addKeyword() {
    const keyword = this.state.inputValue;
    let keywords = this.state.keywords;
    let index = keywords.indexOf(keyword);
    if(keyword) {
      if(index > -1) {
        M.toast({html: "关键词已经存在!"})
      } else {
        keywords.push(keyword);
        this.setState({
          keywords: keywords,
          add: false
        });
      }
    } else {
      M.toast({html: "关键词不能为空!"})
    }
  }

  cancel() {
    this.setState({
      add: false
    })
  }

  switchMode() {
    const status = this.state.add ? false : true;
    this.setState({
      add: status
    });
  }

  deleteKeyword(keyword) {
    let keywords = this.state.keywords;
    let index = keywords.indexOf(keyword);
    if (index > -1) {
      keywords.splice(index, 1);
    }
    this.setState({
      keywords: keywords,
      add: false
    });
  }

  render() {

    const isAdding = this.state.add;
    let action;
    if(isAdding) {
      action = this.addWidget();
    } else {
      action = this.props.edit ? <div className="card-action"><a href="javascript:;" onClick={this.switchMode.bind(this)}>添加关键词</a></div> : '';
    }

    return (
      <div className="row">
        <div className="col s12 m12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">关键词:</span>
              <KeywordList 
                keywords={this.state.keywords} 
                edit={this.props.edit} 
                deleteKeyword={this.deleteKeyword.bind(this)} 
                model={this.props.model}
              />
            </div>
            {action}
          </div>
        </div>
      </div>
    )
  }
}

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

class Keyword extends React.Component {

  deleteKeyword() {
    this.props.deleteKeyword(this.props.keyword);
  }

  render() {
    const icon = this.props.edit ? <span><i className="close material-icons" onClick={this.deleteKeyword.bind(this)}>close</i></span> : "";
    var input = "";
    if(this.props.model === "book") {
      input = <input type="hidden" name="book[keywords][]" value={this.props.keyword} />;
    }
    return (
      <span>
        <div className="chip">
          {input}
          {this.props.keyword}
          {icon}
        </div>
      </span>
    )
  }
}
