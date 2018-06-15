// contains all the reducers for the Products module
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromPizzas from "./pizzas.reducer";
import * as fromToppings from "./toppings.reducer";

// define the structure of the Product state tree
// and define the reducers that act on that state.
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

// create selectors
// create a base reference to the products property in our state
export const getProductsState = createFeatureSelector<ProductsState>(
  "products"
);
