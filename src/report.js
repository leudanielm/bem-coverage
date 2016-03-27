const util = require('./util');
const constants = require('./constants');
const stats = require('./stats');

module.exports = {getLogLine, createFileLine, getCSSStatementType};

/**
 * Creates a new file line for reporting purposes and returns it
 * @param line:String
 * @param statementType:String
 * @returns {String<Html>}
 */
function createFileLine(line, statementType) {
  return `<div class="line ${statementType}">${line || '&nbsp;'}<span class="statement-type">${statementType.replace(/\-/g, ' ')}</span></div>`;
}

/**
 * Returns a report line
 * @param counterObject:Object
 * @param fileName:String
 * @param fileReportBody:String
 * @returns {String<Html>}
 */
function getLogLine(counterObject, fileName, fileReportBody) {
  const bemStatements = counterObject.ELEMENT + counterObject.BLOCK + counterObject.MODIFIER;
  const declarationLines = counterObject.TOTAL -
    (counterObject.STATEMENT_END +
      counterObject.STATEMENT +
      counterObject.FUNCTION +
      counterObject.EMPTY +
      counterObject.UNKNOWN +
      counterObject.VARIABLE +
      counterObject.COMMENT
    );

  //update stats
  stats.updateBem(bemStatements);
  stats.updateNonBem(declarationLines);
  stats.updateTotal(counterObject.TOTAL);

  const bemRatio = util.percentage(bemStatements, declarationLines);
  const doesApply = bemRatio > 0 && declarationLines > 0;
  const rowBackground = doesApply ? (bemRatio < 90 ? (bemRatio < 50 ? 'bad' : 'okay') : 'good') : 'doesnt-apply';
  return `
      <tr class="expander ${rowBackground}">
        <td>${fileName}</td>
        <td>${counterObject.ELEMENT}</td>
        <td>${counterObject.BLOCK}</td>
        <td>${counterObject.MODIFIER}</td>
        <td>${counterObject.STATEMENT}</td>
        <td>${doesApply ? `${bemRatio}%` : 'N/A'}</td>
      </tr><tr class="none">
        <td class="code" colspan="6">
          <pre>
            ${fileReportBody.join('')}
          </pre>
        </td>
      </tr>
    `;
}

/**
 * Gets the CSS statement type depending on the regex matched
 * @param statementObject {Object}
 * @param line {String}
 * @returns {string} - the CSSClass:string depending on the statement type
 */
function getCSSStatementType(statementObject, line) {
  line = util.rightTrim(line.toString());
  statementObject.TOTAL++;
  if (line.match(constants.MATCHERS.BLOCK) && !line.match(constants.MATCHERS.HTML_TAG)) {
    statementObject.BLOCK++;
    return 'block';
  } else if (~line.indexOf('__')) {
    statementObject.ELEMENT++;
    return 'element';
  } else if (~line.indexOf('--')) {
    statementObject.MODIFIER++;
    return 'modifier';
  } else if (line.match(constants.MATCHERS.NESTED_ELEMENT)) {
    statementObject.NESTED_ELEMENT++;
    return 'nested-element';
  } else if (line.match(constants.MATCHERS.STATEMENT_END)) {
    statementObject.STATEMENT_END++;
    return 'declaration-end';
  } else if (line.match(constants.MATCHERS.STATEMENT)) {
    statementObject.STATEMENT++;
    return 'statement';
  } else if (line.match(constants.MATCHERS.HTML_TAG)) {
    statementObject.HTML_TAG++;
    return 'html-tag';
  } else if (line.match(constants.MATCHERS.FUNCTION)) {
    statementObject.FUNCTION++;
    return 'css-function';
  } else if (line.match(constants.MATCHERS.COMMENT)) {
    statementObject.COMMENT++;
    return 'comment';
  } else if (line.match(constants.MATCHERS.ATTRIBUTE)) {
    statementObject.ATTRIBUTE++;
    return 'attribute';
  } else if (line.match(constants.MATCHERS.NESTED_ATTRIBUTE)) {
    statementObject.NESTED_ATTRIBUTE++;
    return 'nested-attribute';
  } else if (line.match(constants.MATCHERS.PSEUDO)) {
    statementObject.PSEUDO++;
    return 'pseudo';
  } else if (line.match(constants.MATCHERS.NESTED_PSEUDO)) {
    statementObject.NESTED_PSEUDO++;
    return 'nested-pseudo';
  } else if (line.match(constants.MATCHERS.VARIABLE)) {
    statementObject.VARIABLE++;
    return 'variable';
  } else if (!line) {
    statementObject.EMPTY++;
    return 'empty';
  } else {
    statementObject.UNKNOWN++;
    return 'unknown';
  }
}