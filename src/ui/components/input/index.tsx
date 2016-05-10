import * as React from 'react';
let styles = require('./style.css');
let InputElement = require('react-input-mask');
let classNames = require('classnames');

type Props = {
  type?: 'text' | 'phone'
  placeholder: string;
  onChange: Function;
}

export let Input = (props: Props) => {
  let onChange = (event) => {
    let elem = event.currentTarget;
    props.onChange(elem.value, elem);
  };

  return (
      <div className={styles.input}>
        {props.type && props.type === 'phone' ?
            (<InputElement {...props} mask='+7 (999) 999-99-99' placeholder={props.placeholder} onChange={onChange} maskChar={null}/>) :
            (<input type='text' placeholder={props.placeholder} onChange={onChange}/>)}
      </div>
  );
};
