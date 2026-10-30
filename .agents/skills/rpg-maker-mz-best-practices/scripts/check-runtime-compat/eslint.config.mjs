// Chromium 88 floor (MZ 1.10.0 -> NW.js 0.51.0). Everything ES2021 or newer is flagged except the
// features Chromium 88 already ships; browser support is taken from @mdn/browser-compat-data.
import esx from "eslint-plugin-es-x";

// ES2021+ features Chromium 88 supports (first Chromium version in parentheses).
const SUPPORTED_IN_88 = [
  "no-logical-assignment-operators", // 85
  "no-numeric-separators", // 75
  "no-promise-any", // 85
  "no-string-prototype-replaceall", // 85
  "no-weakrefs", // 84
  "no-class-instance-fields", // 72
  "no-class-private-fields", // 74
  "no-class-private-methods", // 84
  "no-class-static-fields", // 72
];

const flagged = {};
for (const edition of ["2021", "2022", "2023", "2024", "2025", "2026", "next"]) {
  const configs = esx.configs[`flat/no-new-in-es${edition}`];
  for (const entry of [].concat(configs)) {
    for (const [name, level] of Object.entries(entry.rules ?? {})) flagged[name] = level;
  }
}
for (const name of SUPPORTED_IN_88) delete flagged[`es-x/${name}`];

// Match these methods on receivers of unknown type too (`list.at(-1)` without a known array). Never do this
// for iterator-prototype rules: `map`, `filter`, `find`, `some` also exist on arrays and would flag every call.
const AGGRESSIVE = /^es-x\/no-(array|string|set|map|weakmap)-prototype-/;
for (const name of Object.keys(flagged)) {
  const rule = esx.rules[name.replace("es-x/", "")];
  if (AGGRESSIVE.test(name) && rule?.meta?.schema?.[0]?.properties?.aggressive) flagged[name] = ["error", { aggressive: true }];
}

export default [
  {
    files: ["**/*.js"],
    plugins: { "es-x": esx },
    languageOptions: { ecmaVersion: "latest", sourceType: "script" },
    rules: {
      ...flagged,
      "no-restricted-globals": ["error", { name: "structuredClone", message: "Chromium 98; absent in NW.js 0.51 (Chromium 88)" }],
      "no-restricted-properties": [
        "error",
        { object: "crypto", property: "randomUUID", message: "Chromium 92; absent in NW.js 0.51 (Chromium 88)" },
        { object: "window", property: "structuredClone", message: "Chromium 98; absent in NW.js 0.51 (Chromium 88)" },
        { object: "globalThis", property: "structuredClone", message: "Chromium 98; absent in NW.js 0.51 (Chromium 88)" },
      ],
    },
  },
];
