/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 11:17:29
 * @LastEditTime: 2019-08-12 10:55:19
 * @LastEditors: daiyujie
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "prefer-promise-reject-errors":0,
    //--fix dyj 因为要使用g_config。所以屏蔽该检查
    "no-undef": 0,
    
    "no-unused-vars": ['warn'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  }
}
