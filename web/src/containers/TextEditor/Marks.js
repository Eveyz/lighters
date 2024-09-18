import React from 'react';

export const BoldMark = props => (
  <b>
    {props.children}
  </b>
);

export const ItalicMark = props => (
  <em property="italic">
    {props.children}
  </em>
);

export const UnderlinedMark = props => (
  <u>
    {props.children}
  </u>
);

export const BlockquoteBlock = props => (
  <blockquote>
    {props.children}
  </blockquote>
);

export const UlBlock = props => (
  <ul>
    {props.children}
  </ul>
);

export const H1Block = props => (
  <h1>
    {props.children}
  </h1>
);

export const H2Block = props => (
  <h2>
    {props.children}
  </h2>
);

export const LiBlock = props => (
  <li>
    {props.children}
  </li>
);

export const OlBlock = props => (
  <ol>
    {props.children}
  </ol>
);