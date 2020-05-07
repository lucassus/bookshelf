module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "@material-ui/core",
        libraryDirectory: "",
        camel2DashComponentName: false
      },
      "core"
    ],
    [
      "import",
      {
        libraryName: "@material-ui/icons",
        libraryDirectory: "",
        camel2DashComponentName: false
      },
      "icons"
    ]
  ]
};
