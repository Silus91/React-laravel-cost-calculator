import React, { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import Collapsible from "./Collapsible";
import ProductTable from "./ProductTable";

const ProductScale = () => {

  const { store } = useContext(StoreContext);

  return (
    <Collapsible title='Product Scale' icon='eject'>
      <div className='card-content'>
        <ul className='collapsible popout'>
          {store.products.map((product) => {
            return <ProductTable key={product.id} product={product} />;
          })}
        </ul>
      </div>
    </Collapsible>
  );
};

export default ProductScale;
