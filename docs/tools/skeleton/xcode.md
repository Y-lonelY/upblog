# Xcode

> Swift Project With Xcode

## Import a New Project

1. 选择正确分支，import
2. 登陆开发者账号

## Hotkey

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

## Create a new Xcode Project

1. 选择模版，其中 `cross-platform` 意味着可以为苹果移动设备、手表、电视和桌面四个平台创建游戏和应用
2. 选择模版之后，需要配置项目的基本信息，`Include UI Tests` 是界面测试框架，是一种新的方法来管理应用界面的测试工作，其允许对界面元素进行查找、交互、验证属性和状态
3. 接着选择项目的存放路径
4. Build && Stop 来编译运行和终止运行项目模拟器

## Set Project Properties

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

## Debugger

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

### Right Pannel

从左往右：

1. Library
2. 标准编辑器，编辑视窗代码区域为一块
3. 辅助编辑器，将代码区域切换为左右两个区域，再次点击可以对视窗的展示形式进行配置，例如左右，上下展示
4. 显示版本编辑器，可以查看代码的历史状态，提交信息和log
5. 编辑器左侧区域显示/隐藏
6. 编辑器底部区域显示/隐藏
5. 编辑器右侧区域显示/隐藏

## File Structure

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

## Simulator

创建一个 Project 后会产生一个模拟器，模拟器就是模拟正常设备

`⌘ - k` 快速调出/隐藏键盘

### Hardware

用来模拟手机物理操作，值的注意的是：

1. `Erase All Content and Settings...` 还原按钮，将清除模拟器上所有的测试应用

### File

当向苹果提交应用时，同时也需要提交应用的截图，所以需要对当前页面进行截图，快捷键为 `⌘ - s`，也可以选择 `File - New Screen Shot` 进行截图

