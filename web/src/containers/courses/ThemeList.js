import React from 'react'

import { imagesList } from '../../ultis'
import Theme from './Theme'

class ThemeList extends React.Component {
  render() {
    const images = imagesList.map((img, idx) => {
      return <Theme key={idx} selectTheme={this.props.selectTheme} src={img} />
    })

    return(
      <div className="row">
        {images}
      </div>
    )
  }
}

export default ThemeList