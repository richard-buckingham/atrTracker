import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";

import { Topping } from "../../models/topping.model";

// pizza state
export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

// toppings selectors
export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingEntities
);
export const getAllToppings = createSelector(getToppingsEntities, entities => {
  //console.log("in the getAllPizzas selector...");
  //console.log("entities = ", entities);
  //console.log("Object.keys(entities) = ", Object.keys(entities));
  /*   console.log(
    "Object.keys(entities).map(id => entities[parseInt(id, 10)]) = ",
    Object.keys(entities).map(id => entities[parseInt(id, 10)])
  ); */
  const toppings: Topping[] = Object.keys(entities).map(
    id => entities[parseInt(id, 10)]
  );
  console.log(
    "7 - load toppings - in getAllToppings selector, toppings = ",
    toppings
  );
  return toppings;
});

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);
