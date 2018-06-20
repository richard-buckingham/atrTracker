import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import * as fromRoot from "../../../app/store";
import * as pizzaActions from "../actions/pizzas.action";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { PizzasService } from "../../services/pizzas.service";

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzasService: PizzasService
  ) {}

  // we want to listen to an action of the type
  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      console.log(
        "3 - loading - the pizza effect has caught the load pizzas action"
      );
      return this.pizzasService.getPizzas().pipe(
        map(pizzas => {
          console.log(`5 - loading - in pizza.effect. pizzas =`, pizzas);
          console.log(
            `6 - loading - in pizza.effect. dispatching loadPizzaSuccess action, with pizza payload`
          );
          return new pizzaActions.LoadPizzasSuccess(pizzas);
        }),
        catchError(error => {
          console.log("in pizza.effect. error = ", error);
          return of(new pizzaActions.LoadPizzasFail(error));
        })
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZAS).pipe(
    map((action: pizzaActions.CreatePizza) => {
      console.log(
        `Create Pizza::: In the createPizza effect. pizza =`,
        action.payload
      );
      return action.payload;
    }),
    switchMap(pizza => {
      return this.pizzasService.createPizza(pizza).pipe(
        map(pizza => {
          console.log(
            `Create Pizza::: In the createPizza effect. Return CreatePizzaSuccess action. pizza =`,
            pizza
          );
          return new pizzaActions.CreatePizzaSuccess(pizza);
        }),
        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZAS_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => {
        console.log(
          `Create Pizza::: In the createPizza effect. In routing effect. action.payload =`,
          action.payload
        );
        return action.payload;
      }),
      map(pizza => {
        console.log(
          `Create Pizza::: In the createPizza effect. In routing effect. pizza =`,
          pizza
        );
        return new fromRoot.Go({
          path: ["/products", pizza.id]
        });
      })
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => {
      console.log(
        `Update Pizza::: In the updatePizza effect. pizza =`,
        action.payload
      );
      return action.payload;
    }),
    switchMap(pizza => {
      return this.pizzasService.updatePizza(pizza).pipe(
        map(pizza => {
          console.log(
            `Update Pizza::: In the updatePizza effect. Return UpdatePizzaSuccess action. pizza =`,
            pizza
          );
          return new pizzaActions.UpdatePizzaSuccess(pizza);
        }),
        catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => {
      console.log(
        `Remove Pizza::: In the removePizza effect. pizza =`,
        action.payload
      );
      return action.payload;
    }),
    switchMap(pizza => {
      return this.pizzasService.removePizza(pizza).pipe(
        map(() => {
          console.log(
            `Remove Pizza::: In the removePizza effect. Return RemovePizzaSuccess action. pizza =`,
            pizza
          );
          return new pizzaActions.RemovePizzaSuccess(pizza);
        }),
        catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map(pizza => {
        console.log(
          `Update or Remove Pizza::: In the handlePizzaSuccess$ effect. In routing effect. pizza =`,
          pizza
        );
        return new fromRoot.Go({
          path: ["/products"]
        });
      })
    );
}
