import React, {useContext } from 'react';
import { INGREDIENT_ADD, INGREDIENT_EDIT, STOP_LOADING_UI, LOADING_UI } from "../types/types";
import { StoreContext } from "../contexts/StoreContext";

//work around how to mke it possible to be connected
   export async function sendAddDataIngredient (newIngredient) {
        const { dispatch } = useContext(StoreContext);
    dispatch({ type: LOADING_UI});
    const response = await  axios.post(`${API_BASE_URL}/ingredient`, newIngredient).then((result)=> {
      return result;
    })
    dispatch({ type: INGREDIENT_ADD, payload: response.data });
    dispatch({ type: STOP_LOADING_UI});
}

export async function sendEditDataIngredient (newIngredient) {
    console.log("send edit action")
    const { dispatch } = useContext(StoreContext);

    dispatch({ type: LOADING_UI});
    console.log("send edit action after loader")

    const response = await  axios.patch(`${API_BASE_URL}/ingredient/${newIngredient.id}`, newIngredient).then(function(result) {
    return result;
    });
    dispatch({
    type: INGREDIENT_EDIT,
    payload: response.data,
    id: response.data.id,
    });
    dispatch({ type: STOP_LOADING_UI});
}