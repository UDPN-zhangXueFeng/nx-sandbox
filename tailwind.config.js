/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 09:39:12
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-27 11:18:10
 * @Description: 
 */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }


};
