import React, { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import Collapsible from "./Collapsible/Collapsible";
import ProductTable from "./ProductTable";
import './list.css';

const ProductScale = () => {

  const { store } = useContext(StoreContext);
  useEffect(() => {
  }, [store.products])

  return (
    <Collapsible title='Product Scale' icon='eject' bodyClassName='bodyPadding' headClassName='colla-header'>
      <div className='card-content'>
        <ul className='collapsible'>
          {store.products.map((product) => {
            return <ProductTable key={product.id} product={product} />;
          })}
        </ul>
      </div>
    </Collapsible>
  );
};

export default ProductScale;
