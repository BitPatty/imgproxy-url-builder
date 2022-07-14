const fs = require('fs');
const path = require('path');

fs.writeFileSync(
  path.join(__dirname, 'dist', 'cjs', 'package.json'),
  '{ "type": "commonjs" }',
);

fs.writeFileSync(
  path.join(__dirname, 'dist', 'mjs', 'package.json'),
  '{ "type": "module" }',
);
