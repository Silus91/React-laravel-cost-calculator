import React, { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import Collapsible from "./Collapsible/Collapsible";
import { PRODUCT_DELETE } from "../types/types";
import { loadingAction } from '../actions/loaderHelper';
import './list.css';

const ProductList = () => {
  const API_BASE_URL = process.env.MIX_API_BASE_URL;

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

  return (
    <Collapsible title='Product List' icon='list' bodyClassName='bodyPadding' headClassName='colla-header'>
      <div className='card-content'>
        <ul className='collapsible'>
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
                      className='btn red darken-1'
                      onClick={() => deleteProduct(product.id)}
                    >
                        Delete
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
