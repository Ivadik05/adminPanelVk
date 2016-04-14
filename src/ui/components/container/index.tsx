import * as React from 'react';
let styles = require('./style.css');

type Props = {
  children?: any;
}

export let Container = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
};
