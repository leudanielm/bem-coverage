const recursive = require('recursive-readdir');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const report = require('./report');
const util = require('./util');
const stats = require('./stats');

module.exports = generate;

function generate(configObject, callback) {
  var reportHeader = util.getTemplateContent('report-header');
  var reportBody = [];

  configObject = {
    types: configObject.types || 'css,scss',
    directory: configObject.directory || process.cwd()
  };

  recursive(configObject.directory, function processFiles(err, files) {
    const cssFiles = files.filter(file => configObject.types.split(',').some((type) => path.extname(file) === `.${type.trim()}`));
    const cssFilesCount = cssFiles.length;

    cssFiles
      .forEach(function processFile(file, fileIndex) {
        var counter = constants.getSyntaxAggregator();
        const lineReader = readline.createInterface({
          input: fs.createReadStream(file)
        });
        var fileReport = ['<div class="report">'];
        lineReader
          .on('line', function lineReaderOnLine(line) {
            const lineCssClass = report.getCSSStatementType(counter, line);
            fileReport.push(report.createFileLine(line, lineCssClass));
          })
          .on('close', function lineReaderOnClose() {
            reportBody.push(report.getLogLine(counter, file, fileReport));

            if (fileIndex === (cssFilesCount - 1)) { // End of process
              const overallStats = stats.getStats();

              reportBody.push(util.getTemplateContent('report-footer'));
              reportBody.unshift(
                reportHeader
                  .replace('{totalBem}', overallStats.BEM)
                  .replace('{totalNonBem}', overallStats.NON_BEM)
                  .replace('{totalBemRatio}', util.percentage(overallStats.BEM, overallStats.NON_BEM))
                  .replace('{directory}', configObject.directory)
              );

              const reportName = util.getReportName((configObject.output || `${__dirname}/output`));
              const reportContents = reportBody.join('');

              if (util.isFunction(callback)) {
                callback({
                  report: reportContents,
                  stats: {
                    BEM: overallStats.BEM,
                    NON_BEM: overallStats.NON_BEM,
                    BEM_RATIO: util.percentage(overallStats.BEM, overallStats.NON_BEM)
                  }
                });
              } else {
                if (util.isFunction(configObject.output)) {
                  fs.writeFile(reportName, reportContents, 'utf8', function writingFinished(err) {
                    if (util.isFunction(callback)) {
                      callback(err, reportContents);
                    }
                    if (err) {
                      console.log(`Couldn't write file ${reportName}.`);
                    } else {
                      console.log(`Wrote file ${reportName}`);
                    }
                  });
                } else {
                  console.log(reportContents);
                }
              }
            }
          });
      });
  });
}

