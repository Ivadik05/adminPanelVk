import * as React from 'react';
import Icon, { iconList } from '../icon';
let styles = require('./style.css');

export interface IProps {
  isShopCart: boolean;
}

export const Footer = (props: IProps) => {
  return (
      <footer className={styles.footer}>
        {!props.isShopCart ?
        <div className={styles.footerSocial}>
          <a href='https://www.instagram.com/vse_vzaimosvyazano/' target='_blank' className={styles.footerLink}>
            <Icon params={iconList.iconInsta}/>
          </a>
          <a href='http://vk.com/vse_vzaimosvyazano' target='_blank' className={styles.footerLink}>
            <Icon params={iconList.iconVK}/>
          </a>
        </div> : null}
      </footer>
  );
};
