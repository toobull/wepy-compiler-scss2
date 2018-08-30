# wepy scss 编译器

支持`postcss`插件的 wepy scss 编译器。

## 安装

```
npm install wepy-compiler-scss2 --save-dev
```

## 配置`wepy.config.js`

```
module.exports = {
    compilers: {
        scss2: {
            outputStyle: 'compressed',
            // 支持postcss
            postcss: {
                plugins: [
                    // 可以将 px 转换成 rpx 的插件 
                    require('postcss-pxtorpx')({
                        multiplier: 2,
                        unitPrecision: 5,
                        propList: ['*'],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 2
                    }),
                ]
            }
        }
    }
};
```

## 使用
使用时只需将`<style>`的lang属性设置为`scss2`即可：
```
<style lang="scss2">

</style>
```

## 参数说明
除了 `postcss` 这个参数，其余参数均为 [node-sass](https://github.com/sass/node-sass) 的参数，
此插件仅支持scss模式。
