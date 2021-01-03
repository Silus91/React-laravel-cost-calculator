import React, { useReducer, createContext, useEffect } from "react";
import { storeReducer } from "../reducers/storeReducer";
import ingredients from "./ingredients";
import products from "./products";
import {FETCH_INGREDIENTS, FETCH_PRODUCTS, LOADING_UI, STOP_LOADING_UI} from '../types/types';

const INITAL_STATE ={products:[],ingredients:[],loading:Boolean};

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [store, dispatch] = useReducer(storeReducer, INITAL_STATE);

     const BASE_URL = "http://localhost:8000/api"



     function setProductValues ()   {
       console.log("product values store func")
      dispatch({ type: LOADING_UI});
      axios.get(`${BASE_URL}/products`).then((response) =>
       dispatch({
          type: FETCH_PRODUCTS,
          payload:response.data
      }))
      .then(() => { 
      dispatch({type: STOP_LOADING_UI})

      return response
      })
      .catch((err) => console.error(err))
      }     

    function setValues () {
        dispatch({ type: LOADING_UI});
        axios.get(`${BASE_URL}/ingredients`).then((response) =>
         dispatch({
            type: FETCH_INGREDIENTS,
            payload:response.data
        }))
        .then(() => { 
        dispatch({type: STOP_LOADING_UI})

        return response
        })
        .catch((err) => console.log(err))
    }

      useEffect(() => {
        M.AutoInit();
        if (!store.ingredients.length > 0 || !store.products.length > 0) {
            setValues();
            setProductValues();

          }
      }, []);


console.log("store w context", store);
  return (
    <StoreContext.Provider
      value={{
        store,
        dispatch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
