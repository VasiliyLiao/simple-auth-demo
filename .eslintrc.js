module.exports = {
    extends: 'eslint:recommended',
    env: {
        node: true,
        es6: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2018,
        requireConfigFile: false,
        sourceType: 'module',
    },
    rules: {
        'keyword-spacing': ['error', { before: true }],
        'array-bracket-spacing': ['error', 'never'],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-spacing': ['error'],
        'arrow-parens': ['error', 'as-needed'],
        'brace-style': ['error', 'stroustrup'],
        'block-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'], // 拖尾逗号 - 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
        'comma-spacing': ['error', { before: false, after: true }], // 逗號後面空一格
        'eol-last': ['error', 'always'], // 拖尾换行
        indent: ['error', 4, { MemberExpression: 1, SwitchCase:1 }], // 空格4格
        'linebreak-style': ['error', 'unix'],
        'no-console': 'off', // 是否有console - 目前為可以有console
        'no-multi-spaces': ['error'],
        'no-multiple-empty-lines': ['error'], //程式間不能有多餘的空行 默認最大值為2
        'no-new-symbol': 'error', // Symbol 不和 new 操作符一起使用，而是作为函数调用。
        'no-trailing-spaces': ['error'], //禁止行數(分號)後面有空格、tab 和其它 Unicode 空白字符
        'no-undef': ['error'], // 使用變數時沒有宣告
        'no-unused-vars': ['error'], // 不應該有未使用的變數留存
        'no-else-return': 'error',
        'no-spaced-func': ['error'],
        'object-curly-spacing': ['error', 'always'], // 要求花括號內須有空格
        'object-shorthand': ['error', 'always'], // 要求对象字面量简写语法
        'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
        quotes: ['error', 'single'], // 字串使用單引號,
        'quote-props': ['error', 'as-needed'],
        semi: ['error'], //是否要分號
        'semi-spacing': ['error'],
        'semi-style': ['error', 'last'],
        'space-infix-ops': ['error'],
        'space-in-parens': ['error', 'never'], // 禁止圆括号内的空格
        'space-before-blocks': ['error'],
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
        strict: [2, 'never'], // 嚴格模式
    },
};
