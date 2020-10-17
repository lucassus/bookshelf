import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { AppProviders } from "./AppProviders";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
