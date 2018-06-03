// contains all the reducers for the Products module

import { ActionReducerMap } from "@ngrx/store";

import * as fromPizzas from "./pizzas.reducer";

// define the structure of the Product state tree
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};
