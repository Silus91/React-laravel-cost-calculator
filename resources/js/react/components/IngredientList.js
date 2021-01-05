import React, { useEffect, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { INGREDIENT_DELETE } from "../types/types";
import M from "materialize-css";
import Collapsible from "./Collapsible";
import AddEditIngredient from "./AddEditIngredient";
import { loadingAction } from '../actions/loaderHelper';

const IngredientList = () => {

  const { store, dispatch } = useContext(StoreContext);
  const API_BASE_URL = process.env.API_BASE_URL;


  const deleteIngredient = (id) => {
    loadingAction(dispatch, async () => {
       await axios.delete(`${API_BASE_URL}/ingredient/${id}`);
      return dispatch({
        type: INGREDIENT_DELETE,
        payload: id,
      });
    })
  };

  useEffect(() => {
      M.AutoInit();
  }, []);

  const tableTitle = ["Name", "Weight", "Price", "Actions"];
  return (
    <Collapsible title='Ingredien List' icon='list'>
      <div className='card-content'>
        <AddEditIngredient  />
        <table className='striped'>
          <thead>
            <tr>
              {tableTitle.map((title) => {
                return <td key={title}>{title}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {store.ingredients ? store.ingredients.map((ingredient) => {
              return (
                  <tr key={ingredient.id}>
                      <td> {ingredient.ingredientName}</td>
                      <td>{ingredient.ingredientWeight}</td>
                      <td>{ingredient.ingredientCost}</td>
                      <td>
                        <button
                            className='btn red darken-1'
                            onClick={() => deleteIngredient(ingredient.id)}
                        >
                            Delete
                        </button>
                          <AddEditIngredient
                            id={ingredient.id}
                            ingredient={ingredient}
                          />
                      </td>
                  </tr>
              );
            })
           : <tr><td>loading</td></tr>}</tbody>
        </table>
      </div>
    </Collapsible>
  );
};

export default IngredientList;
