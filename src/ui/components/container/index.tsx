import * as React from 'react';
let styles = require('./style.css');

type Props = {
  children?: any;
  verticalPadding?: boolean;
}

export let Container = (props: Props) => {
  let vertPadding = props.verticalPadding === false ? false : true;
  let vertStyles = {
    paddingTop: '0',
    paddingBottom: '0'
  };
  return (
    <div className={styles.container} style={!vertPadding ? vertStyles : null}>
      {props.children}
    </div>
  );
};
