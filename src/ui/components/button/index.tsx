import * as React from 'react';
let styles = require('./style.css');

type Props = {
  children?: any;
  handler: Function;
  type?: 'error' | 'white';
  disabled?: boolean;
}

type ButtonListProps = {
  children?: any;
  align?: 'center' | 'justify' | 'left' | 'right' | 'start' | 'end';
}

export let ButtonList = (props) => {
  return (
    <div className={styles.ButtonList}
          style={{textAlign: props.align || 'left'}}
          >
            {props.children}
    </div>
  );
};

export let Button = (props: Props) => {
  function getClass(type) {
    switch (type) {
      case 'error':
        return styles.error;
      case 'white':
        return styles.white;
      default: return styles.btn;
    }
  }
  return (
    <button className={getClass(props.type)}
              type='button'
              onClick={props.handler}
              disabled={props.disabled}
              >
                {props.children}
  </button>
  );
};
