import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";

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

//ROUTER
app.get("*", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Video Player</title>
        <link href="assets/app.css" type="text/css" rel="stylesheet">
      </head>
      <body>
        <div id="app"></div>
        <script src="assets/app.js" type="text/javascript"> </script> 
      </body>
    </html>
  `);
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server ${ENV} running on port ${PORT}`);
});
