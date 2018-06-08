import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

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
      return this.pizzasService.getPizzas().pipe(
        map(pizzas => {
          console.log("in pizza.effect. pizzas = ", pizzas);
          return new pizzaActions.LoadPizzasSuccess(pizzas);
        }),
        catchError(error => {
          console.log("in pizza.effect. error = ", error);
          return of(new pizzaActions.LoadPizzasFail(error));
        })
      );
    })
  );
}
