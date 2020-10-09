import React from 'react';
import classNames from 'classnames';

import styles from './Square.module.scss';

export interface Props {
  x: number;
  y: number;
  squareType?: string;
  onClick: (x: number, y: number) => any;
}

export default class Square extends React.PureComponent<Props> {
  render() {
    const { x, y, squareType, onClick = () => {} } = this.props;
    const squareCssClass = classNames(styles.square, squareType ? styles[squareType] : null);

    return <div className={squareCssClass} onClick={() => onClick(x, y)}></div>;
  }
}
