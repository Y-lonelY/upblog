# Basic

> React 基础知识和概念


## 组件

::: tip
组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思
:::

组件声明：

- 组件本质上是一个函数对象，所以可以通过函数式来声明或者通过ES6的 class 来创建
- 使用类来创建就允许我们使用其它特性，例如局部状态、生命周期钩子
- 组件名称必须以大写字母开头
- 组件返回值只能有一个根元素，因此组件在创建时一般用一个 `<div>` 标签来包裹
- 注意所有的React组件必须像纯函数那样使用它们的props，这意味着 props 获取的属性值是只读的

```javascript
// 一个 react 的组件模版
import React, { Component } from "react";

class Test extends Component {
	// 添加状态
	constructor(props) {
		super(props);
		this.state = {
			// javascript object
		}
		this.handleClick = this.handleClick.bind(this)
	}

	// 纯函数，返回渲染内容
	render() {
		// some deals
		return (
			<div>
			// dom element
			</div>
		)
	}

	// 组件被插入到 dom 结构中
	componentDidMount() {
		// statement
	}

	/**
	 * 组件发生更新之后，重新渲染完成
	 * 首次渲染不会执行
	 * 需要在条件语句内调用 setState 方法，避免死循环
	 */
	// 
	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			// this.setState(...)
		}
	}

	// 组件从 dom 结构中移除，此时不能够调用 setState()，因为该组件永远不会重新渲染
	componentWillUnmount() {
		// statement
	}

	// 一个使用场景就是，当我们接受到新的props时，想去修改原 state 时
	static getDerivedStateFromProps(nextProps, prevState) {
    	if (nextProps.currentRow !== prevState.lastRow) {
	        return {
	            isScrollingDown:
	            nextProps.currentRow > prevState.lastRow,
	            lastRow: nextProps.currentRow
	        }
	    }
	    return null
	}
}

export default Test
```

### constructor

组件内的构造函数，有几点需要特别注意：

- 用来初始化组件，在其内部进行 state 初始化，来避免调用 setState() 而触发的额外渲染
- constructor 内必须调用 `super(props)`，否则无法使用 `this` 对象，它用来调用基类的构造方法，同时将父组件的 props 注入到子组件内
- 如果不初始化 state 或者不进行方法绑定，则不需要为组件实现其构造函数

### 组件的生命周期

React 的生命周期经过了一次迭代，这里记录 React V16 之后的版本

![React生命周期](../assets/react-life.png)

React 生命周期分为三个阶段：

1. 挂载阶段，可以理解成组件初始化阶段，即将组件插入到DOM中，只会发生一次
2. 更新阶段，当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会多次发生
3. 卸载阶段，组件被卸载或者销毁时调用，可以去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作，此时调用 setState() 不会生效

在**挂载阶段**，其生命周期函数调用：

- constructor
- static getDerivedStateFromProps
- render，纯函数，返回渲染内容
- componentDidMount，存放业务逻辑，组件装载之后调用，此时可以获取到DOM节点并操作

在**更新阶段**，其生命周期函数调用：

- static getDerivedStateFromProps
- shouldComponentUpdate，返回布尔值来表示是否需要更新组件，当调用 forceUpdate 并不会触发此方法
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

在**卸载阶段**，其生命周期函数调用：

- componentWillUnmount

**getDerivedStateFromProps(nextProps, prevState)** 是一个静态方法，所以不能使用 this，其有两个参数，返回一个对象来更新当前的 state，如果不需要更新则返回 null

- `nextProps` 指接收到的新参数
- `prevState` 指当前的 state 对象
- 根据图示可以看出，其在 constructor, New props, setState(), forceUpdate() 之后调用
- 一个使用场景就是，当我们接受到新的props时，想去修改原 state 时

### 组件通信

- 父组件使用子组件方法，将子组件 this 作为参数传递给父组件，父组件通过 `this.child` 来挂载
- 子组件使用父组件方法，直接将父组件定义好的方法传递给子组件，子组件通过 `this.props` 来访问方法
- 兄弟组件之间通信，将数据挂载至其最近父组件上来进行访问

除此之外，还可以利用第三方库，比如 redux 来对系统内通信进行统一管理

```javascript
// 子组件
class Child extends Component {
	componentDidMount() {
	   this.props.onRef(this);
  	}
  	...
}

// 父组件
class Parent extends Component {
	onRef = (ref) => {
	   this.child = ref;
	}

	// 调用
	submit = () => {
	    // this.child...
	 }

	render() {
		return (
			<Child onRef={ this.onRef }>
		)
	}
}
```

## 事件绑定

直接绑定到 JSX 元素上，类似 dom 元素事件绑定，传入一个函数方法而不是一个字符串

camelcase，即（`onClick` 而不是 `onclick`）

不能通过 `return false;` 来阻止元素的默认行为（比如 `<a>` 标签），而是通过 `e.preventDefault()` 来实现

### bind this

通常情况下，如果你没有在方法后面添加 `()`，则需要为该方法绑定 `this`

在 ES6 中，class 是不会默认绑定 `this` 的，有三种方法为其绑定：

通过 ES6 的箭头函数

```javascript
class EventHandle extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
		// data 为传参，可不传
      <button onClick={(e) => this.handleClick(data, e)}>
        Click me
      </button>
    );
  }
}
```

2. 通过 `bind()` 方法，利用 `function.prototype.bind` 方法

- 在 constructor 内通过 bind 绑定 this
- 元素内直接绑定 this

```javascript
class EventHandle extends React.Component {
  constructor(props) {
    super(props);
    // 在 constructor 内通过 bind 绑定 this
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    onsole.log('this is:', this);
  }

  render() {
    return (
    	// 或者直接绑定 
    	// <button onClick={this.handleClick.bind(this, data)}>
    	// data 为传参，可选
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

通过实验方法来绑定，`creat-react-app` 内默认使用

```javascript
class EventHandle extends React.Component {
  // 这个语法保证 this 绑定到 handleClick 方法上
  // Warning: 试验性方法
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```