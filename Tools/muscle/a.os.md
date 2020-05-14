<!-- MarkdownTOC -->

- [腾讯云 centos](#%E8%85%BE%E8%AE%AF%E4%BA%91-centos)
	- [解决 sudo npm command not found](#%E8%A7%A3%E5%86%B3-sudo-npm-command-not-found)
	- [react 项目打包内存溢出](#react-%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA)
- [Mac OS](#mac-os)
	- [command](#command)
	- [配置 zsh](#%E9%85%8D%E7%BD%AE-zsh)
	- [解决系统占用100多G问题](#%E8%A7%A3%E5%86%B3%E7%B3%BB%E7%BB%9F%E5%8D%A0%E7%94%A8100%E5%A4%9Ag%E9%97%AE%E9%A2%98)
- [Windows](#windows)
	- [question && answer](#question--answer)
	- [文件共享给 Mac](#%E6%96%87%E4%BB%B6%E5%85%B1%E4%BA%AB%E7%BB%99-mac)
	- [Mac OS](#mac-os-1)
- [Xcode](#xcode)
	- [Import a New Project](#import-a-new-project)
	- [Hotkey](#hotkey)
	- [Create a new Xcode Project](#create-a-new-xcode-project)
	- [Set Project Properties](#set-project-properties)
	- [Debugger](#debugger)
	- [Pannel](#pannel)
		- [Left Pannel](#left-pannel)
		- [Right Pannel](#right-pannel)
	- [File Structure](#file-structure)
	- [Simulator](#simulator)
		- [Hardware](#hardware)
		- [File](#file)

<!-- /MarkdownTOC -->


## 腾讯云 centos

`wget --version` 查看是否安装 wget，wget
是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理

`rpm -qa | grep mariadb` 列出所有 mariadb 的安装包

`yum remove mariadb` 删除 mariadb 的相关安装包

[Linux 云服务器搭建 FTP 服务](https://cloud.tencent.com/document/product/213/10912)

`node --version` 查看是否安装 node，如果没有安装，可以自定义安装，[具体参考](https://cloud.tencent.com/document/product/213/38237)

- `cd root` 进入根目录
- `wget https://nodejs.org/dist/v12.13.1/node-v12.13.1-linux-x64.tar.xz` 下载安装包
- `tar xvf node-v12.13.1-linux.tar.xz` 在根目录下存在下载文件后，解压 node 文件
- `ln -s /root/node-v12.13.1-linux-x64/bin/node /usr/local/bin/node` 建立 node 命令的软链接
- `ln -s /root/node-v12.13.1-linux-x64/bin/npm /usr/local/bin/npm` 建立 npm 命令的软链接
- `node --version` 查看安装是否成功

Git环境搭建
- 通过 `yum install git` 安装 git 环境
- `git --version` 查看是否安装成功
- `git config --global user.name ""` 设置用户名
- `git config --global user.email ""` 设置email

Vuepress环境安装
- `npm install -g vuepress` 安装 vuepress，如果发现 command not found，则可能是环境变了Path路径不对
- `cd /root/node-v12.13.1-linux-x64/bin/` 和 `cd /usr/local/bin/` 查看各自目录下是否有 vuepress，目的是在后者文件内存在 vuepress
- `ln -s /root/node-v12.13.1-linux-x64/bin/vuepress /usr/local/bin/vuepress` 建立 vuepress 命令的软链接

Nginx
- `yum install nginx` 安装 nginx
- `whereis nginx` 查看 nginx 安装路径，在 /etc/nginx 内修改配置文件

Python3
- 下载[python3安装包](https://www.python.org/ftp/python/3.7.2/Python-3.7.2.tar.xz)，最好通过迅雷进行下载，其他方式下载很慢
- 下载完成之后进行解压 `tar xvf Python-3.7.2.tar.xz`
- `cd Python-3.7.2` 进入安装根目录执行 `make & make install` 对其进行编译，此时 Python3 已经安装成功了
- `ln -s /usr/local/python3/bin/python3 /usr/bin/python` 创建软链接，之后可以通过 `ptython3 --verson` 查看是否安装完成

但是通过解压包安装的 Python3 程序并没有 pip3 来进行 package manage，因此引出另一个问题，即安装 pip3
- 下载 [setupTools](https://pypi.python.org/packages/source/s/setuptools/setuptools-19.6.tar.gz#md5=c607dd118eae682c44ed146367a17e26)
- 下载 [pip3](https://pypi.python.org/packages/source/p/pip/pip-8.0.2.tar.gz#md5=3a73c4188f8dbad6a1e6f6d44d117eeb)
- `yum install openssl-devel -y` 安装 openssl 依赖
- `yum install zlib-devel -y` 安装 zlib 依赖
- 下载完成之后，分别执行 `tar xvf [filename]` 进行解压
- 进入 setupTools 根目录，执行 `python3 setup.py build && python3 setup.py install` 对其进行安装
- 进入解压后的 pip3 根目录，执行 `python3 setup.py build && python3 setup.py install` 对其进行安装，会发现在 `/usr/local/python3` 内已经新增了 pip3 的相关资源
- **重新编译Python3**，进入到 python3 安装目录下，重新执行 `make & make install` 进行编译，否则会报错，找不到相关的依赖包
- 最后，通过 `ln -s /usr/local/python3.5/bin/pip3 /usr/bin/pip3` 为其创建快捷方式
- 通过 `pip3 install --upgrade pip` 对 pip3 进行升级


### 解决 sudo npm command not found

出现这种情况的原因，主要是因为当 sudo以管理权限执行命令的时候，linux将PATH环境变量进行了重置，解决办法就是建立正确命令的软连接

```shell
sudo ln -s /usr/local/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/node /usr/lib/node
sudo ln -s /usr/local/bin/npm /usr/bin/npm
sudo ln -s /usr/local/bin/node-waf /usr/bin/node-waf
```

### react 项目打包内存溢出

描述：执行 `npm run build` 之后，报错 `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`

解决: 修改打包命令 `"build": "node --max_old_space_size=4096 build/build.js"` 设置内存大小为4G

## Mac OS

### command

`cmd - Q` 关闭当前 app

`cmd - W` 关闭当前文件

`cmd - M` 最小化当前 app

`cmd - control - f` 全屏/退出全屏使用应用（如果应用支持）

`shift - cmd - .` 打开/关闭当前文件目录下的隐藏文件

`ctrl - ⬅️ || ➡️` 切换应用

`ctrl - ⬆️ || ⬇️` 在 Finder 中切换上下级目录

`cmd - space` 打开聚焦搜索spotlight

`ctrl - cmd - space` 打开 emoji

`ctrl - shift - G` 前往文件夹，比如 private/etc, private/var 等

`:terminal` 打开终端

在终端执行命令
- `open .`  打开当前目录文件
- `cd Desktop` 进入桌面目录

telnet
- `brew telent` 安装 telnet 服务， telnet命令用于登录远程主机，对远程主机进行管理，需要手动安装是由于telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务
- `telnet 122.51.215.237 21` 登录远程主机进程
- `close` 关闭当前连接
- `quit` 退出 


### 配置 zsh

`cat /etc/shells` 查看当前系统已安装的 shell

`brew install zsh` 安装 zsh

`echo $SHELL` 查看当前系统默认的 shell

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"` 安装 [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)，它是一个开源的，社区驱动的用来管理 zsh 配置的框架

之后可以通过 `brew --version` 查看 brew 是否安装成功，安装成功之后可以通过 `brew install [name]` 来安装相应的服务，并进行管理

安装完之后，发现之前 bash-shell 的命令在 zsh 内 not found，此时需要进行一些配置
- `open .zshrc` 打开 zsh 的配置文件
- 添加 `source ./bash_profile` 添加 bash 配置，保存后退出
- 执行 `source .zshrc` 使配置生效

### 解决系统占用100多G问题

查看 系统 -> 当前用户 -> 显示隐藏文件 -> 资源库，在资源库内进行查找，查看哪些大文件占用了系统内存

主要原因是 Xcode 的支持iOS版本、模拟器、已经打包的资源文件占用过高，通过 `cmd - shift - g` 前往目标文件夹

`iOS DeviceSupport -- ~/Library/Developer/Xcode/iOS DeviceSupport` 建议删除不常用的iOS版本

`iPhone Simulator -- ~/Library/Application Support/iPhone Simulator` iPhone 模拟器路径

`Archives -- ~/Library/Developer/Xcode/Archives` 打包生产的 Archives 文件

`DerivedData -- ~/Library/Developer/Xcode/DerivedData` 可重新生成；会删除build生成的项目索引、build输出以及日志，重新打开项目时会重新生成




## Windows

### question && answer

windows 10 下搜索栏搜索失效

[2019-05-10 update] 一个更棒的解决方案

1. 打开“服务”，找到 `window search`，查看其依存关系
2. 遍历每个依存关系，设置其启动为 **自动**

暂时解决办法解决，重启后会失效

1. `windows - x` 打开 windows powershell 管理员
2. 输入 `Get-AppXPackage -Name Microsoft.Windows.Cortana | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}`

### 文件共享给 Mac

1. 确保 windows 和 Mac 在同一局域网内
2. 在 Windows 下找到需要共享的文件夹，右键 **属性->共享->高级共享->共享此文件夹**
3. 在 Mac 内，**finder->前往->连接服务器->smb://windows's ip address**
4. 使用 Windows 账号和密码登录，就可以操作共享文件夹了


### Mac OS

`option - command - i` 打开控制台

`command - shift - b` 切换标签栏展示/隐藏

`option - command - b` 打开书签管理器

`option - command - ⬅️ || ➡️` 切换窗口


## Xcode

> Swift Project With Xcode

### Import a New Project

1. 选择正确分支，import
2. 登陆开发者账号

### Hotkey

`⌘ - L` 跳转至指定行

`⌘ - [` 左移一行或者多行代码

`⌘ - /` 注释

`⌘ - ,` 对编辑器样式，声音进行设置

`⌘ - R` 编译并运行项目

`⇧ - ⌘ - O` 快速查询文件，双击或者 enter 打开

`⌥ - ⌘ - F` 对当前文件指定内容进行替换

`⌥ - ⌘ - ← || →` 折叠或者展开代码

`⌥ - ⌘ - ⇧ - ← || →` 折叠或者展开全部函数方法

快速对项目内所有同名的变量进行**重命名**操作：在项目文件内选中需要重命名变量，[Editor -> Refactor -> Rename]

快速将项目内代码段抽成**独立方法**：在项目文件内选中代码块，[Editor -> Refactor -> Extract Method]，之后对抽离的方法进行重命名

### Create a new Xcode Project

1. 选择模版，其中 `cross-platform` 意味着可以为苹果移动设备、手表、电视和桌面四个平台创建游戏和应用
2. 选择模版之后，需要配置项目的基本信息，`Include UI Tests` 是界面测试框架，是一种新的方法来管理应用界面的测试工作，其允许对界面元素进行查找、交互、验证属性和状态
3. 接着选择项目的存放路径
4. Build && Stop 来编译运行和终止运行项目模拟器

### Set Project Properties

在 `Identity` 设置应用程序的名称，标志符，版本号和编译号

- `Display name` 设置应用程序在设备上显示的名称
- `Bundle Idetifier` 设置应用程序的唯一标志符，如果需要发布到 App Store，则需要和苹果管理后台创建的产品标志符保持一致
- `Version` 版本号
- `Build` 编译号，同一个版本号可以有不同的编译号，例如当一个版本在审核失败时，可以修改编译号，再次打包提交审核

`Deployment Info`

- `Deployment Target` 指定编译后的应用可以在哪些系统版本上运行，选择低版本可以适配更多的用户，但是可能无法使用一些新的接口
- `Devices` 选择发布后的程序在什么类型设备上运行，`Universal` 表示通用
- `Main Interface` 选择程序启动的主接口，即程序启动时，首先运行哪个故事版中的初始化视图控制器，系统提供两个选择：`Main.storyboard` 程序主视图，`launchScreen.storyboard` 启动主视图
- `Device Orientation` 设备朝向设置区，设置应用程序支持的设备方向，肖像模式，景观模式
- `Status Bar Style` 设置页面顶部的状态栏

### Debugger

在行号处单机来设置断点

直接拖动则可以移除该断点

通过 `po` 关键字在控制台打印关键信息

### Pannel

Xcode 控制面板介绍

#### Left Pannel

从左往右：

1. 文件结构
	- 右键/左下角➕，可以对文件进行操作
	- 一个比较新的概念：`Group`，在 Xcode 中，组并不是真实的文件夹，它在硬盘上并不存在，组是一个用来组织管理文件的虚拟概念
	- 下方 filter可以筛选文件，同时可以点击时间按钮来快速筛选近期编辑的文件，点击版本按钮来快速筛选处于版本控制状态的文件
2. 版本管理(类似gitbash)
3. 层级面板，展示项目内的类列表以及类下的方法，点击方法可以进行快速跳转
4. 搜索，允许通过关键字进行全局搜索
5. 状况面板，展示项目中的代码问题，黄色警告，红色错误
6. 测试面板，展示项目的测试用例
7. 调试面板，可以观察app运行时，设备的处理器，内存，硬盘读写以及网络请求状态
8. 断点，可以记录项目内的所有断点
9. 日志，记录当前项目所有的历史动作

#### Right Pannel

从左往右：

1. Library
2. 标准编辑器，编辑视窗代码区域为一块
3. 辅助编辑器，将代码区域切换为左右两个区域，再次点击可以对视窗的展示形式进行配置，例如左右，上下展示
4. 显示版本编辑器，可以查看代码的历史状态，提交信息和log
5. 编辑器左侧区域显示/隐藏
6. 编辑器底部区域显示/隐藏
5. 编辑器右侧区域显示/隐藏

### File Structure

以 DemoApp 为例

**DemoApp**

1. `AppDelegate.swift` 选择编辑应用代理文件。应用代理文件是系统运行应用的委托，定义如程序的生命周期（如进入和退出），设备屏幕旋转等全局方法
2. `ViewController.swift` 视图控制器，创建和管理视图，也可以监听设备方向的变化，并调整视图大小以适应屏幕，以及在模型和视图之间进行数据传递
3. `Main.storyboard` 故事板，用来展现所有视图控制器以及它们之间的关系，故事板同时也是适配多个分辨率设备的利器
4. `Assets.xcassets` 资源文件夹，用来方便进行图片管理，并且在加载图片时，不需要加上图片后缀，提高了软件的安全性，同时可以将图片都加密解压，并保存到 `Assets.car` 文件内，通过点击底部的 `+` 号
	- 选择 `import` 来引入一个资源
	- 选择 `New Folder` 来新建文件夹用于资源管理，通过拖拽将资源放进不同的文件夹内
5. `LaunchScreen.storyboard` 启动场景故事板，可以帮助您设计和适配程序的启动页
6. `Info.plist` 信息属性列表文件，存储项目配置信息，例如程序的版本号、显示用的图标、支持的设备方向等

**Products**

在产品目录中，存放项目编译后生成的文件包，可以在此生成适合发布到苹果市场的应用压缩包

### Simulator

创建一个 Project 后会产生一个模拟器，模拟器就是模拟正常设备

`⌘ - k` 快速调出/隐藏键盘

#### Hardware

用来模拟手机物理操作，值的注意的是：

1. `Erase All Content and Settings...` 还原按钮，将清除模拟器上所有的测试应用

#### File

当向苹果提交应用时，同时也需要提交应用的截图，所以需要对当前页面进行截图，快捷键为 `⌘ - s`，也可以选择 `File - New Screen Shot` 进行截图
