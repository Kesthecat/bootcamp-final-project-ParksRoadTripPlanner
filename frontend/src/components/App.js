import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomePage } from "./HomePage";
import { MainMap } from "./map/MainMap";
import { ParksList } from "./parks/ParksList";
import { ErrorPage } from "./Error";
import { Park } from "./parks/Park";
import { Header } from "./Header";
import { TripsSuggestions } from "./trips/TripsSuggestions";
import { User } from "./user/User";
import { InternalError } from "./InternalError";
import { Trip } from "./trips/Trip";
import { GMAPProvider } from "./hooks/GMAPContext";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/mainMap">
          <GMAPProvider>
            <MainMap />
          </GMAPProvider>
        </Route>
        <Route exact path="/tripsSuggestions">
          <TripsSuggestions />
        </Route>
        <Route exact path="/parks">
          <ParksList />
        </Route>
        <Route exact path="/trip/:id">
          <GMAPProvider>
            <Trip />
          </GMAPProvider>
        </Route>
        <Route exact path="/parks/:id">
          <Park />
        </Route>
        <Route exact path="/user/:id">
          <User />
        </Route>
        <Route path="/Error">
          <ErrorPage />
        </Route>
        <Route path="">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
