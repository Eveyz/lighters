class BookCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keywords: this.props.book.keywords || [],
      add: false,
      inputValue: "",
    };
  }

  removeBook() {
    this.props.clickButton(this.props.type, this.props.book);
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
    const _keyword = this.state.inputValue;
    let _keywords = this.state.keywords;
    let index = _keywords.indexOf(_keyword);
    if(_keyword) {
      if(index > -1) {
        M.toast({html: "关键词已经存在!"})
      } else {
        _keywords.push(_keyword);
        this.setState({
          keywords: _keywords,
          add: false
        });
      }
    } else {
      M.toast({html: "关键词不能为空!"})
    }
  }

  deleteKeyword(keyword) {
    let _keywords = this.state.keywords;
    let index = _keywords.indexOf(keyword);
    if (index > -1) {
      _keywords.splice(index, 1);
    }
    this.setState({
      keywords: _keywords,
      add: false
    });
  }

  render() {
    const isAdding = this.state.add;
    let action;
    if(isAdding) {
      action = this.addWidget();
    } else {
      action = this.props.edit ? 
              <div className="card-action">
                <a className="green-text" href="javascript:;" onClick={this.switchMode.bind(this)}><b>添加关键词</b></a>
                <a className="red-text text-lighten-1" href="javascript:;" onClick={this.removeBook.bind(this)}><b>移除绘本</b></a>
              </div>
              : '';
    }

    var keywordsList = <KeywordList 
                        identify={this.props.book.id}
                        keywords={this.state.keywords} 
                        edit={this.props.edit} 
                        deleteKeyword={this.deleteKeyword.bind(this)} 
                       />;

    var paramsName = this.props.model + "[" + this.props.field + "]" + "[" + this.props.book.id + "]" + "[]";
    const inputForm = <input type="hidden" name={paramsName} value={this.state.keywords} />;

    return(
      <div className="row no-margin">
        <div className="col s12 m12">
          <div className="card">
            <div className="card-content">
              <span className="card-title cyan-text"><b>{this.props.book.name}</b></span>
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