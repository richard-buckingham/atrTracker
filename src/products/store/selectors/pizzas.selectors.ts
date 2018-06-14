import { createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";

import { Pizza } from "../../models/pizza.model";

// pizza state
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// get all of the pizzas\
export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  //console.log("in the getAllPizzas selector...");
  //console.log("entities = ", entities);
  //console.log("Object.keys(entities) = ", Object.keys(entities));
  /*   console.log(
    "Object.keys(entities).map(id => entities[parseInt(id, 10)]) = ",
    Object.keys(entities).map(id => entities[parseInt(id, 10)])
  ); */
  const pizzas: Pizza[] = Object.keys(entities).map(
    id => entities[parseInt(id, 10)]
  );
  console.log("7 - loading - in getAllPizzas selector, pizzas = ", pizzas);
  return pizzas;
});

// get the selected pizza
export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    console.log("*********************** in getSelectedPizza selector");
    console.log("entities = ", entities);
    console.log("router = ", router);
    console.log("router.state.params = ", router.state.params);
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
