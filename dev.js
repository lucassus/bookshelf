const concurrently = require("concurrently");

concurrently(
  [
    {
      command: "yarn codegen --watch",
      name: "codegen",
      prefixColor: "yellow"
    },
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
    killOthers: ["failure", "success"],
    restartTries: 3
  }
);
