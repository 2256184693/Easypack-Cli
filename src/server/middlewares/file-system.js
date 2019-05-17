const url = require('url');

const path = require('path');

const fs = require('fs');

module.exports = (req, res, next) => {
  var targetUrl = url.parse(req.originalUrl).path;
  var filePath = path.join(__easy__.cwd, targetUrl);
  try {
    var stat = fs.statSync(filePath);
    if(stat.isDirectory()) {
      // if(!/\/$/.test(targetUrl)) {
      //   res.redirct(targetUrl + '/');
      //   return
      // }
      renderFileList(targetUrl, filePath).then(function(html) {
        req.res.setHeader('Content-Type', 'text/html');
        req.res.end(html);
      }).catch(e => {
        serverLog.error(`renderFileList => ${e.stack}`);
      });
    }else {
      var res = req.res;
      res.set('Access-Control-Allow-Origin', '*');
      res.sendFile(filePath, err => {
        if(err) {
          res.statusCode = 404;
          res.end('404 Not Found');
          serverLog.error(`404 => ${req.url}`);
        }
      });
    }
  } catch (e) {
    next(e);
    serverLog.error(`url =>${targetUrl}`);
  }
}

function renderFileList(uri, filePath) {
  return new Promise(function(resolve, reject) {
    var docSVG = `<img class="file-icon" src="/__easy__/images/Document.svg" />`;
    var fileSVG = `<img class="file-icon" src="/__easy__/images/File.svg" />`;
    var folderSVG = `<img class="file-icon" src="/__easy__/images/Folder.svg" />`;
    fs.readdir(filePath, (err, files) => {
      if(err) {
        serverLog.err(err);
        reject(err.stack);
        return
      }

      var fileList = files.map(fileName => {
        if(fileName.slice(0, 1) === '.') {
          return;
        }
        var isFile = fs.statSync(filePath + '/' + fileName).isFile();
        return `
          <li>
            <a title="${fileName}" href="${isFile ? fileName : fileName + '/'}">${isFile ? fileSVG : folderSVG}${fileName}</a>
          </li>
        `
      })
      var html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <style>
              ul{ padding: 0; font-size: 14px; }
              li{ list-style: none; margin: 5px; width: 195px; display: inline-block; color: #0077DD; }
              li:hover{ color:#FF5522; }
              a{ padding: 15px 5px; display: block; color: #0077DD; overflow: hidden; white-space: no-wrap; text-overflow: ellipsis; }
              a:hover{ color: #FF5522; }
              .file-icon{ width: 36px; height:36px; vertical-align: middle; margin: 0 10 0 0; }
            </style>
            <body>
              <ul>
                <li><a href="${uri.replace(/\/([^\\\/]*?)\/?$/, '/')}">${folderSVG} ../</a></li>
                ${fileList.join('')}
              </ul>
            </body>
          </head>
        </html>
      `;
      resolve(html);
    })
  });
}
