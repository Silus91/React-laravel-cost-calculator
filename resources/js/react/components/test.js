import React, { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import M from "materialize-css";
import Collapsible from "./Collapsible";
import ProductTable from "./ProductTable";

const ProductScale = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const { products } = useContext(ProductContext);

  return (
    <Collapsible title='test' icon='eject'>
      <div className='card-content'>
        {products.map((product) => {
          return (
            <ul key={product.id} className='collapsible popout'>
              <ProductTable product={product} />
            </ul>
          );
        })}
      </div>
    </Collapsible>
  );
};

export default ProductScale;
