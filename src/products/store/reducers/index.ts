// contains all the reducers for the Products module

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

import * as fromPizzas from "./pizzas.reducer";

// define the structure of the Product state tree
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

// create selectors
// create a base reference to the products property in our state
export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);

// pizza state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

// get all of the pizzas\
export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  console.log("in the getAllPizzas selector...");
  console.log("entities = ", entities);
  console.log("Object.keys(entities) = ", Object.keys(entities));
  console.log(
    "Object.keys(entities).map(id => entities[parseInt(id, 10)]) = ",
    Object.keys(entities).map(id => entities[parseInt(id, 10)])
  );

  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
