import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import TextInput from "./TextInput";

const AddComponent = ({ addComponentToList, ingredients }) => {
  const [state, setState] = useState({
    componentWeight: "",
    ingredientRatio: "",
  });

  useEffect(() => {
  }, [ingredients]);

  const dataMap = () => {
    return {
      ingredientName: state.ingredientRatio.split(" ").slice(1).join(" "),
      ingredientRatio: parseFloat(state.ingredientRatio.split(" ")[0]),
      componentWeight: parseFloat(state.componentWeight),
      componentCost: parseFloat(
        state.ingredientRatio.split(" ")[0] * state.componentWeight
      ),
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComponentToList(dataMap());
    setState({ ...state, componentWeight: "", ingredientRatio: "" });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const renderSelect = () => {
    return (
      <select name='ingredientRatio' onChange={handleChange}>
        <option> Select one</option>
        {ingredients.map((ingredient, index) => {
          return (
            <option
              key={index}
              value={`${ingredient.ingredientRatio} ${ingredient.ingredientName}`}
            >
              {ingredient.ingredientName}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div className='card-content'>
      <form onSubmit={handleSubmit}>
        <div>{renderSelect()}</div>
        <TextInput
          type='number'
          name='componentWeight'
          className='validate'
          value={state.componentWeight}
          onChange={handleChange}
          htmlFor='componentWeight'
          label='Component Weight'
        />
        <Button
          text='submit'
          type='submit'
          className={
            state.componentWeight <= 0
              ? "btn disabled"
              : "btn teal darken-2 z-depth-2"
          }
        />
      </form>
    </div>
  );
};

export default AddComponent;
