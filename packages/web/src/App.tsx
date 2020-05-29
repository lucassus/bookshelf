import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";

import { AppTopBar } from "./components/AppTopBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthorDetailsPage } from "./pages/AuthorDetailsPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { BooksPage } from "./pages/BooksPage";
import { UsersPage } from "./pages/UsersPage";

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <ErrorBoundary>
      <AppTopBar />

      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:id" element={<AuthorDetailsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Container>
    </ErrorBoundary>
  </>
);
