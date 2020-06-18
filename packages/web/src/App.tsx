import React from "react";
// @ts-ignore
import { Route, Routes } from "react-router-dom";

import { AppTopBar } from "./components/AppTopBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthorDetailsPage } from "./pages/AuthorDetailsPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { BooksPage } from "./pages/BooksPage";
import { UserDetailsPage } from "./pages/UserDetailsPage";
import { UsersPage } from "./pages/UsersPage";

export const App: React.FunctionComponent = () => (
  <ErrorBoundary>
    <AppTopBar />

    <Routes>
      <Route path="/" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/authors/:id" element={<AuthorDetailsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
    </Routes>
  </ErrorBoundary>
);
