import * as React from 'react';
import * as marked from 'marked';
let styles = require('./style.css');

type Props = {
  str: string;
}

let rawMarkup = (str) => {
  return { __html: str };
};

export let Markup = (props: Props) => {
  return (
    <div className={styles.markdown} dangerouslySetInnerHTML={rawMarkup(props.str)}/>
  );
};
