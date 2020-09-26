import React from "react";
import { Route, Routes } from "react-router-dom";

import { CurrentUserFragment } from "../components/AuthContext/CurrentUser.fragment.generated";
import { AuthorDetailsPage } from "./AuthorDetailsPage";
import { AuthorsPage } from "./AuthorsPage";
import { BookDetailsPage } from "./BookDetailsPage";
import { BooksPage } from "./BooksPage";
import { LoginPage } from "./LoginPage";
import { MyBooksPage } from "./MyBooksPage";
import { MyProfilePage } from "./MyProfilePage";
import { NotFoundPage } from "./NotFoundPage";
import { SignupPage } from "./SignupPage";
import { UserDetailsPage } from "./UserDetailsPage";
import { UsersPage } from "./UsersPage";

type Props = {
  currentUser?: CurrentUserFragment;
};

export const AppRoutes: React.FunctionComponent<Props> = ({ currentUser }) => (
  <Routes>
    <Route path="/" element={<BooksPage />} />
    <Route path="/page/:page*" element={<BooksPage />} />
    <Route path="/books/:id" element={<BookDetailsPage />} />
    <Route path="/authors" element={<AuthorsPage />} />
    <Route path="/authors/:id" element={<AuthorDetailsPage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/users/:id" element={<UserDetailsPage />} />

    {currentUser ? (
      <>
        <Route
          path="/my/profile"
          element={<MyProfilePage currentUser={currentUser} />}
        />

        <Route path="/my/books" element={<MyBooksPage />} />
      </>
    ) : (
      <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </>
    )}

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);