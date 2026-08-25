export const createParagraphRule = (patterns, message) => (context) => ({
  [context.Syntax.Paragraph]: (node) => {
    const source = context.getSource(node);
    const match = patterns.map((pattern) => source.match(pattern)).find(Boolean);

    if (!match) {
      return;
    }

    const start = match.index ?? 0;
    context.report(
      node,
      new context.RuleError(message, {
        padding: context.locator.range([start, start + match[0].length]),
      }),
    );
  },
});
