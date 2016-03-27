const fs = require('fs');

module.exports = {percentage, rightTrim, getTemplateContent, getReportName, isFunction};

/**
 * Calculates the percentage between two numbers
 * @param a:Number
 * @param b:Number
 * @returns {Number}
 */
function percentage(a, b) {
  if (isNaN(a) || isNaN(b) || !b) {
    return 0;
  }
  return Math.round(a / b * 100);
}

/**
 * Removes the right spaces and/or tabs from a string.
 * @param string:String
 * @returns {Blob|ArrayBuffer|Array.<T>}
 */
function rightTrim(string) {
  var charArray = (string || '').split('');
  var mustBeTrimmedFrom = string.length;
  for (var i = charArray.length - 1; i > 0; i--) {
    if (/(\t|\s)/gi.test(charArray[i])) {
      mustBeTrimmedFrom = i;
    } else {
      break;
    }
  }

  return string.slice(0, mustBeTrimmedFrom);
}

/**
 * Gets a template from the templates folder based on its name.
 * @param templateName:String
 * @returns {String}
 */
function getTemplateContent(templateName) {
  return fs.readFileSync(`${__dirname}/templates/${templateName}.html`, 'utf8');
}

/**
 * Gets the full qualified output report name.
 * @param directory
 * @returns {String}
 */
function getReportName(directory) {
  return `${directory}/bem-coverage.html`;
}

/**
 * Checks whether the value is a function
 * @param what
 * @returns {boolean}
 */
function isFunction(value) {
  return 'function' === typeof value;
}