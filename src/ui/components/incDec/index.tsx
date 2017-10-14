import * as React from 'react';
let styles = require('./style.css');

type Props = {
  count: number;
  incHandler: React.EventHandler<React.MouseEvent<HTMLElement>>;
  decHandler: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

export let IncDec = (props: Props) => {
  return (
      <div className={styles.incDec}>
        <span className={styles.down} onClick={props.decHandler}>-</span>
        <span className={styles.count}>{props.count}</span>
        <span className={styles.up} onClick={props.incHandler}>+</span>
      </div>
  );
};
