# `eslint-plugin-baseui`

This ESLint plugin is for developers using the Base Web component library. Mainly it attempts to:

- Identify usage of deprecated APIs
- Identify usage of unsupported exports
- Identify improper usage of components
- Identify improper styling on Block elements
- Identify improper styling on baseui components
- Identify shorthand properties in baseui overrides

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-baseui --save-dev

# yarn
yarn add eslint-plugin-baseui --dev
```

Then add it to your ESLint configuration:

```json5
{
  "plugins": [
    // ...
    "baseui",
  ],
  "rules": {
    // ...
    'baseui/deprecated-theme-api': "warn",
    'baseui/deprecated-component-api': "warn",
    'baseui/no-deep-imports': "warn",
    'baseui/no-block-style': "warn",
    'baseui/no-component-classname': "warn",
    'baseui/no-shorthand-properties': "warn",
  }
}
```

Or extend the recommended config

```json
{
  "extends": ["plugin:baseui/recommended"]
}
```

### Versioning

To get linting specific to your version of `baseui`, simply install the matching version of `eslint-plugin-baseui`.

```json
{
  "dependencies": {
    "baseui": "10.0.0"
  },
  "devDependencies": {
    "eslint-plugin-baseui": "10.0.0"
  }
}
```

We sync the versions for each package, so you shouldn't have to worry about it.

**ℹ️ Note that the first available version of this package is `9.41.0`.**

## Rules

| Rule                       | Responsibility                                                                                 |
|----------------------------|------------------------------------------------------------------------------------------------|
| `deprecated-theme-api`     | Identify theme properties that are deprecated.                                                 |
| `deprecated-component-api` | Identify components and props that are deprecated.                                             |
| `no-deep-imports`          | Identify importing unsupported modules from `baseui` source code.                              |
| `no-block-style`           | Identify instances of Block being used with style/$style instead of overrides. (not supported) |
| `no-component-classname`   | Identify instances of components being styled using className. (not supported)                 |
| `no-shorthand-properties`  | Identify instances of component overrides using shorthand css properties.                      |

## Contributing

To publish new versions of this package all you need to do is release a new version of `baseui`. Our deploy script will publish a new version of the eslint plugin which matches the new version of `baseui`. Note, this also means every version of `baseui` will publish a corresponding version of `eslint-plugin-baseui`, even if there are no changes to the package.

## License

MIT
