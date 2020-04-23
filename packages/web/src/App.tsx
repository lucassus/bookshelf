import { Typography, Container, CssBaseline } from "@material-ui/core";
import React from "react";

import { AuthorsPage } from "./pages/AuthorsPage";

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Typography component="h1" variant="h3">
        Personal Library
      </Typography>
      <AuthorsPage />
    </Container>
  </>
);
