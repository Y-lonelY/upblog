(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{264:function(t,s,n){t.exports=n.p+"assets/img/eventLoop.e4ad3e22.png"},313:function(t,s,n){"use strict";n.r(s);var a=n(38),e=Object(a.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"javascript"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript","aria-hidden":"true"}},[t._v("#")]),t._v(" JavaScript")]),t._v(" "),a("h2",{attrs:{id:"执行机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行机制","aria-hidden":"true"}},[t._v("#")]),t._v(" 执行机制")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[t._v("JavaScript是一门单线程语言，事件循环（Event Loop）是 JavaScript 的执行机制")])]),t._v(" "),a("p",[t._v("在实际开发过程中，会经常用到")]),t._v(" "),a("p",[t._v("由于JavaScript引擎是单线程机制，它无法执行多段代码，当一段代码执行的时候，所有后续任务必须等待，从而形成一个任务队列。一旦当前任务完成，再从队列中取出下一个任务执行，这也被称为 ‘阻塞式执行’")]),t._v(" "),a("img",{attrs:{src:n(264)}}),t._v(" "),a("ul",[a("li",[a("code",[t._v("setTimeout()")]),t._v(" 设置的延迟参数是从 EventTable 中注册回调函数到 EventQueue 的时延，所有"),a("strong",[t._v("执行其回调函数的时延 >= 其设置的时延")])]),t._v(" "),a("li",[t._v("即使主线程执行栈为空，0ms 实际上也是达不到的，根据HTML标准，最低是 4ms")]),t._v(" "),a("li",[a("code",[t._v("setInterval()")]),t._v(" 会每隔指定的时延将回调函数注册进入 EventQueue 中，一旦 "),a("code",[t._v("setInterval")]),t._v(" 的回调函数的执行时间超过其设置的延迟，那么完全看不出来有时间间隔")]),t._v(" "),a("li",[t._v("除了广义的同步任务和异步任务，任务还有更加精细的定义\n"),a("ul",[a("li",[t._v("macro-task(宏任务)：正常执行script、setTimeout()、setInterval()")]),t._v(" "),a("li",[t._v("mirco-task(微任务)：Promise、process.nextTick(类似node.js版的setTimeout，其回调函数在事件循环的下一次循环中调用)")])])])]),t._v(" "),a("p",[t._v("整体script作为第一个宏任务执行结束，会在 EventQueue 中检查还有哪些微任务，并对其依次执行，至此完成第一次 EventLoop，然后再在 EventQueue 内检查宏任务，进行 EventLoop")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 同步任务")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 整体作为一个异步任务")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'5'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'7'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'6'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'8'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 异步任务-微任务，在下一次循环内执行")]),t._v("\nprocess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 微任务-微任务")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'4'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出结果")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 即 Promise > nextTick > Promise.then")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br")])]),a("h2",{attrs:{id:"渲染关键路径"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#渲染关键路径","aria-hidden":"true"}},[t._v("#")]),t._v(" 渲染关键路径")]),t._v(" "),a("p",[t._v("浏览器接收到服务器封装并返回的字节数据，将其进行解析并转换为像素的过程被称为渲染关键路径")]),t._v(" "),a("p",[t._v("缩短浏览器页面渲染时间的一个思路就是缩短渲染关键路径")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("处理HTML标记数据并生成DOM树")])]),t._v(" "),a("li",[a("p",[t._v("处理CSS标记数据并生成CSSOM树")])]),t._v(" "),a("li",[a("p",[t._v("将DOM数和CSSOM树合并生成渲染树")])]),t._v(" "),a("li",[a("p",[t._v("遍历渲染树，计算每个节点的位置信息，进行布局")])]),t._v(" "),a("li",[a("p",[t._v("将每个节点绘制到屏幕")])])]),t._v(" "),a("p",[t._v("以上的步骤是一个"),a("strong",[t._v("渐进")]),t._v("的过程，为了提高用户体验，渲染引擎会试图更快呈现渲染结果，这意味着它不会等到所有的HTML文件都被解析完才创建并布局渲染树，它会将先获得的文档内容进行渲染（注意要生成渲染树）")]),t._v(" "),a("p",[t._v("DOM树的构建过程是一个深度优先遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点")]),t._v(" "),a("p",[t._v("DOM（Document Object Model）文档对象模型，用来描述文档的结构与内容")]),t._v(" "),a("p",[t._v("CSSOM（Cascading Style Sheets Object Model）层叠样式表对象模型，用来描述对文档应用的样式规则")]),t._v(" "),a("p",[t._v("浏览器将字节数据解析成树结构（CSSOM以及DOM树）的过程：字节数据(Bytes) > 语义化字符(Characters) > 令牌(Token) > 节点对象(Nodes) > 对象模型(DOM)")]),t._v(" "),a("p",[t._v("在 chrome 中可以利用开发者工具的 "),a("code",[t._v("performance > Event log")]),t._v(" 来观察一个页面的渲染细节")]),t._v(" "),a("p",[t._v("想要渲染出页面，就需要将DOM树和CSSOM树结合起来，生成渲染树。浏览器会从DOM树的根节点开始遍历每个可见节点（注意"),a("code",[t._v("display:none")]),t._v("和"),a("code",[t._v("visibility:hidden")]),t._v("区别，前者不渲染，后者渲染），并找到其对应的CSS样式规则")]),t._v(" "),a("p",[t._v("结合盒子模型，计算每个节点在窗口内的确切位置和大小，也就是布局阶段，布局阶段输出的是一个盒子模型，它会精确捕获每个元素在屏幕内的确切位置和大小，所有相对的测量值也会被转换为屏幕内的绝对像素值")]),t._v(" "),a("h2",{attrs:{id:"在浏览器输入-url-的执行过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在浏览器输入-url-的执行过程","aria-hidden":"true"}},[t._v("#")]),t._v(" 在浏览器输入 URL 的执行过程")]),t._v(" "),a("p",[t._v("URL 结构：")]),t._v(" "),a("ul",[a("li",[t._v("scheme: 通信协议，比如 https 等")]),t._v(" "),a("li",[t._v("host: 主机地址")]),t._v(" "),a("li",[t._v("port: 端口号，用来标志进程")]),t._v(" "),a("li",[t._v("path: 虚拟文件路径，说明资源位于服务器什么地方")]),t._v(" "),a("li",[t._v("query: 查询参数")]),t._v(" "),a("li",[t._v("hash: 信息片段字符串，锚点部分")])]),t._v(" "),a("p",[t._v("明确一个概念，一个 URL 就是一个特定资源，该资源可能需要引用多个其他资源作为支撑")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("服务端交互获取渲染对象")]),t._v(" "),a("ul",[a("li",[t._v("HTTP")]),t._v(" "),a("li",[t._v("TCP 三次握手")]),t._v(" "),a("li",[t._v("请求/响应报文结构")]),t._v(" "),a("li",[t._v("Cookie")]),t._v(" "),a("li",[t._v("代理服务器")])])]),t._v(" "),a("li",[a("p",[t._v("通过浏览器渲染指定的资源文件")]),t._v(" "),a("ul",[a("li",[t._v("渲染关键路径")]),t._v(" "),a("li",[t._v("重绘和回流")])])])])])},[],!1,null,null,null);s.default=e.exports}}]);