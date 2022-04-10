import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
// import { Map } from "./map/Map";
// import { AppMap } from "./map/Map2";
import { ParksList } from "./parks/parksList";
import { ErrorPage } from "./error";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <HomePage />
        </Route>
        <Route exact path="/mainMap">
          {/* <Map /> */}
          {/* <AppMap /> */}
        </Route>
        <Route exact path="/parks">
          <ParksList />
        </Route>
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
