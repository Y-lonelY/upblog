# Cluster

> 用来记录在使用Swift4进行实际开发过程中遇到的综合性较强的方案实现

## System

:::tip
记录系统相关问题
:::

### 通过 Xcode 来检查当前手机的 log

1. 打开Xcode，手机连接至 Mac
2. `Window > Device and Simulator`
3. 点击 `open console`

![console board](../assets/console.png)

### 为 App 启动页设置图片展示

1. 在 `app > general` 内，设置 App Icons and Launch Images 选项

![launchSetting](../assets/launchSettings.png)

2. 在 Assets.xcassets 资源文件内添加相应的启动页图片
3. 点击进入 LaunchScreen.storyboard，点击 `view`
4. 点击右上角 `Library` 图标，输入 `image`，选择 `ImageView`，并拖入视图区域
5. 选择刚刚拖入的 ImageView，点击右上角 `Size` 图标，设置其尺寸，点击右上角 `Attributes` 图标，选择图片
6. 重启app

### 点击 Today widgets，跳转到 app 内指定页面

主要利用以下 api 来进行实现：
- `self.extensionContext?.open(URL(string:), completionHandler: {...})`
- `func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool{...}`

下面介绍具体的代码实现：

`TodayServiceViewController` 用于监听点击事件，拼接并传递URL

```swift
/**
 * 用于承载点击事件，添加事件监听
 * 下面列举关键代码
 */
override func viewDidLoad() {
    super.viewDidLoad()
    // statement
    NotificationCenter.default.addObserver(self, selector: #selector(self.openUrlContainingApp), name: NSNotification.Name(rawValue: "GameDidSelect"), object: nil)
}

// 跳转的关键方法，通过 url 来传递参数
@objc func openUrlContainingApp() {
    self.extensionContext?.open(URL(string: "xxx://rank?\(TodayService.selectedGame!.gameId)")!, completionHandler: { success in
        print(success)
    })
}

// 点击 tableCell 后 post 事件
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let game = data[indexPath.row]
    TodayService.selectedGame = game
    NotificationCenter.default.post(name: Notification.Name(rawValue: "GameDidSelect"), object: nil)
}
```

`AppDelegate` 内用于接受 URL 并执行相应的操作，将重定向的 URL 信息进行缓存

```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    var redirect = url.absoluteString
    // 如果以指定字符串开头，则将其进行格式化处理
    if redirect.hasPrefix("xxx://") {
        redirect.replaceFirst(matching: "xxx://", with: "")  
        MainService.redirectTo = redirect
    }
}
```

`TabViewController` 在 viewWillAppear 方法内根据有无 MainService.redirectTo 来执行相应的重定向操作

```swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    
    // statement
    if !MainService.redirectTo.isEmpty {
        if MainService.redirectTo.hasPrefix("rank") {
            self.selectedViewController = self.viewControllers![0]
            // 如果需要重定向到具体的详情页，则可以继续进行相应处理，这里不再展开
            if MainService.redirectTo.contains("?") {
                let currentValue = MainService.redirectTo.components(separatedBy: "?")[1]
                MainService.redirectGameId = currentValue
            }
        }
    }
}
```


## DarkMode

适配iOS13新增的dark模式特性，适配主要基于：

- color，系统已经适配了颜色（即不设置颜色时），同时支持自定义动态颜色
- image，支持系统图标的切换，同时支持自定义的动态图标
- 监听模式变化，从而触发自定义事件
- 为模式变化添加 log

**获取当前模式**

在 UIView 或者 UIViewController 内通过 `traitCollection.userInterfaceStyle` 返回当前的模式，其值对应一个枚举

```swift
// userInterfaceStyle 是一个枚举，声明如下
public enum UIUserInterfaceStyle: Int {
	case unspecified
	case light
	case dark
}

/**
 * UIColor
 * 在 iOS13 之前，仅支持一种颜色，但是之后，提供一个回调方法，用来动态设置颜色
 */
var backColor: UIColor!
let label = UILabel()
backColor = UIColor(dynamicProvider: { (trainCollection) -> UIColor in
    if #available(iOS 13.0, *) {
        if UITraitCollection.current.userInterfaceStyle == .dark {
            return UIColor.black
        } else if UITraitCollection.current.userInterfaceStyle == .light {
            return UIColor.white
        }
    }
})
label.textColor = backColor

/**
 * 监听模式变化
 * 只会在当前 viewController 内触发，不会影响其他的 viewController
 * 在app进入后台和激活时都会触发该事件，且不会正确处理其darkmode，因此需要一个阀门来控制是否监测该事件
 */
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)
    if #available(iOS 13.0, *) {
        if traitCollection.hasDifferentColorAppearance(comparedTo: previousTraitCollection) {
            self.renderWithTheme()
        }
    }
}
```

**图片适配**

![dark模式适配](../assets/darkImage.png)

**添加log**

在 `Product > Scheme > Edit Scheme > Run > Arguments Passed On Launch` 设置 `-UITraitCollectionChangeLoggingEnabled YES` 



## EventBind

::: tip
为控件添加自定义事件
:::

### 为UIImageView等无事件视图添加事件绑定

有些视图本身是不能直接通过 `addTarget()` 来添加方法的，要为此类视图添加方法，一个解决思路是为其添加手势控制

```Swift
// isUserInteractionEnabled 确定忽略用户事件并从事件列队中删除
deleteIconView.isUserInteractionEnabled = true

// 定义手势控制
let singleTap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(clearUserTextInput(_:)))
// numberOfTouchesRequired 触发事件需要的手指数
singleTap.numberOfTapsRequired = 1

// 为icon添加点击事件
deleteIconView.addGestureRecognizer(singleTap)
```


## KeyBoard

::: tip
记录**键盘**相关问题
:::

### UITextField 点击空白处隐藏键盘

UITextField 在获取焦点时会自动弹起键盘，此时点击空白处不会让其失去焦点，因此需要手动添加事件来控制当前空间失去焦点

一个思路是，在触摸开始时取消指定控件作为第一响应者（即失焦）

`resignFirstResponder` 通知此对象已要求它在其窗口中放弃作为第一响应者的状态

```Swift
override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
	super.touchesBegan(touches, with: event)
    textField.resignFirstResponder()
}
```

特殊情况的处理：如果在输入框内自定义了一些 icon 来行使某些功能，点击时会先触发重写的 `touchesBegan` 方法，如果要避免某些视图的冒泡场景，一个解决思路就是，重写该视图类的 `touchesBegan` 方法来达到阻止冒泡的行为

```Swift
class UIImageViewWithoutTouchToSuper: UIImageView {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        // 什么都不做，则不会触发任何事件
    }
}
```

### 全局监听键盘弹起事件

常用的键盘监听事件

- 键盘将要弹出 `UIResponder.keyboardWillShowNotification`
- 键盘将要隐藏 `UIResponder.keyboardWillHideNotification`
- 键盘弹出后立即触发 `UIResponder.keyboardDidShowNotification`
- 键盘隐藏后立即触发 `UIResponder.keyboardDidHideNotification` 

```Swift
// 添加观察者，监听键盘即将弹出事件
NotificationCenter.default.addObserver(self, selector: #selector(keyBoardWillShow(note:)), name: UIResponder.keyboardWillShowNotification, object: nil)

// 定义键盘将要弹起时执行事件
@objc func keyBoardWillShow(note: Notification) -> Void {
	// statement
}
```
