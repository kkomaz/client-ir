module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["react-hooks"],
  "rules": {
    "comma-dangle": 0,
    "semi": 0,
    "operator-linebreak": 0,
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "max-len": 0,
    "arrow-parens": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-wrap-multilines": 0,
    "react/forbid-prop-types": 0,
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
}
