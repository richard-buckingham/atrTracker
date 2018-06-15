import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap } from "rxjs/operators";

import * as toppingsActions from "../actions/toppings.actions";
import * as fromServices from "../../services/toppings.service";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      console.log(
        `3 - load toppings - the toppings effect has caught the ${
          toppingsActions.LOAD_TOPPINGS
        } action`
      );
      return this.toppingsService.getToppings().pipe(
        map(toppings => {
          console.log(
            `5 - load toppings - in toppings.effect. toppings =`,
            toppings
          );
          console.log(
            `6 - load toppings - in toppings.effect. dispatching ${
              toppingsActions.LoadToppingsSuccess
            } action, with toppings payload`
          );
          return new toppingsActions.LoadToppingsSuccess(toppings);
        }),
        catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
      );
    })
  );
}
