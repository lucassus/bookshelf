import { ApolloProvider } from "@apollo/client";
import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { apolloClient } from "./apolloClient";
import { CurrentUserProvider } from "./components/CurrentUserProvider";

export const AppProviders: React.FunctionComponent = ({ children }) => (
  <Router>
    <CloudinaryContext cloudName="lucassus">
      <ApolloProvider client={apolloClient}>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </ApolloProvider>
    </CloudinaryContext>
  </Router>
);
