import "./App.scss";

import React from "react";
import { Route, Routes } from "react-router-dom";

import { AppTopBar } from "./components/AppTopBar";
import { useAuth } from "./components/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MyBooksPage } from "./pages/MyBooksPage";
import { AuthorDetailsPage } from "./pages/AuthorDetailsPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { BooksPage } from "./pages/BooksPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignupPage } from "./pages/SignupPage";
import { UserDetailsPage } from "./pages/UserDetailsPage";
import { UsersPage } from "./pages/UsersPage";

export const App: React.FunctionComponent = () => {
  const { currentUser } = useAuth();

  return (
    <ErrorBoundary>
      <AppTopBar />

      <main>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/page/:page*" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:id" element={<AuthorDetailsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {currentUser && (
            <>
              <Route
                path="/my/profile"
                element={<ProfilePage currentUser={currentUser} />}
              />
              <Route
                path="/my/books"
                element={<MyBooksPage currentUser={currentUser} />}
              />
            </>
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <div id="bookshelf-portal" />
    </ErrorBoundary>
  );
};
