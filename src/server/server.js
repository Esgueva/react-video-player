import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { renderRoutes } from "react-router-config";

import Layout from "../frontend/components/Layout";
import reducer from "../frontend/reducers";
import serverRoutes from "../frontend/routes/serverRoutes";
import initialState from "../frontend/initialState";

//ENV
dotenv.config();
const { ENV, PORT } = process.env;

//EXPRESS
const app = express();

// DEV MODE
if (ENV === "development") {
  console.log("Development config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

// RESPONSE
const setResponse = (html) => {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Video Player</title>
          <link href="assets/app.css" type="text/css" rel="stylesheet">
        </head>
        <body>
          <div id="app">${html}</div>
          <script src="assets/app.js" type="text/javascript"> </script> 
        </body>
      </html>
  `;
};

//RENDER
const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} contest={{}}>
        <Layout>{renderRoutes(serverRoutes)}</Layout>∫
      </StaticRouter>
    </Provider>
  );
  res.send(setResponse(html));
};

//ROUTER
app.get("*", renderApp);

//SERVER
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server ${ENV} running on port ${PORT}`);
});
