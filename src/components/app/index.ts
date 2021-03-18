import { pipe } from "ramda";
import { AppPresenter } from "./app-presenter";
import { AppView } from "./app-view";

export const App = pipe(AppPresenter, AppView);
