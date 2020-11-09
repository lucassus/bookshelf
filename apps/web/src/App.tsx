import React from "react";
import "./App.scss";

import { AppTopBar } from "./components/AppTopBar";
import { useCurrentUser } from "./components/CurrentUserProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppRoutes } from "./pages/AppRoutes";

export const App: React.FunctionComponent = () => {
  const currentUser = useCurrentUser();

  return (
    <ErrorBoundary>
      <AppTopBar />

      <main>
        <AppRoutes currentUser={currentUser} />
      </main>

      <div id="bookshelf-portal" />
    </ErrorBoundary>
  );
};
