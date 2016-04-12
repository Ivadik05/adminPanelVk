import * as React from 'react';
import { Link } from 'react-router';
let styles = require('./style.css');

type Props = {
  children?: any;
  handler: Function;
  src: string;
}

type ButtonListProps = {
  children?: any;
  align?: 'center' | 'justify' | 'left' | 'right' | 'start' | 'end';
}

export let Logo = (props: Props) => {
  return (
    <div className={styles.logo}>
        <Link to={`/`}>
          <img src={props.src} alt='logo'/>
        </Link>
    </div>
  );
};
