const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

console.log('=== CUSTOM SERVER STARTING ===');
console.log('CWD:', process.cwd());
console.log('PORT:', process.env.PORT, '-> using:', port);
console.log('NODE_ENV:', process.env.NODE_ENV);

const fs = require('fs');
console.log('.next exists:', fs.existsSync('.next'));
console.log('.next/BUILD_ID:', fs.existsSync('.next/BUILD_ID') ? fs.readFileSync('.next/BUILD_ID', 'utf8').trim() : 'MISSING');

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, '0.0.0.0', () => {
      console.log(`=== SERVER READY on port ${port} ===`);
    });
  })
  .catch(err => {
    console.error('=== SERVER FAILED TO START ===');
    console.error(err);
    process.exit(1);
  });
