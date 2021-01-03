import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import M from "materialize-css";
import TextInput from "./TextInput";
import AddComponent from "./AddComponent";
import ComponentList from "./ComponentList";
import Collapsible from "./Collapsible";
import { v1 as uuidv1 } from "uuid";
import { PRODUCT_ADD, STOP_LOADING_UI, LOADING_UI } from "../types/types";
import { Button } from "./Button";
import axios from 'axios';


const CreateRecipe = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const [state, setState] = useState({
    productName: "",
    components: [],
    firstRatio: "",
  });

  const { store,dispatch } = useContext(StoreContext);

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

  const BASE_URL = "http://localhost:8000/api"


  async function sendNewProduct (newProduct) {
    console.log("jestesmy")
    dispatch({ type: LOADING_UI});
    const response = await  axios.post(`${BASE_URL}/product`, newProduct).then((result)=> {
      console.log("jestesmy w result", result)

      return result;
    })
    dispatch({ type: PRODUCT_ADD, payload: response.data });
    dispatch({ type: STOP_LOADING_UI});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      productName: state.productName,
      components: state.components,
    };

    console.log("newproduct", newProduct);

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
