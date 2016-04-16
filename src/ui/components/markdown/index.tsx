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
  console.error(props.str);
  return (
    <div className={styles.markdown} dangerouslySetInnerHTML={rawMarkdown(props.str)}/>
  );
};

// ### Обо мне
// Крутански вяжу и вообще молодец. **Отличная мама и люмимая жена**. Тут должно быть побольше текста. Но ничего в голову не лезет. Как -то так. Текст рыба. Вот вой [instagram](https://www.instagram.com/vse_vzaimo_svyazano/)
