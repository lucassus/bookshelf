import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { AuthorsPage } from "./pages/AuthorsPage";
import { UsersPage } from "./pages/UsersPage";
import { BooksPage } from "./pages/BooksPage";
import { AppTopBar } from "./components/AppTopBar";

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <AppTopBar />

    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Container>
  </>
);
