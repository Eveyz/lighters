class Book extends React.Component {
  
  clickButton() {
    this.props.clickButton(this.props.type, this.props.book);
  }

  deleteKeyword() {
    
  }

  render() {
    var button = this.props.type == "ADD" ? 
    <i className="material-icons green-text icon-clickable" onClick={this.clickButton.bind(this)}>add</i> 
    : 
    <i className="material-icons red-text icon-clickable" onClick={this.clickButton.bind(this)}>delete</i>

    if(this.props.has_keywords) {
      var keywords = [];
      this.props.book.keywords.forEach(function(keyword) {
        keywords.push(keyword["content"]);
      });

      var keywordsList = <KeywordList keywords={keywords} edit={this.props.edit} deleteKeyword={this.deleteKeyword.bind(this)} />

      return(
        <tr>
          <td>{button}</td>
          <td>{this.props.book.rlevel}</td>
          <td>{this.props.book.lslevel}</td>
          <td>{this.props.book.category}</td>
          <td>{this.props.book.serials}</td>
          <td>{this.props.book.name}</td>
          <td>{keywordsList}</td>
        </tr>
      )
    }

    return(
      <tr>
        <td>{button}</td>
        <td>{this.props.book.rlevel}</td>
        <td>{this.props.book.lslevel}</td>
        <td>{this.props.book.category}</td>
        <td>{this.props.book.serials}</td>
        <td>{this.props.book.name}</td>
      </tr>
    )
  }
}

class BookWithKeywords extends React.Component {
  
  clickButton() {
    this.props.clickButton(this.props.type, this.props.book);
  }

  deleteKeyword() {
    
  }

  render() {
    var button = this.props.type == "ADD" ? 
    <i className="material-icons green-text icon-clickable" onClick={this.clickButton.bind(this)}>add</i> 
    : 
    <i className="material-icons red-text icon-clickable" onClick={this.clickButton.bind(this)}>delete</i>

    var keywords = [];
    this.props.book.keywords.forEach(function(keyword) {
      keywords.push(keyword["content"]);
    });

    var keywordsList = <KeywordList keywords={keywords} edit={this.props.edit} deleteKeyword={this.deleteKeyword.bind(this)} />

    return(
      <tr>
        <td>{button}</td>
        <td>
          <table>
            <tbody>
              <tr>
                <th className="table-cell-padding">RAZ等级</th>
                <td className="table-cell-padding">{this.props.book.rlevel}</td>
              </tr>
              <tr>
                <th className="table-cell-padding">蓝思等级</th>
                <td className="table-cell-padding">{this.props.book.lslevel}</td>
              </tr>
              <tr>
                <th className="table-cell-padding">绘本分类</th>
                <td className="table-cell-padding">{this.props.book.category}</td>
              </tr>
              <tr>
                <th className="table-cell-padding">绘本系列名</th>
                <td className="table-cell-padding">{this.props.book.serials}</td>
              </tr>
              <tr>
                <th className="table-cell-padding">绘本名称</th>
                <td className="table-cell-padding">{this.props.book.name}</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td>{keywordsList}</td>
      </tr>
    )
  }
}