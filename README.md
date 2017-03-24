# page-boilerplate
Web 静态页面－脚手架

## 脚手架功能
- gulp一键打包构建检查压缩代码
- 文件添加MD5
- 浏览器自刷新

## 目录结构

```
 ├──src/              * 代码开发目录
 │   │──images/       * 图片资源
 │   │──scripts/      * js资源
 │   │──styles/       * css资源
 │   │──tpl/          * html模板
 │   └──index.html    * 入口文件
 ├───dist/            * 代码生产目录
 ├───gulpfile.js      * gulp配置入口
 └───package.json     * 项目配置
```

## 如何使用

1. 请先确保已经安装gulp（需要Node.js环境），建议采用下面的代码全局安装

	```
	$ npm install gulp -g
	```

2. 进入你的项目文件夹下`clone`本git项目

	```
	$ git clone https://github.com/clouddisk/page-boilerplate
	```

	`clone`后建议删除残留的`.git`缓存文件夹，方便添加自己的git版本信息管理：

	```
	$ rm -rf .git
	```

3. 安装相关Node模块
	
	在项目文件夹目录下通过下面命令安装相关Node模块

	```
	$ npm install
	```

4. 如果需要进一步的个性化，可以编辑`gulpfile.js`文件

5. 本地开发

	```
	$ gulp dev
	```

6. 如果项目已经完成，可以通过`build`命令进行项目相关文件收集，项目文件最终会汇集到项目目录下的`dist`文件夹中方便进一步操作

	```
	$ gulp build
	```


