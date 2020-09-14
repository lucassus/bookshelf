const concurrently = require("concurrently");

concurrently(
  [
    {
      command: "yarn workspace @bookshelf/server dev",
      name: "server",
      prefixColor: "red"
    },
    {
      command: "yarn workspace @bookshelf/web dev",
      name: "web",
      prefixColor: "green"
    }
  ],
  {
    killOthers: true,
    restartTries: 3
  }
);
