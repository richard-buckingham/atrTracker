// contains all the reducers for the Products module
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

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
