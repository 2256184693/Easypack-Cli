<!-- TODO: Easypack-Cli README -->
# **Easypack-Cli**
 
 + `Easypack-Cli` 是基于Webpack的项目打包、编译工具。
 
 + `Easypack-Cli` 集成Webpack的一系列功能，并对一些常用的特定功能封装化，方便用户配置及使用。
 
 + `Easypack-Cli` 预设了一些特定的模板便于用户使用。
  
 + `Easypack-Cli` 基于 `Webpack@4.x` 版本开发。可能不兼容低于此版本的一些用法。
 
## **安装**

    $   npm install easypack-cli -g

## **使用**

### 创建工程

```bash
$   easy init <template-name> [project-name]

#   example: 

#   easy init basic my-project
```

+ `template-name` （预设模板的名称）
    
    该项为必填项。目前预设的模板如下：

    名称|预设框架|描述
    :---|:---:|---
    basic|-|基础项目模板,包含完整的配置文件及注释。
    vue-spa|Vue|Vue的SPA应用模板。

+ `project-name` （工程的名称）

    该项为非必填项。默认的工程名称为 "my-project"。

### 启动工程

```bash
$   easy start [--port port]

#   example:

#   easy start -p 3000

#   easy start --port 3000
```

+ 执行命令启动内置服务器。服务器端口可以通过命令行参数指定。默认`9000`端口。

+ 端口号也可在工程根目录下配置文件中进行配置。优先级：命令行 > 配置。 

### 工程打包

```bash
$   easy build
```

+ 工程执行打包命令后会在配置文件中指定的输出位置输出编译结果。

## 配置参数

工程编译运行的相关配置都存放在根目录下的 `easy.config.js` 中。

+ `port`(`Number`)(默认：`9000`)
    
    内置服务器的启动端口。优先级低于命令行参数。。
+ `openBrowser`(`Boolean|String`)(默认：`false`)

    在运行本地服务器成功后是否自动打开对应工程的页面。配置`true`时，如果工程是单页应用，会打开对应页面。多页则配置中的第一个页面。另外还可以直接指定打开的链接，链接必须符合条件(`/^https?:\/\//`)。

    ```javascript
    {
        openBrowser: false, // 默认
        openBrowser: true,
        openBrowser: "http://127.0.0.1:9000/demo.html",
        openBrowser: "https://github.com/2256184693/Easypack-Cli",
    }
    ```
+ `analyze`(`Boolean|Object`)(默认：`false`)

    基于[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)实现。

    是否查看输出文件的交互式可视化树形图，该配置在`production`环境下生效。

    可以设置为`true`或 `false`，设置`true`时`EasyPack`会设置一个默认的插件配置。

    也支持analyzer插件配置。具体信息请查看[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)的文档。

    ```javascript
    {
        analyze: false, // 默认
        analyze: true, // 设置true工具会自动转成下边的默认object配置
        analyze: {
            analyzerMode: 'static',
        },
        analyze: {
            analyzerMode: 'static',
            reportFilename: 'report.html'
        }
    }
    ```

    
    
+ `vue`(`Boolean`)(默认：`false`)

    工程是否使用`vue`。设置后会在webpack配置中增加vue相关的loader以及plugin。

    ```javascript
    {
        vue: false, // 默认
        vue: true,
    }
    ```

+ `parallel`(`Boolean`)(默认：`false`)

    配置项基于[thread-loader](https://www.webpackjs.com/loaders/thread-loader/)。

    是否开启并行模式。默认关闭空，如果打开则会将在loader的尾端增加`thread-loader`，加快编译速度。
    
    > TODO:
    
    1. parallel 配置化。可支持特定loader并行。
+ `cssLoader`(`Object`)

    配置loader的相关参数。

    支持设置extensions字段。该字段可配置工程支持的css类型。默认值为`['.css', 'sass', 'scss', 'less']`。工具会根据当前支持的extensions以及在配置文件rule中的配置项来智能添加要支持且没有在rules中增加自定义配置的类型loader。

    该配置也支持定制化的设置特定loader的参数。具体配置可以自行查看对应loader的文档。

    ```javascript
    // 默认配置
    {
        cssLoader: {
            extensions: ['.css', '.sass', '.scss', '.less'],
            css: {},
            sass: {
                indentedSyntax: true
            },
            scss: {},
            less: {}
        }
    }
    ```
+ `entryHtml`(`Object`)

    功能基于[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)实现。

    入口html的配置项。配置相关的入口html模板及其他配置。

    具体入口html的配置项请参考[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)。

    ```javascript
    {
        entryHtml: [
            {
                filename: 'index.html',
                template: './index.html',
                chunks: ['__common_vue__', 'index'], // 配置当前入口html要引入的chunk
                // 默认情况下的配置参数
                inject: true,
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            }
        ]
    }
    ```

+ `libraryMode`(`String ['all', 'custom']`)(默认：`all`)

    该配置项结合`library`一起使用。目前支持两种模式。
    
    `all`模式下dll文件会插入到每一个入口。类似于全局公共模块。
    
    `custom`模式下dll文件不会插入到每一个入口。插入情况是由`entryHtml`中的每一个入口的chunks配置的。

    具体的用法请查看`library`
+ `library`(`Object`)

    dll文件配置。可以增加多个dll文件入口。object的key代表当前的dll-chunk的名称。value类型为数组，代表当前chunk所包含的包。

    默认情况下的配置：

    ```javascript
    {
        // vue项目将vue相关包打入dll
        libraryMode: 'all', // 所有入口全部引入dll。
        library: {
            /***
             * __common_vue__：当前dll的chunk名。其内包括三个vue必备或常用的包。
             **/
            '__common_vue__': ['vue', 'vue-router', 'vuex']
        }
    }
    ```

    自定义引入：index中只引入了vendor，而show中因为存在图标相关的展示，所以把echarts也引入了。

    ```javascript
    {
        libraryMode: 'custom',
        // 配置了两个dll-chunk
        library: {
            vendor: ['vue', 'vue-router', 'vuex'],
            echarts: ['echarts']
        },
        entryHtml: [
            {
                filename: 'index.html',
                // xxx
                chunks: ['vendor', 'index']
            },
            {
                filename: 'other.html',
                chunks: ['vendor', 'other']
            },
            {
                filename: 'show.html',
                chunks: ['vendor', 'echarts', 'show']
            }
        ]
    }
    ```

    TODO:

    > 更加自定义的配置dll。支持参数是函数类型。
    
+ `环境相关参数`

    工具中除了可以设置通用的配置项外，还支持不同环境使用不同的配置。
    
    `_devConfig` 和 `_prdConfig`这两个配置项分别代表开发环境和生产环境的配置。值为函数类型。函数默认接收两个参数，第一个是当前的工作目录，第二个是当前的完整配置项。

    `_devDllConfig` 和 `_prdDllConfig`这两个配置项分别代表开发环境和生产环境的Dll的配置。使用方法和上面的配置大同小异。函数增加了第三个参数，是当前工程的dll配置的相关信息。

    ```javascript
    {
        _devConfig: function(workspace, easyConfig) {},
        _prdConfig: function(workspace, easyConfig) {},
        _devDllConfig: function(workspace, easyConfig, dll) {},
        _prdDllConfig: function(workspace, easyConfig) {}
    }
    ```


