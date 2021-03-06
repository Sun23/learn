
# 常用的方法：

    yarn add: 为当前包添加一个依赖包。
    yarn init: 初始化一个包。
    yarn install: 依照 package.json 文件列出的依赖安装所有依赖包。
    yarn publish: 发布一个包到包管理器。
    yarn remove: 从当前项目删除一个无用的依赖包。

默认命令：只执行yarn相当于yarn install

    yarn add [package-name] 本地项目安装模块
    yarn global add [package-name] 全局安装模块
    yarn add [package] --dev 添加到devDependencies
    yarn add [package] --peer  添加到 peerDependencies 
    yarn add [package] --optional 添加到 optionalDependencies

    你可以用以下任何方法指定版本号：
        yarn add package-name 命令用来安装包的 “最新（latest）” 版本。
        yarn add package-name@1.2.3 命令将通过 npm registry 来安装这个包的指定版本。
        yarn add package-name@tag 命令用来安装具有某个 “标签（tag）” 的包（例如： beta、next 或 latest）。

#### yarn init 初始化一个包（会创建package.json、证书、版本号等默认信息）
    yarn init -y/--yes 以默认的信息初始化

#### yarn install 按照package.json 中的dependencies 安装模块

#### yarn publish 以当前目录发布一个包

#### yarn remove [package] 删除包 同时更新package.json 和 yarn.lock

#### yarn run [name]

        yarn run [名字] 在package.json 中配置script对象如：
          "scripts": {
            "dev": "node build/dev-server.js",
            "start": "npm run dev",
            "build": "node build/build.js",
            "lint": "eslint --ext .js,.vue src"
          }

        yarn run dev 
        如果直接yarn run 则按列表顺序执行
        yarn run start 可以直接yarn start  其他命令不可以需要写上run

#### 更新包

      yarn upgrade [package]
      yarn upgrade [package]@[version]
      yarn upgrade [package]@[tag]
