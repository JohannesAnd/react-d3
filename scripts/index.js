const getDataFromSvg = require('./getDataFromSvg');
const data = require('./data');

console.log(JSON.stringify(getDataFromSvg(data), null, 2));
