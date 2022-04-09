import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { ParksListProvider } from "./components/hooks/ParksContext";

ReactDOM.render(
  <ParksListProvider>
    <App />
  </ParksListProvider>,
  document.getElementById("root")
);
