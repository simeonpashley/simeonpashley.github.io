var remarkrc = {
  settings: {
    bullet: '-',
    commonmark: true,
    emphasis: '_',
    fence: '`',
    incrementListMarker: true,
    listItemIndent: 1,
    strong: '*',
  },
  plugins: [
    ['frontmatter'],
    ['lint-fenced-code-flag'],
    ['lint-no-shell-dollars'],
    ['remark-lint-heading-increment', 2],
    ['remark-lint-heading-style', 'atx'],
    ['remark-lint-unordered-list-marker-style', '-'],
    ['remark-lint-ordered-list-marker-style', '.'],
    ['remark-lint-ordered-list-marker-value'],
    ['retext-english'],
    ['retext-syntax-urls'],
    ['retext-syntax-mentions'],
    ['retext-emoji'],
    ['retext-sentence-spacing', { preferred: 1 }],
    ['retext-quotes', { preferred: 'straight', straight: '”' }],
    ['retext-repeated-words'],
  ],
};

module.exports = remarkrc;
