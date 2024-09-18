import React from 'react';

export const Toolbar = props => (
  <div className="slate-editor-toolbar r-box-shadow">
    {props.children}
  </div>
)

export const ToolbarButton = ({active, ...rest}) => (
  <div className={active ? "active toolbutton" : "toolbutton"} {...rest}>{rest.children}</div>
)

export const ToolbarIcon = ({active, ...rest}) => (
  <i className={active ? "active material-icons toolicon" : "material-icons toolicon"} {...rest}>{rest.children}</i>
)