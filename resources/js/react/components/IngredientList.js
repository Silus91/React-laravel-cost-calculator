import React, { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { INGREDIENT_DELETE } from "../types/types";
import Collapsible from "./Collapsible/Collapsible";
import AddEditIngredient from "./AddEditIngredient";
import { loadingAction } from '../actions/loaderHelper';
import DeleteModal from "./DeleteModal";

const IngredientList = () => {

  const { store, dispatch } = useContext(StoreContext);
  const API_BASE_URL = process.env.MIX_API_BASE_URL;

  const deleteIngredient = (id) => {
    loadingAction(dispatch, async () => {
       await axios.delete(`${API_BASE_URL}/ingredient/${id}`);
      return dispatch({
        type: INGREDIENT_DELETE,
        payload: id,
      });
    })
  };

  const tableTitle = ["Name", "Weight", "Price", "Actions"];
  return (
    <Collapsible title='Ingredien List' icon='list' bodyClassName='collapsible-body' headClassName='colla-header'>
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
                    <AddEditIngredient
                      id={ingredient.id}
                      ingredient={ingredient}
                    />
                    <DeleteModal
                      content='Ingredient'
                      onClick={()=> deleteIngredient(ingredient.id)}
                      name={ingredient.ingredientName}
                    />
                  </td>
                </tr>
                );
              })
            : <tr><td>loading</td></tr>}
          </tbody>
        </table>
      </div>
    </Collapsible>
  );
};

export default IngredientList;
