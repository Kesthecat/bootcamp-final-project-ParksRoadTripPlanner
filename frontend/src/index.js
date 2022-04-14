import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import { FlagsProvider } from "./components/hooks/Flags";
import { GMAPProvider } from "./components/hooks/GMAPContext";
import { ParksListProvider } from "./components/hooks/ParksContext";
import { UserProvider } from "./components/hooks/userContext";

ReactDOM.render(
  <UserProvider>
    <FlagsProvider>
      <ParksListProvider>
        <GMAPProvider>
          <App />
        </GMAPProvider>
      </ParksListProvider>
    </FlagsProvider>
  </UserProvider>,
  document.getElementById("root")
);
