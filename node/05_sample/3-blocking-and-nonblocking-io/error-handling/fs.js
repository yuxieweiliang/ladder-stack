
var fs = require('fs');

fs.readFile('/file/does/not/exist', function (err, data) {
  if (err) return console.error(err);
  console.log(data);
});
