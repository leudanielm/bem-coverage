const MATCHERS = {
  HTML_TAG: /^(\t+|\s+)?((a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|\*)((\.|\:|\:\:?)[a-z0-9\-]+)?(,?)(\s?))+(\{|,)((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)$/gi,
  BLOCK: /^(\.?)([a-z](\-?))([a-z0-9]+)(\-(\-)?[a-z0-9]+)*(\s?)(\{|,)((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)+$/gi,
  NESTED_ELEMENT: /^(\t+|\s+)(\&?)((\.|\-?)([a-z](\-?))(([a-z0-9]((\:(\:?))\w)?(\-?))+)(\s?))+(\{|,)((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)$/gi,
  STATEMENT: /^(\t+|\s+)?(\-[a-z])?[a-z]+(\-[a-z]+){0,3}\:(\s?)(.*)\;((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)$/gi,
  STATEMENT_END: /^(\t+|\s+)?\}$/gi,
  FUNCTION: /^(\t+|\s+)?(\}(\s?))?\@(include|import|media|mixin|keyframes|for|if|else)/gi,
  COMMENT: /^(\t+|\s+)?(\/\*|\/\/|\*)(.*)?/gi,
  PSEUDO: /^(\&?)(\:(\:)?)\w+(\s?)(\{|,)$/gi,
  NESTED_PSEUDO: /^(\t+|\s+)(\&?)(\:(\:)?)\w+(\s?)(\{|,)$/gi,
  ATTRIBUTE: /^\[(.*)\](\s?)(\{|,)((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)$/gi,
  NESTED_ATTRIBUTE: /^(\t+|\s+)(\&?)\[(.*)\](\s?)(\{|,)((\s?)(\/\/(.*)|\/\*(.*(\*\/)))?)$/gi,
  VARIABLE: /^(\t+|\s+)?\$/gi
};

const OVERALL_STATS = {
  TOTAL: 0,
  USING_BEM: 0,
  NON_USING_BEM: 0
};

const getSyntaxAggregator = () => {
  return {
    TOTAL: 0,
    ELEMENT: 0,
    NESTED_ELEMENT: 0,
    BLOCK: 0,
    MODIFIER: 0,
    STATEMENT: 0,
    STATEMENT_END: 0,
    HTML_TAG: 0,
    FUNCTION: 0,
    EMPTY: 0,
    COMMENT: 0,
    PSEUDO: 0,
    NESTED_PSEUDO: 0,
    ATTRIBUTE: 0,
    NESTED_ATTRIBUTE: 0,
    VARIABLE: 0,
    UNKNOWN: 0
  };
};

module.exports = {MATCHERS, OVERALL_STATS, getSyntaxAggregator};