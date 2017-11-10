import * as React from 'react';
import { Logo } from '../logo';
let styles = require('./style.css');
let logoImg = require('./logo.jpg');

export const Header = () => {
  return (
      <header className={styles.header}>
        <Logo
          src={logoImg}
        />
      </header>
  );
};
