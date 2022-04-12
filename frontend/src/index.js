import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { GMAPProvider } from "./components/hooks/GMAPContext";
import { ParksListProvider } from "./components/hooks/ParksContext";

ReactDOM.render(
  <ParksListProvider>
    <GMAPProvider>
      <App />
    </GMAPProvider>
  </ParksListProvider>,
  document.getElementById("root")
);
