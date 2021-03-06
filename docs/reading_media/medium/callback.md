# Callbacks In JavaScript

![callback](../assets/callback.jpg)

> **Callbacks in JavaScript is everywhere!**

本文要点:

- 什么是回调
- “回调地狱”
- 如何优雅地解决回调地狱



## Callbacks

如果说 “有人的地方就有江湖”, 那么在 JavaScript 中, “有交互的地方就有回调”

在日常开发中, 最常见的页面加载完毕的 `onload` 事件, 通用的鼠标点击事件, 都离不开回调的影子. 

我这样来定义回调, **回调是用来处理交互后事件的执行代码块, 函数可以理解成一种交互的抽象**

我们从一个简单的例子来理解:

这里, 我希望能够实现异步加载脚本

```javascript
function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
```



我们假定`hello.js` 内有 `sayHello()` 的一个方法, 我们需要执行该方法:

```javascript
// load and run the script
loadScript('hello.js')
// no such function
sayHello()
```



如果按照上面的方式, 很明显会执行失败,因为 `sayHello()` 并不会等到 `hello.js` 加载并执行完毕后才会执行

如果希望它能够正确发生,正确的做法是在脚本准备就绪之后再执行其方法,修改脚本之后如下:

```javascript
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = function () { return callback && callback(script); };
    document.head.appendChild(script);
}

// ok, it works
loadScript('hello.js', () => { sayHello() })
```



上面就是针对回调最通用的解释, `loadScript()` 可以看作是一个高度抽象的交互, 可以细品一下这



## Callback Hell

“回调地狱”在 NodeJs 内发扬光大, 其实在 JavaScript 内也不新鲜, 一句话来解释就是 `callback in callback`(嵌套!)

看看下面这个例子:

```javascript
// 我们需要按照顺序加载若干个脚本, 最后执行一个特定的方法
loadScript('hello.js', () => {
  loadScript('world.js', () => {
    laodScript('byebye.js', () => {
      // loop and loop, callback and callback
      sayHello()
    })
  })
})
```



🙉一些碎碎念: 这样子的代码, 没有丝毫的可读性和维护性, 也不够优雅, “just shit code”. 大家在开发过程中应该尽量避免生产类似代码, 最最最简单的, 起码可以通过命名函数来封装每一次回调的内容!



## Promise

那么如何优雅地解决回调地狱呢, 版本答案 `Promise`

**Promise** 在 ES6 内被引用用来处理异步操作, 顺带解决了回调地狱, 这里不再对其进行赘述

利用 **Promise**, 对 `loadScript()` 进行进一步的改写, 并且以 Promise 的方式来实现上面的脚本调用

```javascript
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () { return resolve(script); };
        script.onerror = function () { return reject(new Error(src + " fail to load")); };
        document.head.appendChild(script);
    });
}

loadScript('hello.js')
  .then((hello) => { return loadScript('world.js') })
	.then((world) => { return loadScript('byebye.js') })
	.then((byebye) => { sayHello() })
	.catch((error) => { console.error(error.message) })
```



既然已经提到了 `Promise`, 我们不妨将知识点再延伸一些, 了解下 **async and await**

**await** 是 Promise 的语法糖, 通过配合 **async** 来使用, 看看如果用这“两兄弟”来改写上面的例子

```javascript
(async () => {
  await loadScript('hello.js')
  await loadScript('world.js')
  await loadScript('byebye.js')
  sayHello()
})()
```

`async/await` 拥有更加简洁的语法, 同时让整个代码看起来更加自然的发生!



**Thanks for you reading, solo with code!**