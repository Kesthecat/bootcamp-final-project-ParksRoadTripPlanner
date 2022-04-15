import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { FlagsProvider } from "./components/hooks/Flags";
import { ParksListProvider } from "./components/hooks/ParksContext";
import { UserProvider } from "./components/hooks/userContext";

ReactDOM.render(
  <UserProvider>
    <FlagsProvider>
      <ParksListProvider>
        <App />
      </ParksListProvider>
    </FlagsProvider>
  </UserProvider>,
  document.getElementById("root")
);
