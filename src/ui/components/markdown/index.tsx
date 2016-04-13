import * as React from 'react';
import * as marked from 'marked';
let styles = require('./style.css');

type Props = {
  str: string;
}

let rawMarkdown = (str) => {
  return { __html: marked(str, {sanitize: true}) };
};

export let Markdown = (props: Props) => {
  return (
    <div className={styles.markdown} dangerouslySetInnerHTML={rawMarkdown(props.str)}/>
  );
};
