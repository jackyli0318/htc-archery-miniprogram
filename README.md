# HTC-Archery-MiniProgram
HTC射箭协会小程序(前端)

Beta版本功能:
1. 记录射箭成绩
2. 查看排行榜



# HTC-Archery-MiniProgram
HTC 射箭协会小程序（前端）

## Beta 版本功能
1. 记录射箭成绩
2. 查看排行榜

------------------

## 开发环境搭建指南
以下是从零开始搭建开发环境的完整步骤，适用于 MacBook，使用 NVM 管理 Node.js 版本。

1. 安装 NVM
NVM (Node Version Manager) 是一个管理 Node.js 版本的工具，推荐使用它安装和管理 Node.js。

安装步骤：

打开终端，运行以下命令安装 NVM：
bash

Copy
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
注意: 确保使用最新版本的 NVM。
安装完成后，运行以下命令加载 NVM：
bash

Copy
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
验证 NVM 是否安装成功：
bash

Copy
nvm --version
2. 安装 Node.js
使用 NVM 安装推荐的 LTS 版本 Node.js：
bash

Copy
nvm install --lts
设置默认使用的 Node.js 版本：
bash

Copy
nvm use --lts
nvm alias default node
验证 Node.js 和 npm 是否安装成功：
bash

Copy
node -v
npm -v
3. 全局安装 Taro CLI
Taro 是小程序开发的框架，使用它可以快速搭建多端应用。

安装步骤：

全局安装 Taro CLI：
bash

Copy
npm install -g @tarojs/cli
验证 Taro CLI 是否安装成功：
bash

Copy
taro -v
4. 克隆项目代码
使用 Git 克隆项目代码到本地：

bash

Copy
git clone https://github.com/your-repo/htc-archery-miniprogram.git
cd htc-archery-miniprogram
5. 安装依赖
在项目根目录下运行以下命令安装依赖：

bash

Copy
npm install
如果遇到安装缓慢的问题，可以切换到淘宝镜像源：

bash

Copy
npm config set registry https://registry.npmmirror.com/
npm install
6. 启动开发环境
启动微信小程序开发环境：
bash

Copy
npm run dev:weapp
打开 微信开发者工具：
下载：微信开发者工具
添加项目时，选择 dist 文件夹作为项目路径。
填写小程序的 AppID。如果没有 AppID，可以选择体验模式。
7. 目录结构
以下是项目的主要目录结构说明：

mipsasm

Copy
htc-archery-miniprogram/
├── config/                 # 项目配置文件
│   ├── dev.js              # 开发环境配置
│   ├── index.js            # 默认配置
│   └── prod.js             # 生产环境配置
├── src/                    # 源代码
│   ├── pages/              # 页面文件夹
│   │   ├── index/          # 首页
│   │   │   ├── index.tsx   # 首页逻辑
│   │   │   └── index.scss  # 首页样式
│   ├── app.config.ts       # 小程序全局配置
│   ├── app.tsx             # 小程序入口文件
│   └── app.scss            # 全局样式
├── package.json            # 项目依赖配置
├── project.config.json     # 微信小程序配置
├── babel.config.js         # Babel 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明文件
常见问题及解决方法
1. 依赖安装失败
解决方案： 切换到国内 npm 镜像：
bash

Copy
npm config set registry https://registry.npmmirror.com/
npm install
2. node_modules 缺失或损坏
解决方案： 删除 node_modules 和 package-lock.json，然后重新安装：
bash

Copy
rm -rf node_modules package-lock.json
npm install
3. 微信开发者工具无法加载项目
解决方案： 确保项目已正确编译到 dist 目录，并在微信开发者工具中选择正确的路径。
完整命令参考
以下是完整的命令流程，从零开始搭建开发环境：

bash

Copy
# 1. 安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. 安装 Node.js
nvm install --lts
nvm use --lts
nvm alias default node

# 3. 安装 Taro CLI
npm install -g @tarojs/cli

# 4. 克隆项目代码
git clone https://github.com/your-repo/htc-archery-miniprogram.git
cd htc-archery-miniprogram

# 5. 安装依赖
npm install

# 6. 启动开发环境
npm run dev:weapp
项目功能规划
Beta 版本功能：
记录射箭成绩
查看排行榜
未来版本计划：
添加用户登录功能
提供历史成绩统计
支持多人在线对比排行榜
HTC-Archery-MiniProgram 是 HTC 射箭协会的官方小程序，旨在记录射箭成绩并展示排行榜，为协会成员提供便利的工具。欢迎贡献代码和建议！ 😊
