// setup the structure of the router state
import { Params } from "@angular/router";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromRouter from "@ngrx/router-store";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

// create a selector so we can ask for this piece of state
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>("routerReducer");
