const path = require('path');

const fs = require('fs');

var obj = {
  a: 1,
  b: 2,
  c: '123'
};

fs.writeFileSync(path.join(__dirname, 'dist/test/test.json'), JSON.stringify(obj));