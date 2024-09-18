import React from 'react';
import history from '../../history';

class PathNavigator extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if(this.props.back) {
      this.props.back()
    }
    history.push({
      pathname: this.props.path,
      state: this.props.state
    })
  }

  render() {
    return(
      <div style={{backgroundColor: "#ffca28", padding: "10px 0px 13px 0px"}}>
        <div className="container">
          <div className="row no-margin">
            <div className="col s12 no-padding">
              <h5 className="white-text" style={{fontWeight: "500"}}> <a className="clickable" style={{color: "white"}} onClick={this.handleClick}>返回</a> <span style={{color: "#eeeeee"}}> > { this.props.content }</span></h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PathNavigator;