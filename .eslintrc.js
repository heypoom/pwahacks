module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  extends: "airbnb-base",
  // required to lint *.vue files
  plugins: [
    "html"
  ],
  // check if imports actually resolve
  settings: {
    "import/resolver": {
      webpack: {
        config: "build/webpack.base.conf.js"
      }
    }
  },
  // add your custom rules here
  rules: {
    // allow optionalDependencies
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    quotes: ["warn", "double"],
    semi: ["warn", "never"],
    "comma-dangle": ["warn", "never"],
    "object-curly-spacing": ["warn", "never"],
    "no-param-reassign": ["warn", {props: false}],
    "arrow-parens": ["warn", "as-needed"],
    "no-console": 0,
    "no-alert": 0
  }
}
