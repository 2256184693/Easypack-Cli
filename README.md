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

    可以简单的设置`true`或 `false`，设置`true`时`EasyPack`会设置一个默认的插件配置。

    也支持直接插件配置。具体信息请查看[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)的文档。

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

    
    
+ `openBrowser`(`Boolean|String`)(默认：`false`)
+ `openBrowser`(`Boolean|String`)(默认：`false`)





