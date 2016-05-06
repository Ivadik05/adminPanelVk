import * as React from 'react';
let styles = require('./style.css');
let classNames = require('classnames');

export type CardType = {
  id: string;
  content: any;
}

type Props = {
  cards: Array<CardType>;
  active: string;
  onChange: Function;
}

export let CardSelect = (props: Props) => {
  let cards = props.cards.map(card => (
      <div className={classNames(styles.card, {[styles.active]: props.active === card.id})}
           onClick={() => {props.onChange(card.id);}}>
        {card.content}
      </div>
  ));
  return (
    <div className={styles.cardList}>
      {cards}
    </div>
  );
};