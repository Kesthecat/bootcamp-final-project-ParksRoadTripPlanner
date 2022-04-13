import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { GMAPProvider } from "./components/hooks/GMAPContext";
import { ParksListProvider } from "./components/hooks/ParksContext";
import { UserProvider } from "./components/hooks/userContext";

ReactDOM.render(
  <UserProvider>
    <ParksListProvider>
      <GMAPProvider>
        <App />
      </GMAPProvider>
    </ParksListProvider>
  </UserProvider>,
  document.getElementById("root")
);
