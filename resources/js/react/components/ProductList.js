import React, { useEffect, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import M from "materialize-css";
import Collapsible from "./Collapsible";
import { PRODUCT_DELETE } from "../types/types";
import { loadingAction } from '../actions/loaderHelper';

const ProductList = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const deleteProduct = async (id) => {
    loadingAction(dispatch, async () => {
       await axios.delete(`${API_BASE_URL}/product/${id}`);
      return dispatch({
        type: PRODUCT_DELETE,
        payload: id,
      });
    })
  };
  
  const { store, dispatch } = useContext(StoreContext);
  const API_BASE_URL = process.env.API_BASE_URL;


  return (
    <Collapsible title='Product List' icon='list'>
      <div className='card-content'>
        <ul className='collapsible popout'>
          {store.products.map((product) => {
            return (
              <li key={product.id}>
                <div className='collapsible-header'>
                  <p>{product.productName}</p>
                </div>
                <div className='collapsible-body'>
                  <div className=''>
                    <h3>{product.productName}</h3>
                    <button
                      onClick={() => deleteProduct(product.id)}
                    >
                      <i className='material-icons'>delete_forever</i>
                    </button>
                    <table className='striped'>
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Weight</td>
                          <td>Cost</td>
                        </tr>
                      </thead>
                      <tbody>
                        {product.components.map((component) => {
                          return (
                            <tr key={component.id}>
                              <td>{component.ingredientName}</td>
                              <td>{component.componentWeight}</td>
                              <td>{component.componentCost}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Collapsible>
  );
};

export default ProductList;
