import React from 'react';

export const FlashMessage = ({props}) => {
  let bgClass = "";
  if(props.status === "error") bgClass = "error-msg";
  else if(props.status === "warning") bgClass = "warning-msg";
  else if(props.status === "success") bgClass = "success-msg";

  return (
    <div className="row no-margin">
      <div className="input-field col m12 s12 no-margin">
        <div className={"flash-msg " + bgClass}>
          <span className="center white-text">{props.msg}</span>
        </div>
      </div>
    </div>
  )
}