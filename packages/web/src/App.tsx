import {Box, Typography} from "@material-ui/core";
import React from "react";

import { AuthorsPage } from "./pages/AuthorsPage";

export const App: React.FunctionComponent = () => (
  <Box display="flex" flexDirection="column">
    <Typography component="h1">Personal Library</Typography>
    <AuthorsPage />
  </Box>
);
