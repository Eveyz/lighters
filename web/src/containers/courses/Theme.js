import React from 'react'

class Theme extends React.Component {

  constructor(props) {
    super(props)

    this.selectTheme = this.selectTheme.bind(this)
  }

  selectTheme() {
    this.props.selectTheme(this.props.src)
  }

  render() {
    return(
      <div className="col m6 s12">
        <img 
          className="theme-img clickable" 
          alt={`${this.props.src}`} 
          src={`${process.env.REACT_APP_IMAGE_PATH}${this.props.src}`}
          onClick={this.selectTheme}
        />
      </div>
    )
  }
}

export default Theme