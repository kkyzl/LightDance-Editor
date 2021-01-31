/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable global-require */
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "prod") {
  const webpack = require("webpack");
  const { merge } = require("webpack-merge");
  const commonConfig = require("../../config/webpack.common.js");
  const envConfig = require("../../config/webpack.dev.js");
  const webpackConfig = merge(commonConfig, envConfig);
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: false,
      path: "/__hmr",
      heartbeat: 2000,
    })
  );
} else {
  const buildPath = path.resolve(__dirname, "..", "..", "./build");
  app.use(express.static(buildPath));
}

const assetPath = path.resolve(__dirname, "..", "..", "./asset");
app.use("/asset", express.static(assetPath));

const port = 8082;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});