import React from 'react';
import classNames from 'classnames';

import styles from './Square.module.scss';

export interface Props {
  id: string;
  squareType?: string;
}

export default class Square extends React.PureComponent<Props> {
  render() {
    const { id, squareType } = this.props;
    const squareCssClass = classNames(styles.square, squareType === 'trees' ? styles.trees : undefined);

    return <div className={styles.square}></div>;
  }
}
