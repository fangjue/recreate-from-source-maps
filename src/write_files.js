const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { error } = require('./log');

module.exports = (files, projectName) => new Promise((resolve) => {
  Object.entries(files).forEach(([fileName, data]) => {
    let safeFileName = fileName;
    while (safeFileName.startsWith('../')) {
      safeFileName = safeFileName.slice(3);
    }
    const filePath = path.join('results', projectName, safeFileName);
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      mkdirp.sync(fileDir);
    }

    try {
      fs.writeFileSync(filePath, data);
    } catch (err) {
      error(err);
    }
  });

  resolve();
});
