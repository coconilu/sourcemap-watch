## sourcemap-watch

source-map查看器。本项目仅是提供一个查看错误堆栈的思路，权当抛砖引玉。

体验步骤：

```
git clone https://github.com/coconilu/sourcemap-watch.git
cd sourcemap-watch
yarn install
yarn start
```

将会自动打开页面（如果没有自动打开，可以输入URL：localhost:8080）：

![空白](https://bayes-1253621140.cos.ap-guangzhou.myqcloud.com/%E6%88%AA%E5%B1%8F2020-03-11%E4%B8%8A%E5%8D%8811.40.49.png)

推荐在使用webpack打包构建的时候输出source-map，并把它和压缩输出文件放在服务器的同目录下，但是服务器要设置成拒绝访问source-map文件，仅供内部访问。一般source-map文件名只是比压缩输出文件名多一个后缀，比如压缩输出文件是`bundle.js`，那么source-map文件是`bundle.js.map`。

可以点击页面的按钮：查看demo，将会展示一个使用案例。

![demo](https://bayes-1253621140.cos.ap-guangzhou.myqcloud.com/%E6%88%AA%E5%B1%8F2020-03-11%E4%B8%8A%E5%8D%8811.41.25.png)

> 上面的案例，是假设从用户收集到的错误信息，xxx/bundle.js.map是source-map文件，行号是1，列号1074（不要惊讶，压缩过的文件基本都是一行）。

使用过程中，只需要url带上如下三个参数：

1. mapurl，表示sourceMap的路径
2. mapline，表示sourceMap的行
3. mapcolumn，表示sourceMap的列

那么如何在生产环境中使用呢？在收集到用户的错误堆栈，里面会有发生错误的js路径和错误行号列号，如果source-map文件跟js文件是放在同一个目录下的话，是可以很轻易获取到source-map文件的。

## 相关依赖

1. [source-map](https://github.com/mozilla/source-map)，处理map-source
2. [JavaScript code prettifier](https://github.com/google/code-prettify)，展示代码
