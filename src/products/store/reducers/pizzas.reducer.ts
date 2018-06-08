import * as fromPizzas from "../actions/pizzas.action";
import { Pizza } from "../../models/pizza.model";

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.log("action.type = ", action.type);
      console.log(
        "we need to use a side effect to load the data, then dispatch the LOAD_PIZZAS_SUCCESS action"
      );
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      console.log("action.type = ", action.type);
      console.log("action.payload = ", action.payload);
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data: data
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

  console.log("returning the initial state...");
  return state;
}

// export some functions that we can compose with our selectors
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
