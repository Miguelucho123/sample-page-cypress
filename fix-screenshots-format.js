const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'cypress/mochawesomeresults/mochawesome.json');

function sanitizeFilename(filename) {
  return filename
    .replace(/\s/g, '_')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/#/g, '');
}

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  let report = JSON.parse(data);

  report.results.forEach(result => {
    result.suites.forEach(suite => {
      suite.tests.forEach(test => {
        if (test.context) {
          const context = JSON.parse(test.context);
          if (context.title === 'cypress-mochawesome-reporter-screenshots') {
            context.value = context.value.map(arr => arr.map(item => {
              return 'screenshots/' + sanitizeFilename(item.replace('screenshots/', ''));
            }));
          }
          test.context = JSON.stringify(context);
        }
      });
    });
  });

  fs.writeFile(jsonFilePath, JSON.stringify(report, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error trying to update the json file:', err);
    } else {
      console.log('JSON updated');
    }
  });
});