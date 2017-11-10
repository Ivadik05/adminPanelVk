import * as React from 'react';
let styles = require('./style.css');

interface IProps {
  children?: React.ReactNode;
}

export const Wrapper = (props: IProps) => {
  return (
      <main className={styles.wrapper}>
        {props.children}
      </main>
  );
};
