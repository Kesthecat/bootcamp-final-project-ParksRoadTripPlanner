import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
import { MainMap } from "./map/MainMap";
// import { AppMap } from "./map/Map2";
import { ParksList } from "./parks/ParksList";
import { ErrorPage } from "./Error";
import { Park } from "./parks/Park";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <HomePage />
        </Route>
        <Route exact path="/mainMap">
          <MainMap />
          {/* <AppMap /> */}
        </Route>
        <Route exact path="/parks">
          <ParksList />
        </Route>
        <Route exact path="/parks/:id">
          <Park />
        </Route>
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
