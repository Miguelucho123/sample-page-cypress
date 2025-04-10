const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'cypress/mochawesomeresults/screenshots');

function sanitizeFilename(filename) {
  return filename
    .replace(/\s/g, '_')
    .replace(/\(/g, '') 
    .replace(/\)/g, '') 
    .replace(/#/g, ''); 
}

function renameScreenshots() {
  fs.readdir(screenshotsDir, (err, files) => {
    if (err) {
      console.error('Error with the path of screenshots:', err);
      return;
    }

    files.forEach(folder => {
      const folderPath = path.join(screenshotsDir, folder);
      fs.readdir(folderPath, (err, screenshots) => {
        if (err) {
          console.error('Error no screenshots:', err);
          return;
        }

        screenshots.forEach(screenshot => {
          const oldPath = path.join(folderPath, screenshot);
          const newPath = path.join(folderPath, sanitizeFilename(screenshot));

          fs.rename(oldPath, newPath, err => {
            if (err) {
              console.error('Error, it is not possible to rename the file:', err);
            } else {
              console.log(`New name: ${oldPath} -> ${newPath}`);
            }
          });
        });
      });
    });
  });
}

renameScreenshots();