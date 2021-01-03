import React, { useState, useContext, useEffect } from "react";
import { INGREDIENT_ADD, INGREDIENT_EDIT, STOP_LOADING_UI, LOADING_UI } from "../types/types";
import M from "materialize-css";
import TextInput from "./TextInput";
import { StoreContext } from "../contexts/StoreContext";
import { Button } from "./Button";
import axios from 'axios';

const AddEditIngredient = (props) => {
  const { dispatch } = useContext(StoreContext);

  const [state, setState] = useState({
    ingredientName: "",
    ingredientCost: "",
    ingredientWeight: "",
  });
  useEffect(() => {
    M.AutoInit();
    if (props.ingredient) {
      setState({
        ...state,
        ingredientName: props.ingredient.ingredientName,
        ingredientCost: props.ingredient.ingredientCost,
        ingredientWeight: props.ingredient.ingredientWeight,
      });
    }
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const dataMap = () => {
    const newIngredient = {
      id: props.ingredient? props.ingredient.id : "",
      ingredientName: state.ingredientName,
      ingredientCost: parseFloat(state.ingredientCost),
      ingredientWeight: parseFloat(state.ingredientWeight),
      ingredientRatio: parseFloat(
        state.ingredientCost / state.ingredientWeight
      ),
    };
    console.log("tutaj nowy ing", newIngredient)

    return newIngredient;
  };


  const BASE_URL = "http://localhost:8000/api"

  async function sendDataIngredient (newIngredient) {
    if (props.ingredient) {
      sendEditIngredient(newIngredient);
      } else {
        sendNewIngredient(newIngredient);
      }
  }

  async function sendNewIngredient (newIngredient) {
    dispatch({ type: LOADING_UI});
    const response = await  axios.post(`${BASE_URL}/ingredient`, newIngredient).then((result)=> {
      return result;
    })
    dispatch({ type: INGREDIENT_ADD, payload: response.data });
    dispatch({ type: STOP_LOADING_UI});
  }

    async function sendEditIngredient (newIngredient) {
      dispatch({ type: LOADING_UI});
      const response = await  axios.patch(`${BASE_URL}/ingredient/${newIngredient.id}`, newIngredient).then(function(result) {
        return result;
      });
      dispatch({
        type: INGREDIENT_EDIT,
        payload: response.data,
        id: response.data.id,
      });
      dispatch({ type: STOP_LOADING_UI});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newIngredient = dataMap();
   sendDataIngredient(newIngredient);
    setState({ ingredientWeight: "", ingredientName: "", ingredientCost: "" });
  };

  const { ingredientCost, ingredientName, ingredientWeight } = state;

  return (
    <div>
      <a
        className='waves-effect waves-light btn modal-trigger'
        data-target={props.id}
      >
        {props.ingredient ? "Edit" : "Add New"}
      </a>
      <div id={props.id} className='modal'>
        <form onSubmit={handleSubmit}>
          <div className='modal-content'>
            <h4> {props.ingredient ? "Edit" : "Add New Ingredient"}</h4>
            <TextInput
              type='text'
              name='ingredientName'
              className='validate'
              value={ingredientName}
              onChange={handleChange}
              htmlFor='ingredientName'
              label='Ingredient Name'
            />
            <TextInput
              type='number'
              className='validate'
              name='ingredientCost'
              value={ingredientCost}
              onChange={handleChange}
              htmlFor='ingredientCost'
              label='Ingredient Cost'
            />
            <TextInput
              type='number'
              className='validate'
              name='ingredientWeight'
              value={ingredientWeight}
              onChange={handleChange}
              htmlFor='ingredientWeight'
              label='Ingredient Weight'
            />

            <div className='modal-footer'>
              <Button
                type='submit'
                className={
                  ingredientCost <= 0 ||
                  ingredientName <= 0 ||
                  ingredientWeight <= 0
                    ? "btn disabled"
                    : "btn teal darken-2 z-depth-2 modal-close"
                }
                text='submit'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditIngredient;
