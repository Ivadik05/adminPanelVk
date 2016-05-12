import * as React from 'react';
let styles = require('./style.css');
let InputElement = require('react-input-mask');
let classNames = require('classnames');

type Props = {
  type?: 'text' | 'phone' | 'email';
  required?: boolean;
  pattern?: any;
  placeholder: string;
  onChange: Function;
  onError?: Function;
}

export let Input = (props: Props) => {
  let onChange = (event) => {
    let elem = event.currentTarget;
    let value = elem.value;

    switch (props.type) {
      case 'phone':
        if (/(\+7)?[\ ]?(\(?\d{3}\)?[\ ]?)?[\d\- ]{10}$/i.test(value)) {
          console.error('phone');
        }
        break;
      case 'email':
        if (/.+@.+..+/i.test(value)) {
          console.error('email');
        }
        break;
    }
    props.onChange(value, elem);
  };

  return (
      <div className={styles.input}>
        {props.type && props.type === 'phone' ?
            (<InputElement {...props} mask='+7 (999) 999-99-99' placeholder={props.placeholder} type='tel' onChange={onChange} maskChar={null}/>) :
            (<input type='text' placeholder={props.placeholder} onInput={onChange} required={props.required && props.required}/>)}
      </div>
  );
};
