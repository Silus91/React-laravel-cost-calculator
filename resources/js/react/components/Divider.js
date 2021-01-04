import React, { useState } from "react";
import { Button } from "./Button";
import TextInput from "./TextInput";

const Divider = (props) => {
  const [state, setState] = useState({
    divider: "",
    valuePerItem: "0",
    weightPerItem: "0",
  });
  const handleChange = (event) => {
    setState({ ...state, divider: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({
      ...state,
      valuePerItem: props.totalCost / state.divider,
      weightPerItem: props.totalWeight / state.divider,
    });
  };

  const renderDividerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <TextInput
          type='number'
          className='validate'
          name='divider'
          value={divider}
          onChange={handleChange}
          htmlFor='divider'
          label='Divider'
        />
        <Button
          type='submit'
          className={
            divider <= 0
              ? "btn disabled"
              : "btn teal darken-2 z-depth-2 modal-close"
          }
          text='Divide'
        />
      </form>
    );
  };

  const { divider, valuePerItem, weightPerItem } = state;
  return (
    <div className='card horizontal row'>
      <div className='card-content col s6'>
        <span className='flow-text'>
          Total Value GBP
          <p className='red-text'>{parseFloat(props.totalCost).toFixed(2)}</p>
        </span>
        <br />
        Per 1 Item GBP
        <p className='red-text'>{parseFloat(valuePerItem).toFixed(2)}</p>
        Aproxx ~ Weight of 1 item +- g/ml
        <p className='red-text'>{parseFloat(weightPerItem).toFixed(2)}</p>
      </div>
      <div className='card-stacked col s6'>
        <div className='card-content'>{renderDividerForm()}</div>
      </div>
    </div>
  );
};

export default Divider;
