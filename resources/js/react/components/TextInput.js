import React from "react";

const TextInput = (props) => {
  return (
    <div className='input-field col s12'>
      <label className='active' htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        className='validate'
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default TextInput;
