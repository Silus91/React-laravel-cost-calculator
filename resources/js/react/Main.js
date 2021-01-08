import React from "react";
import "./App.css";
import CreateRecipe from "./components/CreateRecipe";
import IngredientList from "./components/IngredientList";
import ProductList from "./components/ProductList";
import ProductScale from "./components/ProductScale";
import StoreContextProvider from "./contexts/StoreContext";
import Loader from "./components/Loader/Loader";

function Main() {

  return (
    <div className='container mainApp'>
      <StoreContextProvider>
        <Loader />
        <IngredientList />
        <CreateRecipe />
        <ProductList />
        <ProductScale />
      </StoreContextProvider>
    </div>
  );
}

export default Main;
