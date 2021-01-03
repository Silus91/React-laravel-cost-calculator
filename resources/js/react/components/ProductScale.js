import React, { useEffect, useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import M from "materialize-css";
import Collapsible from "./Collapsible";
import ProductTable from "./ProductTable";

const ProductScale = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

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
