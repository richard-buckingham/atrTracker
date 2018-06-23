import { PizzaGuard } from "./pizzas.guard";
import { PizzaExistsGuards } from "./pizza-exists.guard";

export const guards: any[] = [PizzaGuard, PizzaExistsGuards];

export * from "./pizzas.guard";
export * from "./pizza-exists.guard";
