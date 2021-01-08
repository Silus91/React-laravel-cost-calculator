import React, { useReducer, createContext, useEffect } from "react";
import { storeReducer } from "../reducers/storeReducer";
import { FETCH_INGREDIENTS, FETCH_PRODUCTS } from '../types/types';
import { loadingAction } from '../actions/loaderHelper';

const INITAL_STATE ={products:[],ingredients:[],loading:false};

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

  const [store, dispatch] = useReducer(storeReducer, INITAL_STATE);
  const API_BASE_URL = process.env.MIX_API_BASE_URL;

  const fetchInitialValue = () => {
    loadingAction(dispatch, async () => {
        const ingredientResponse = await axios.get(`${API_BASE_URL}/ingredients`);
        console.log(ingredientResponse)
        dispatch({
            type: FETCH_INGREDIENTS,
            payload:ingredientResponse.data
        })
        const productResponse = await axios.get(`${API_BASE_URL}/products`);
          dispatch({
            type: FETCH_PRODUCTS,
            payload:productResponse.data
        })
    })
  }  

  useEffect(() => {
    if (!store.ingredients.length > 0 || !store.products.length > 0) {
      fetchInitialValue();
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
