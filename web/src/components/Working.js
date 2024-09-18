import React from 'react';
import Spinner from './../images/loading.svg';

const Working = props => (
  <div className="container">
    <div className="working-info">
      <img className="center" src={Spinner} alt="working..."></img>
      <h4 className="center white-text">{props.msg}</h4>
    </div>
  </div>
)

export default Working;
