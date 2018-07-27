import React from 'react';
import classNames from 'classnames';
import './cell.css';

const Cell = (props) => (
  <div
    className={classNames('Cell', { 'Cell--active': props.isActive, 'Cell--disabled': props.isDisabled })}
    onClick={props.onClick}>
    {props.value}
  </div>
);

export default Cell;
