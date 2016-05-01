import * as React from 'react';
let styles = require('./style.css');
let classNames = require('classnames');

type Props = {
  children?: any;
  handler: Function;
  type?: 'error' | 'white';
  disabled?: boolean;
  hint?: string;
}

type ButtonListProps = {
  children?: any;
  align?: 'center' | 'justify' | 'left' | 'right' | 'start' | 'end';
}

export let ButtonList = (props) => {
  return (
    <div className={styles.buttonList}
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
    <button className={classNames(getClass(props.type), {[styles.hint]: props.hint})}
            data-title={props.hint ? props.hint : null}
            type='button'
            onClick={props.handler}
            disabled={props.disabled}
          >
                {props.children}
    </button>
  );
};
