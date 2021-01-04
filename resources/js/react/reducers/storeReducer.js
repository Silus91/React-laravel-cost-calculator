export const storeReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_UI":
        return {
          ...state,
          loading: true,
        };
    case "STOP_LOADING_UI":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_INGREDIENTS":
      return { ...state, ingredients: action.payload };
    case "INGREDIENT_ADD":
      return {...state, ingredients: state.ingredients.concat(action.payload) };
    case "INGREDIENT_EDIT":
      return {
        ...state, ingredients: state.ingredients.map((ingredient) => {
        return ingredient.id === action.id
          ? (ingredient = action.payload)
          : ingredient
        })
      }
    case "INGREDIENT_DELETE":
        return{...state, ingredients: state.ingredients.filter((ingredient) => ingredient.id !== action.payload)};
    case "FETCH_PRODUCTS":
      return { ...state, products: action.payload };
    case "PRODUCT_ADD":
        return {...state, products: state.products.concat(action.payload) };
    case "PRODUCT_DELETE":
        return{...state, products: state.products.filter((product) => product.id !== action.payload)};

    default:
      return state;
  }
};
