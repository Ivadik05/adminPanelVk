import * as React from 'react';
let styles = require('./style.css');
let InputElement = require('react-input-mask');
let classNames = require('classnames');

type Props = {
  type?: 'text' | 'phone';
  required?: boolean;
  pattern?: any;
  placeholder: string;
  onChange: Function;
  onError?: Function;
}

export let Input = (props: Props) => {
  let onChange = (event) => {
    let elem = event.currentTarget;
    console.error(elem.validity.valid);
    console.error(elem.validity);
    console.error(elem.value);
    props.onChange(elem.value, elem);
  };

  return (
      <div className={styles.input}>
        {props.type && props.type === 'phone' ?
            (<InputElement {...props} mask='+7 (999) 999-99-99' placeholder={props.placeholder} type='tel' pattern='\d [0-9]' onChange={onChange} maskChar={null}/>) :
            (<input type='text' placeholder={props.placeholder} onInput={onChange} required={props.required && props.required}/>)}
      </div>
  );
};
