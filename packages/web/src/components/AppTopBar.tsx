import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const AppTopBar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="h1" style={{ flexGrow: 1 }}>
        Personal Library
      </Typography>

      <Box>
        <Button color="inherit" component={RouterLink} to="/">
          Books
        </Button>
        <Button color="inherit" component={RouterLink} to="/authors">
          Authors
        </Button>
        <Button color="inherit" component={RouterLink} to="/users">
          Users
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);
