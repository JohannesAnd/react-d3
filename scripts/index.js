const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "./data.svg"), "utf-8");

const getDataFromSvg = require("./getDataFromSvg");

console.log(JSON.stringify(getDataFromSvg(data), null, 2));
