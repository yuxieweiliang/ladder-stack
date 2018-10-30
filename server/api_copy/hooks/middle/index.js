module.exports = function(sails) {
  /* global __dirname */
  const modelsMap = new Map();
  const glob = require('glob');
  const path = require('path');

  let maps = glob.sync(path.normalize(path.resolve(__dirname, './maps/*.js')));

  for (let [index, value] of maps.entries()) {

    let { name } = path.parse(value);
    modelsMap.set(name, require(value));
  }

  return {
    getModelsMap: function() {
      return modelsMap;
    }
  };
};