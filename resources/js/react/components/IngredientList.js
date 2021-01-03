import React, { useEffect, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { INGREDIENT_DELETE } from "../types/types";
import M from "materialize-css";
import Collapsible from "./Collapsible";
import AddEditIngredient from "./AddEditIngredient";

const IngredientList = () => {

  const { store, dispatch } = useContext(StoreContext);

  const deleteIngredient = (id) => {
    const BASE_URL = "http://localhost:8000/api"

    axios.delete(`${BASE_URL}/ingredient/${id}`).then(function(result) {
      console.log("delete ingredient", result);
      return new Promise(function(resolve, reject) {
        return resolve;
      })
  })
    return dispatch({
      type: INGREDIENT_DELETE,
      payload: id,
    });
  };

  useEffect(() => {
      M.AutoInit();
  }, []);

  const tableTitle = ["Name", "Weight", "Price", "Actions"];
  return (
    <Collapsible title='Ingredien List' icon='list'>
      <div className='card-content'>
        <AddEditIngredient id='#id' />
        <table className='striped'>
          <thead>
            <tr>
              {tableTitle.map((title) => {
                return <td key={title}>{title}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {console.log("store w ing list",store.ingredients)}
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
                        {/* todo sprawdzic czemu za drugim editem nie pokazuje daty */}
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
