/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none',
  endOfLine: 'auto',
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    {
      files: '*.json'
    },
    {
      files: ['*.js', '*.tsx'],
      options: {
        semi: false
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
        plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
        importOrder: [
          '^([a-z]|@(?!/|mobilestockweb|mobilestock-native)).*$',
          '^(@/|@mobilestockweb|@mobilestock-native).*$',
          '^(../|./|.).*$'
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true
      }
    }
  ]
}

module.exports = config
