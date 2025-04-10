const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'cypress/mochawesomeresults/mochawesome.json');

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('ERROR trying to read the json file: ', err);
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
              if (item.startsWith('/')) {
                return 'screenshots' + item;
              }
              return item;
            }));
          }
          test.context = JSON.stringify(context);
        }
      });
    });
  });

  fs.writeFile(jsonFilePath, JSON.stringify(report, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('error trying to write into json file:', err);
    } else {
      console.log('JSON fixed');
    }
  });
});