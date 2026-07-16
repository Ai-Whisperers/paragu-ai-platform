// stylelint-plugin-no-inline-hex.js
// Custom Stylelint rule: forbid raw hex color literals in CSS files
// except globals.css and themes.css.
//
// Rationale: every color must come from the design system (CSS variables).
// Inline hex bypasses the token system, breaks multi-palette switching,
// and silently drifts from designer-handoff.json.

const stylelint = require('stylelint');

const ruleName = 'aiw/no-inline-hex';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (value) =>
    'Inline hex ' + value + ' found. Use a design system token (var(--color-X)) instead. ' +
    'Inline hex bypasses the multi-palette system and breaks the design-handoff.json contract.',
});

const HEX_PATTERN = /#[0-9a-fA-F]{3,8}\b/g;

function isString(x) { return typeof x === 'string'; }
function isRegExp(x) { return x instanceof RegExp; }

module.exports = stylelint.createPlugin(ruleName, function (primaryOption, secondaryOptions) {
  return (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      { actual: primaryOption, possible: [true] },
      {
        actual: secondaryOptions,
        possible: { allowFiles: [isString, isRegExp] },
        optional: true,
      }
    );

    if (!validOptions || primaryOption === false) return;

    const filename = (postcssRoot.source && postcssRoot.source.input && postcssRoot.source.input.file) || '';
    const allowFiles = (secondaryOptions && secondaryOptions.allowFiles) || ['globals.css', 'themes.css'];

    for (const allow of allowFiles) {
      if (isString(allow) && filename.endsWith(allow)) return;
      if (isRegExp(allow) && allow.test(filename)) return;
    }

    postcssRoot.walkDecls(function (decl) {
      // Skip @keyframes (animation values are not colors)
      if (decl.parent && decl.parent.type === 'atrule' && decl.parent.name === 'keyframes') return;

      const matches = decl.value.match(HEX_PATTERN);
      if (!matches) return;

      for (const match of matches) {
        stylelint.utils.report({
          ruleName,
          result: postcssResult,
          message: messages.rejected(match),
          node: decl,
          word: match,
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;