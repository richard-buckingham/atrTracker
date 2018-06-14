import * as fromPizzas from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  //console.log("action.type = ", action.type);
  //console.log("action.payload = ", action.payload);
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.log("2 - loading - pizza reducer is setting loading = true");
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...entities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities: entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      console.log("case = ", action.type);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  //console.log("returning the initial state...");
  return state;
}

// called by the reducer above to reduce a pizza array to a dictionary object
function reducePizzaArrayToEntity(
  entities: { [id: number]: Pizza },
  pizza: Pizza
): { [id: number]: Pizza } {
  return {
    ...entities,
    [pizza.id]: pizza
  };
}

// export some functions that we can compose with our selectors
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
