import * as React from 'react';
import { Link } from 'react-router';
let styles = require('./style.css');

type Props = {
  children?: any;
  src: string;
  link?: string;
}

type ButtonListProps = {
  children?: any;
  align?: 'center' | 'justify' | 'left' | 'right' | 'start' | 'end';
}

// <img src={props.src} alt='logo'/>
export let Logo = (props: Props) => {
  let link = props.link ? props.link : '/';
  return (
    <div className={styles.logo}>
        <Link to={link}>
          <img src='200x100.png' data-1x='400x200.png' data-2x='800x400.png'/>
        </Link>
    </div>
  );
};
