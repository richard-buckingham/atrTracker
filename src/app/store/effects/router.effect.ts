import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Effect, Actions } from "@ngrx/effects";
import * as RouterActions from "../actions/router.action";

import { tap, map } from "rxjs/operators";

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      console.log(`ROUTER EFFECT: Action = ${RouterActions.GO}`);
      console.log(`ROUTER EFFECT: path = ${path}`);
      console.log(`ROUTER EFFECT: queryParams = ${queryParams}`);
      console.log(`ROUTER EFFECT: extras = ${extras}`);
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
