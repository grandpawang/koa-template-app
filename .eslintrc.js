module.exports = {
  /**
   * 停止向上寻找配置文件
   */
  root: true,
  /**
   * 配置开发环境
   * @description 当前环境下可使用的全局变量
   */
  env: {
      es6: true,
      node: true
  },
  /**
   * 配置规则继承
   * @description 后面的规则会覆盖前面的
   */
  extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
  ],
  /**
   * 解析器配置
   * @description 使用自定义解析器配置
   */
  parserOptions: {
    /**
     * 解析器
     * @description 解析器使用typescript
     */
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
        /**
         * 启用jsx
         */
        jsx: true,
    },
  },
  /**
    * 配置插件
    * @description 配置插件名字，可以省略'eslint-plugin-'前缀
    * @description 使用前要用npm安装
    */
  plugins: ["@typescript-eslint"],
  rules: {
    // @fixable 必须使用双引号，禁止使用单引号
    quotes: [
      "error",
      "double",
      {
          avoidEscape: true,
          allowTemplateLiterals: true,
      },
    ],
    // @fixable 一个缩进必须用四个空格替代
    indent: [
      "error",
      2,
      {
          SwitchCase: 1,
          flatTernaryExpressions: true,
      },
    ],
    // 行最大长度为150
    "max-len": [
      "warn",
      {
          code: 150,
      },
    ],
  },
};
