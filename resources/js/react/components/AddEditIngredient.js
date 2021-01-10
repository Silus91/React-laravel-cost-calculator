import React, { useState, useContext, useEffect } from "react";
import { INGREDIENT_ADD, INGREDIENT_EDIT } from "../types/types";
import M from "materialize-css";
import TextInput from "./TextInput";
import { StoreContext } from "../contexts/StoreContext";
import { Button } from "./Button";
import axios from 'axios';
import { loadingAction } from '../actions/loaderHelper';

const API_BASE_URL = process.env.MIX_API_BASE_URL;

const AddEditIngredient = ({id = 'id', ...props}) => {
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
      ingredientName: state.ingredientName,
      ingredientCost: parseFloat(state.ingredientCost),
      ingredientWeight: parseFloat(state.ingredientWeight),
      ingredientRatio: parseFloat(
        state.ingredientCost / state.ingredientWeight
      ),
    };
    if(props.ingredient){
      newIngredient.id = props.ingredient.id
    }
    return newIngredient;
  };

  function sendDataIngredient (newIngredient) {
    if (props.ingredient) {
      sendEditIngredient(newIngredient);
      } else {
        sendNewIngredient(newIngredient);
      }
  }

  const sendNewIngredient = (newIngredient) => {
    loadingAction(dispatch, async () => {
      const response = await axios.post(`${API_BASE_URL
      }/ingredient`, newIngredient);
      dispatch({ type: INGREDIENT_ADD, payload: response.data });
    })
  }

  const sendEditIngredient = (newIngredient) => {
      loadingAction(dispatch, async () => {
      const response = await axios.patch(`${API_BASE_URL
      }/ingredient/${newIngredient.id}`, newIngredient);
      dispatch({
        type: INGREDIENT_EDIT,
        payload: response.data,
        id: response.data.id,
      });
    })
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
        data-target={id}
      >
        {props.ingredient ? "Edit" : "Add New"}
      </a>
      <div id={id} className='modal'>
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
