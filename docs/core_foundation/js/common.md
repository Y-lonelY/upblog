# JavaScript

## 变量提升

理解一个关键概念：**暂存死区**

- `var`声明被置于函数作用域的顶部，但是它们的赋值不是
- `const`和`let`在块作用域中，会被置于块头部的暂存死区，直至它们被初始化，在这期间，如果变量被访问（比如 typeof ），会直接抛出 ReferenceError 错误

```javascript
function test() {
  console.log(a); // => throws a ReferenceError
  console.log(b); // => undefined
  var b = 100;
  console.log(c); // => throws a ReferenceError
  const c = 100;
  let d;
  console.log(d); // => undefined
  d = 100;
}
```


## src && href

src(source) 用于替换当前元素，为**引入**，其值指向外部资源的位置，引入的内容会嵌入到文档中当前标签所在位置

- src 通常用于 `<img>`, `<script>`, `<iframe>` 标签内

- 当浏览器解析到含有属性 src 的元素时，会暂停其他资源的下载和处理，直到当前资源加载、编译、执行完毕

- 在 html 中，拥有 src 属性的元素是可以访问跨域资源的

href(Hypertext Reference) 超文本**引用**，其值也指向网络资源的位置，用于建立和当前元素（锚点）和当前文档（链接）之间的联系

- 如果浏览器识别引用文档为 css 文件，则会并行下载资源而不会停止对当前文档的处理


## 运算相关

### 操作符

使用 `+` 将变量转换为数字，但是其只适用于数字字符串，否则返回 NaN

使用 `+` 也可以作用于 Date，返回时间戳，`console.log(+new Date())`

使用 `!!` 将变量转换为布尔类型，只有 0、null、undefined、'' 以及 NaN 会返回 false，其他均返回 true

`1 && 2` 返回值为 2：原因在于在 `x && y` 的表达式中，先评估 x 值并将其解释为布尔值，如果布尔值为0，则直接返回 0 ，不用评估 y；但是如果 x 布尔值为 1，则继续评估 y 值，&& 操作符有趣在于，当表达式评估为真时，会返回表达式本身

### NaN

NaN（not a number）是数字类型

在 JavaScript 中，NaN 最特殊的地方在于，不能使用 == 或者 === 来判断一个值是否等于 NaN，因为 `NaN ==(=) NaN` 也会返回 false

`window.isNaN()` 方法会强制将非数字类型转换成数字类型，比如 `window.isNaN('1.2')` 会返回 false

相较之下，ES6 提出了一个更好的解决办法，即 `Number.isNaN()`，它不会对参数进行强制转换，只有当类型为数字，且值为 NaN 时才会返回 true

### 数学任务

Math对象用于执行数学任务，主要用于处理整数任务

```javascript
// 获取0-1之间随机数
Math.random() // 0.27407576343031925

// 返回数的绝对值（absolute）
Math.abs(-9) // 9

// 返回四舍五入的整数值
Math.round(1.6) // 2

// 返回向下取整的整数值
Math.floor(1.6) // 1

// 返回向上取整的整数值
Math.ceil(1.6) // 2

// 返回最大值，最小值 min 同理
Math.max(1, 2) // 2
// 如果需要返回数组内的最大值，可以通过ES6语法 `Math.max(...arr)` 或者通过 apply 方法 `Math.max.apply(null, arr)`
let arr = [1, 2, 3];
Math.max.apply(null, arr) // 3
Math.max(...arr) // 3
```


## window 对象


### addEventListener

JavaScript 通过 `addEventListener()` 来为元素添加事件，现对其最后一个参数 `useCapture` 来进行解析

`useCapture` 用来指示事件是在捕获阶段（true）还是冒泡阶段（false）执行

```js
window.addEventListener("click", function(){console.log(1)}, false);
window.addEventListener("click", function(){console.log(2)}, true);
window.addEventListener("click", function(){console.log(3)}, false);
window.addEventListener("click", function(){console.log(4)}, true);

// => 2, 4, 1, 3
```

对于有些事件，比如 `focus`, `blur` 等，无法进行冒泡，则此时可以设置 `useCapture=true` 来让其它同样事件也可以捕获到，从而触发方法

#### 不常用事件

场景：使用antd的Menu组件，需要监听浏览器前进/后退操作

由于获取菜单数据是一个异步过程，因此之前在`update()`方法内进行控制，但是这样的坏处在于无法监听到浏览器前进/后退的变化，因此更改了控制时机
- 通过 `watch: {menu () {...}}` 来执行获取到menu之后的控制
- 通过 `window.addEventListener("hashchange", () => {})` 来触发浏览器操作引起的路由变化



### Scroll

scroll 处理浏览器 sider 滚动

```javascript
// window 为窗口对象，可以是替换成其他dom元素
// 跳转到指定定位，类似绝对定位
window.scrollTo(x,y)

// 把内容相对当前位置滚动指定的像素数，类似相对定位
window.scrollBy(right, bottom)

// 返回滚动的高度/宽度，返回一个浮点数类型
window.scrollY, window.scrollX

// 返回可检查可见行的滚动条对象，通常利用其 visible 来判断其滚动条是否可见
window.scrollbars -> {visible: true}

// scroll 事件监听，兼容IE&&chrome
window.onmousewheel = document.onmousewheel = function(){...};

// scroll 事件监听，兼容 fireFox
document.addEventListener('DOMMouseScroll', function(){...}, false);
```

### Url

通过 `window.location ` 获取当前页面 url 的相关信息。以 `https://github.com/YLoNe666` 为例

```javascript
window.location.href -> "https://github.com/YLoNe66"
window.location.host -> "github.com"
window.location.origin -> "https://github.com"
window.location.href -> "https://github.com/YLoNe66"
window.location.pathname -> "/YLoNe666"
```
