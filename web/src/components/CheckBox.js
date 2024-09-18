import React from 'react';

const CheckBox = props => (
  <p>
    <input 
      name={props.name} 
      type="checkbox" 
      id={props.htmlID} 
      value={props.value}
      className={props.classes}
      onChange={props.handleChange}
      onBlur={props.handleChange}
    />
    <label htmlFor={props.htmlID}>{props.label}</label>
  </p>
)

export default CheckBox;
