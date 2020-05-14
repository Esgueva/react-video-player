//IGNORE STYLES FROM NODE
require("ignore-styles");

//BABEL
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

//RENDER IMG FROM NODE
require("asset-require-hook")({
  extensions: ["jpg", "png", "gif"],
  name: "/assets/[hash].[ext]",
});

require("./server");
