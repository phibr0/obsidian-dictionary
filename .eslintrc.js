// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
        "indent": ["error", 4],
        "@typescript-eslint/no-unused-vars": [
            2,
            { args: "all", argsIgnorePattern: "^_" },
        ],
    },
};
