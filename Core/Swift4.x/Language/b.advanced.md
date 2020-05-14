<!-- MarkdownTOC levels="1,2,3" -->

- [Function](#function)
	- [声明和调用](#%E5%A3%B0%E6%98%8E%E5%92%8C%E8%B0%83%E7%94%A8)
	- [形参和返回值](#%E5%BD%A2%E5%8F%82%E5%92%8C%E8%BF%94%E5%9B%9E%E5%80%BC)
	- [实参](#%E5%AE%9E%E5%8F%82)
	- [Function Types](#function-types)
- [Closures](#closures)
	- [Closure Expressions](#closure-expressions)
	- [捕获值](#%E6%8D%95%E8%8E%B7%E5%80%BC)
	- [逃逸闭包](#%E9%80%83%E9%80%B8%E9%97%AD%E5%8C%85)
	- [🌝自动闭包](#%F0%9F%8C%9D%E8%87%AA%E5%8A%A8%E9%97%AD%E5%8C%85)
- [Type Casting](#type-casting)
	- [Any && AnyObject](#any--anyobject)

<!-- /MarkdownTOC -->


> Recording Swift Advanced Features


## Function

函数是一个独立的代码块，用来执行特定的任务

### 声明和调用

1. 通过 `func` 关键字来声明函数
2. 每个函数都有一个函数名，用来描述函数执行的任务
3. 函数形参通过 Tuples 来装载，并且在声明时定义好返回值的类型
4. 实参传递的顺序必须和函数声明时形参的顺序一致
5. 通过 `->` 来连接形参和返回值类型

```Swift
func callName(name: String) -> String {
	return "hello \(name)!"
}

// "hello yh!"
print(name: "yh")
```

**内嵌函数**

即在函数体内，定义新的函数，一般来说，外部无法访问，但是可以将内嵌函数 return 出来（即作为返回参数），来供外部进行访问

### 形参和返回值

根据形参个数可以分为: 无形参函数和多形参函数

同理根据返回值个数分为: 有返回值函数和多返回值函数

函数形参和返回值的关键在于：**元组**

在函数声明时，可以为形参设置默认值，在调用的时候，可以不用传递对应的实参，在 Swift 内，一般无默认值的形参放在前面，这样可以保持优雅的可读性

可以在声明形参时，在形参类型后添加 `...` 来标记该形参为可变形参（即可以接受任意多个个值），**一个函数最多只能有一个可变形参**

**输入输出形式参数**

- 比较新颖的一点特性，函数能够修改传参，效果就是变量在函数外声明，将变量作为传参调用函数后，变量被修改
- 在形参定义的时候，在形参类型之前添加 `inout` 关键字
- 在调用时，通过在传参前添加 `&` 来表明该**变量**（注意通过 var 来声明变量）可以被函数修改

**注意**

1. 无形参函数，仍然需要在函数名后添加 `()`，即所有函数的函数名后都必须有 `()`
2. 如果函数无返回值，则在声明时，不用添加 `->` 和返回值类型
3. 多返回值的函数
	- 使用元组作为返回数据类型
	- 返回元组可以添加 `?`，用来返回 nil（表示可能没有返回值）
	- 注意：`(Int, Int)?` 不同于 `(Int?, Int?)`，前者表示整个元组可能没有值，后者表示可能元组内的值可能为空
	- 元组的成员值不必在函数返回元组的时候命名，因为它的名字已经在函数的返回类型部分被定义
4. 如果整个函数体是一个单一表达式，则函数隐式返回这个表达式

### 实参

在函数声明时

- 函数的形参 = 函数的实参标签 + 函数的形参名
- 默认情况下不必自定义函数的实参标签，形参使用形参名作为实参标签
- Swift 也支持自定义实参标签，通过空格和形参名来分隔
- 用 `_` 定义实参标签，来表明调用是不需要实参标签

在函数调用时，每一个实参前面都需要写明函数的实参标签（除了用 `_` 标记的情况）

实际函数标签的使用能够让函数的调用更加明确，贴近自然语句，同时具有更好的可读性

### Function Types

1. 每一个函数都有一个特定的函数类型，它由形参加返回类型组成，可以简单将函数类型理解为一种自定义的数据类型

2. 比如 `func test(_ name: String) -> String {}`，则这个函数类型抽象出来就是 `(String) -> String`，表示：

> 有一个形参的函数类型，它的形参类型是 String，并且返回 String 类型的值

3. 可以利用函数类型来将函数赋值给一个变量（或者常量），`let test: (Int, Int) -> Int = testFunc`，表示：

> 定义一个 test 变量，它的数据类型是“有两个形参的函数类型，该函数的形参类型都是 Int，并且返回 Int 类型的值的函数”

4. 可以将函数作为形参传递，与之对应的就是，形参类型即为函数类型

5. 同样，可以将函数作为返回值进行传递，类似 JavaScript 内回调函数的概念，区别在于需要在声明时，显示声明返回的函数类型


## Closures

闭包是代码中可以传递和引用的功能性独立模块

闭包可以捕获和存储在其上下文中任何常量和变量的引用

- 全局函数是一个有名字但不会捕获任何值的闭包
- 内嵌函数是一个有名字，且能从上层函数捕获值的闭包
- 闭包表达式是一个新概念，没有名字，且可以捕获其上下文中常亮和变量值

类似 JavaScript 的闭包概念，可以结合 `Context`(上下文)及作用域来理解

### Closure Expressions

闭包表达式是一种在行内就能写完闭包的简短语法

一般来说，类似 JavaScript 的回调函数，将函数作为参数进行传递，在 Swift 内针对这种情况，做了很棒的优化，即通过闭包表达式，能够通过更加简洁的代码实现同样的效果

以 `sorted(by: )` 函数来进行说明

```Swift
// 闭包表达式，以 sorted(by:) 为例
let arr = [1, 5, 2, 4, 3]
// 声明排序函数
func sortFunc(_ v1: Int, _ v2: Int) -> Bool {
    return v1 > v2
}

// 类似 JavaScript 方法，通过函数回调来提供排序闭包
// [5, 4, 3, 2, 1]
var sortArr = arr.sorted(by: sortFunc)

// 利用闭包表达式来简化上面的排序闭包，类似 JavaScript 的匿名回调，注意使用 `in` 关键字
// [1, 2, 3, 4, 5]
sortArr = arr.sorted(by: {(_ v1: Int, _ v2: Int) -> Bool in return v1 < v2})

// 因为排序闭包为实际参数传递给函数，所以可以利用 Swift 的类型推断进行进一步的简化
// 同时，如果函数体为单一表达式，可以省略 return
// [5, 4, 3, 2, 1]
sortArr = arr.sorted(by: {v1, v2 in v1 > v2})

// 不仅于此，Swift 自动对行内闭包土工简写实际参数名，可以利用 `$0, $1` 等来表示实参
// 基于此，可以忽略对实参的定义，同时省略 in 关键字
// [1, 2, 3, 4, 5]
sortArr = arr.sorted(by: {$0 < $1})

// 更过分的是，由于运算符可以返回一个布尔值，所以简单传递一个运算符，Swift 也能够推断出闭包
// [5, 4, 3, 2, 1]
sortArr = arr.sorted(by: >)
print(sortArr)
```

根据实际情况来看闭包表达式能够简化到何种程度，几个注意点：

1. 闭包表达式语法 `{ (params) -> (return type) in statements }`
2. 形参不能设置默认值，可变形参需要放在最后

**尾随闭包**

尾随闭包是用于处理闭包表达式的内容较多（或者逻辑比较复杂）时，将闭包放在函数形参后面，来增强代码的可读性，例如 `arr.sorted() {$0 < $1}`

在尾随闭包中，如果闭包表达式作为函数的唯一实参传入，可以省略 `()` 的书写

闭包是引用类型，这意味着你可以将闭包赋值给不同的变量

闭包的一个常用的写法：

```Swift
// 常用写法
func closure_case(handler: () -> Void) {
	handler()
}

// 闭包表达式基本写法
func closure_case({ (handler: () -> Void) -> Void in
	return handler()
})
```

上述例子读做：声明一个 closure_case 的函数，其能够接受一个形参不限且返回值不限的函数作为参数，并执行传递函数

### 捕获值

一个闭包能够从上下文捕获已被定义的常量或者变量，类似 JavaScript 的作用域的概念

作为一种优化，如果一个值没有改变或者在闭包的外面，Swift 可能会使用这个值的拷贝而不是捕获

### 逃逸闭包

当闭包作为实参传递给一个函数时，则这个闭包可以在函数返回后再被调用，此时该闭包称为**逃逸闭包**，例如将接收到的闭包存放到一个变量内，则此时该闭包逃逸

我的理解就是：如果一个闭包作为参数传递，没有在函数内立即调用，则该闭包逃逸

逃逸闭包通过 `@escaping` 关键字来声明

### 🌝自动闭包


## Type Casting

Swift 中类型转换主要用到 `is` 和 `key` 两个关键字

理论上，在 Swift 内，定义一个类实际上就是定义了一种数据类型，并且子类会被推断为父类的数据类型

1. 使用类型检查操作符 `is` 来检查一个实例是否属于一个特定的子类，返回值为 Bool

2. 某个变量可能是一个子类的实例，此时可以通过 `as？` 或者 `as!` 来将其向下转换为至其子类型，区别在于前者返回可选项，后转进行强制转换

例如，一个玩家可能是低端玩家也可能是高端玩家，这时可以通过 `as` 来检查其向下类型转换

**类型转换不会修改实例，只是将它作为要转换的类型来访问**

### Any && AnyObject

Swift 为不确定的类型提供了两种特殊的类型别名：

- AnyObject 可以表示任意类类型的实例
- Any 可以表示任何类型，包括函数类型