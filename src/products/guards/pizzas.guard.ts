import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";

@Injectable()
export class PizzaGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {
    console.log("IN PizzaGuard");
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      // catch any errors
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      // note: tap is not part of the observable stream
      tap((loaded: boolean) => {
        console.log("@@@ loaded = ", loaded);
        // if the pizzas have not been loaded, fire off an action to load them
        if (!loaded) {
          console.log(
            "@@@ dispatching fromStore.LoadPizzas() to load the pizzas"
          );
          this.store.dispatch(new fromStore.LoadPizzas());
        }
        return;
      }),
      // wait for loaded to become true
      // tap will take the loaded property from the filter,
      // and will then call Observable.complete,
      // and wil unsubscribe automatically for us.
      tap((loaded: boolean) => {
        console.log("@@@ loaded is now true...");
        return loaded;
      })
    );
  }
}
