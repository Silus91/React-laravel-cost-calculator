import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { v1 as uuidv1 } from "uuid";
import { Button } from "./Button";
import TextInput from "./TextInput";

const AddComponent = ({ addComponentToList, ingredients }) => {
  const [state, setState] = useState({
    componentWeight: "",
    ingredientRatio: "",
  });

  useEffect(() => {
    M.AutoInit();
  }, []);

  const dataMap = () => {
    const newComponent = {
      ingredientName: state.ingredientRatio.split(" ").slice(1).join(" "),
      ingredientRatio: parseFloat(state.ingredientRatio.split(" ")[0]),
      componentWeight: parseFloat(state.componentWeight),
      componentCost: parseFloat(
        state.ingredientRatio.split(" ")[0] * state.componentWeight
      ),
    };
    return newComponent;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComponent = dataMap();
    addComponentToList(newComponent);
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
        {ingredients && ingredients.map((ingredient) => {
          return (
            <option
              key={ingredient.id}
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
