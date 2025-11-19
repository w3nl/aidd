import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginJsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2022,
        ...globals.node
      }
    },
    plugins: {
      import: pluginImport,
      jsdoc: pluginJsdoc
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs"]
        }
      }
    },
    rules: {
      // From recommended + plugins
      ...js.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginImport.configs.errors.rules,
      ...pluginImport.configs.warnings.rules,
      ...pluginImport.configs.typescript.rules,
      ...pluginJsdoc.configs.recommended.rules,
      ...prettier.rules,

      // Custom rules carried over
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": "off",

      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always"
        }
      ],
      "import/no-unresolved": "error",
      "import/newline-after-import": "error",

      "no-param-reassign": "error",

      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-property-description": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: false,
            ClassDeclaration: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false
          }
        }
      ]
    }
  },
  {
    files: ["test/**/*.js"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
];