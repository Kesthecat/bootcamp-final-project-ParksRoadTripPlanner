import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./HomePage";

import { Map } from "./map/Map";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <HomePage />
        </Route>
        <Route exact path="/mainMap">
          <Map />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
