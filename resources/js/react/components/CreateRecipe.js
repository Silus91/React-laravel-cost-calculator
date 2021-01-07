import React, { useState, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import TextInput from "./TextInput";
import AddComponent from "./AddComponent";
import ComponentList from "./ComponentList";
import Collapsible from "./Collapsible";
import { PRODUCT_ADD } from "../types/types";
import { Button } from "./Button";
import axios from 'axios';
import { loadingAction } from '../actions/loaderHelper';

const CreateRecipe = () => {
 
  const [state, setState] = useState({
    productName: "",
    components: [],
    firstRatio: "",
  });

  const { store,dispatch } = useContext(StoreContext);
  const API_BASE_URL = process.env.MIX_API_BASE_URL;


  const mapData = (newComponent) => {
    if (state.components.length <= 0) {
      setState({
        ...state,
        firstRatio: (state.firstRatio = newComponent.componentWeight),
      });
      newComponent.productRatio = state.firstRatio;
    } else {
      newComponent.productRatio =
        newComponent.componentWeight / state.firstRatio;
    }
  };

  const addComponentToList = (newComponent) => {
    mapData(newComponent);
    setState({
      ...state,
      components: state.components.concat(newComponent),
    });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const sendNewProduct = async (newProduct) => {
    loadingAction(dispatch, async () => {
      const response = await axios.post(`${API_BASE_URL}/product`, newProduct);
      dispatch({ type: PRODUCT_ADD, payload: response.data });
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      productName: state.productName,
      components: state.components,
    };
    sendNewProduct(newProduct);
    setState({
      ...state,
      productName: "",
      components: [],
      firstRatio: "",
    });
  };

  return (
    <Collapsible icon='add_circle' title='Create Reciple'>
      <AddComponent
        addComponentToList={addComponentToList}
        ingredients={store.ingredients}
      />
      <div className='divider'></div>
      <div>
        <ComponentList components={state.components} />
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          name='productName'
          className='validate'
          value={state.productName}
          onChange={handleChange}
          htmlFor='productName'
          label='Product Name'
        />
        <Button
          type='submit'
          className={
            state.productName <= 0
              ? "btn disabled"
              : "btn teal darken-2 z-depth-2"
          }
          text='Submit'
        />
      </form>
    </Collapsible>
  );
};

export default CreateRecipe;
