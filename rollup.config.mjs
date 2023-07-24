import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import copy from "rollup-plugin-copy"
import { terser } from "rollup-plugin-minification";

export default {
  input: "./src/index.js", //入口文件
  output: {
    file: "./dist/login.js", //打包后的存放文件
    format: "cjs", //输出格式 amd es6 iife umd cjs
  },
  plugins: [
    // 代码压缩
    terser(),
    // 解析并导入第三方模块
    commonjs(),
    resolve(),
    // 编译json文件
    json(),
    // 静态资源
    copy({
      targets: [
        {
          src: "./src/config.json",
          dest: "dist",
        },
        {
          src: "./src/chromedriver.exe",
          dest: "dist",
        },
      ],
    }),
  ],
}
