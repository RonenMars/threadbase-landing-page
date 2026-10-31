// Code colors from the Threadbase Design System (`--tb-code-*` in colors_and_type.css).
export const threadbaseCodeTheme = {
  name: "threadbase",
  type: "dark" as const,
  colors: {
    "editor.background": "#0a111d",
    "editor.foreground": "#d6e0ee",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#6c809b" },
    },
    {
      scope: ["keyword", "storage", "keyword.operator.new"],
      settings: { foreground: "#c792ea" },
    },
    {
      scope: ["string", "markup.inline.raw"],
      settings: { foreground: "#c3e88d" },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: { foreground: "#f78c6c" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "entity.name.command",
        "support.function.builtin",
      ],
      settings: { foreground: "#82aaff" },
    },
    {
      scope: ["entity.name.tag", "support.class.component"],
      settings: { foreground: "#f07178" },
    },
    {
      scope: ["variable", "variable.parameter", "source"],
      settings: { foreground: "#d6e0ee" },
    },
  ],
};
