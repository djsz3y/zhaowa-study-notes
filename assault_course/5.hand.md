### 手写
#### 面试技巧
1. 审题
    实现某种功能 / 实现某种输出 / 实现某种逻辑
    1）题干 => 需求
        数组中有若干元素，元素之间是平等的关系，但是逻辑上是包含的。请处理成树级结构
        a. 输入：数组，数组中有若干元素
        b. 输出：
        arr = [{
            name: 'a',
            parent: 'b'
        }, {
            name: 'b'
        }]
        arr = [{
            name: 'a',
            parent: {
                name: b
            }
        }]

    2）根据需求写注释
        ```js
            // 1. 输入校验是否为数组
            // 2. 遍历数组每一项，获得item
            // 3. 判断每一项item是否有父子关系
            // 4. 有的话记录下来index，并存储对象
            // 5. 利用对象的引用联动，遍历到符合条件的元素时，存入对象中
        ```
    3）根据注释写代码
    4）总结 => a.数组 => b.对象转化 => c.hash匹配 => d.对于树级操作
    
!分析清楚，拆解需求

2. 面试题举例
a. 实现函数的防抖和节流？ *
防抖 => 什么是防抖？ => 场景：一些点击请求上
    1）函数可以使事件被触发n秒之后再进行处理
    2) n秒内事件再次被触发则重新计时

```js
    // 防抖函数的实现
    // 输入：防抖函数fn；等待的秒数
    // 输出：函数的执行
    function debounce(fn, wait) {
        // 1. 需要一个定时器
        let timer = null;

        return function() {
            let _this = this,
                args = arguments;

            // 3. 中途如果再次触发，则清空重新计时
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            // 2. 将定时器设置成指定间隔时间后执行
            timer = setTimeout(() => {
                fn.apply(_this, args);
            }, wait);
        }
    }
```

节流的概念
节流指的是规定的一个时间，触发一次之后，如果在规定的时间内重复被触发了，只有一次是生效的。
=> 场景：节流使用在scroll函数的事件监听
```js
    // 节流函数的实现
    // 输入：节流函数fn；节流延时
    // 输出：函数的执行
    function throttle(fn, delay) {
        // 1. 获取执行时间的时间点
        let currentTime = Date.now();

        return function() {
            // 3. 获取当前时间点
            let nowTime = Date.now();
            let _this = this,
                args = arguments;

            // 2. 两次重复操作的时间间隔与节流延时的关系
            if (nowTime - currentTime >= delay) {
                currentTime = Date.now();
                return fn.apply(_this, args);
            }
        }
    }
```

#### call apply bind
1. 既然已经用到了apply，了解如何实现的吗？如何手写实现一下？ *
```js
    // call函数的实现
    // 输入：上下文 执行函数的参数
    // 输出：执行结果
    const myCall = function(context) {
        // 1. 判断执行对象是否为函数
        if (typeof this !== 'function') {
            console.error('this is not a function');
        }
        // 2. 获取执行函数的参数
        let args = [...arguments].slice(1),
            result = null;

        // 3. 传入值判断，是否有值，如果没有，默认为全局即window
        if (!context) {
            context = window;
        }
        // 4. 执行对象挂载在上下文之上
        context.fn = this;
        // 5. 在上下文中调用执行对象并且传入执行参数
        result = context.fn(...args);
        // 6. 将上下文复原，删除新增临时属性
        delete context.fn;
        // 7. 返回5的结果
        return result;
    }
    
    // apply函数
    // 与call的不同 => 传参
    const myApply = function(context) {
        // 1. 判断执行对象是否为函数
        if (typeof this !== 'function') {
            console.error('this is not a function');
        }
        // 2. 获取执行函数的参数
        let args = arguments[1],
            result = null;

        // 3. 传入值判断，是否有值，如果没有，默认为全局即window
        if (!context) {
            context = window;
        }
        // 4. 执行对象挂载在上下文之上
        context.fn = this;
        // 5. 在上下文中调用执行对象并且传入执行参数
        if (args) {
            result = context.fn(...args);
        } else {
            result = context.fn();
        }
        // 6. 将上下文复原，删除新增临时属性
        delete context.fn;
        // 7. 返回5的结果
        return result;
    }

    // bind函数的实现
    // bind传参一致，但是返回的是待执行的函数
    const myBind = function(context) {
        // 1. 判断执行对象是否为函数
        if (typeof this !== 'function') {
            console.error('this is not a function');
        }
        // 2. 获取参数
        let args = [...arguments].slice(1),
            fn = this;
        
        return function Fn() {
            // 根据调用方，确定最终返回值
            return fn.apply(
                this instance Fn ? this : context,
                args.concat(...arguments)
            )
        }
    }
```
补充：科里化

```js
    // es6
    // add(1)(2)(3)
    function curry(fn, ...args) {
        return fn.length <= args.length
                    ? fn(...args)
                    : curry.bind(null, fn, ...args);
    }

    function curry(fn, args) {
        let length = fn.length;

        args = args || [];

        return function() {
            let subArgs = args.slice(0);

            for (let i = 0; i < arguments.length; i++) {
                subArgs.push(arguments[i]);
            }

            // 是否执行完毕
            if (subArgs.length >= length) {
                return fn.apply(this, subArgs);
            } else {
                return curry.call(this, fn, subArgs);
            }
        }
    }
```

#### 链式处理 - promise封装一个ajax
```js
    function fetchData(url) {
        let promise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();

            // 新建一个http请求
            xhr.open('GET', url, true);
            // 监听状态的改变流转
            xhr.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(
                            this.statusText
                        ))
                    }
                }
            }
            xhr.onerror = function() {}
            xhr.responseType = '';

            xhr.send();
        })
        
        return promise;
    }
```

#### 手写拷贝
1. 浅拷贝的实现
```js
    // 快速方式
    Object.assign(obj1, obj2);
    arr.slice();
    // 手写实现
    function shallowCopy(object) {
        if (
            !object || typeof object !== 'object'
        ) return;

        let result = Array.isArray(object) ? [] : {};

        for(let key in object) {
            if (object.hasOwnProperty(key)) {
                result[key] = object[key];
            }
        }
        return result;
    }
```
2. 深拷贝
```js
    // 快速方式
    JSON.parse(JSON.stringify(obj));

    // 手写深拷贝
    function deepCopy(obj) {
        if (
            !obj || typeof obj !== 'object'
        ) return;

        let result = Array.isArray(obj) ? [] : {};

        for(let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key]
                    = typeof obj[key] === 'object'
                        ? deepCopy(obj[key])
                        : obj[key];
            }
        }
        return result;
    }
```

#### 数据结构的操作题
1. 数组
数组拍平
```js
    let arr = [1, [2, [3, 4, 5]]];

    const flatten = function(arr) {
        let result = [];

        for(let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                result = result.concat(
                    flatten(arr[i]);
                )
            } else {
                result.push(arr[i]);
            }
        }
        return result;
    }
```

乱序输出
```js
    // 1. 取出数组的第一个元素 => 0 和 第一个随机
    // 2. 依次第二个元素 => 1 和 另一个随机索引进行交换
    // 3. 依次遍历
    let arr = [1, 2, 3, 4, 5, 6];
    for (let i = 0; i < arr.length; i++) {
        const randomIndex = Math.round(
            Math.random() * (arr.length - 1 - i)
        ) + i;
        
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
```

非负大整数
```js
    // Number
    //     MAX_VALUE
    //     MAX_SAFE_INTEGER
    //     MIN_VALUE
    //     MIN_SAFE_INTEGER

    // => 
    // 1. 判断当前值的范围 => 超出安全范围的量级
    // 2. 利用% => 正确计算的范围以及余数
    // 3. 安全范围内分别相加，记录之间进位 => 字符串的形式输出
    function sumBig(a, b) {
        // 字符串代替数字，防止触发限制
        let result = '';
        let _tmp = 0;

        // 数组方式
        a = a.split('');
        b = b.split('');

        // 条件为至少有存留数
        let needCalc = a.length || b.length 
                        || _tmp;

        while (needCalc) {
            _tmp += ~~a.pop() + ~~b.pop();
            result = (_tmp % 10) + result;
            _tmp = _tmp > 9; // 超出进位
        }

        return result.replace(/^0+/, '');
    }
```

数组和类数组
```js
    // 类数组 => 数组的转换
    Array.prototype.slice.call(a_array);
    Array.prototype.splice.call(a_array, 0);
    Array.prototype.concat.call([], a_array);
    Array.from(a_array);
```

2. 转换类型
对象 => 树
```js
    // input
    source = [{
        id: 1,
        parent: 0,
        name: 'zhaowa'
    }, {
        id: 2,
        parent: 1,
        name: 'sprint'
    }, {
        id: 3,
        parent: 2,
        name: 'yy'
    }]
    // output
    tree = [{
        id: 1,
        name: 'zhaowa',
        children: [{
            id: 2,
            name: 'sprint',
            children: [{
                id: 3,
                name: 'yy'
            }]
        }]
    }]

    function arrToTree(arr) {
        let result = [];

        if (!Array.isArray(arr)) {
            return [];
        }

        let _map = {};
        arr.forEach(item => {
            map[item.id] = item;
        })

        arr.forEach(item => {
            let _parent = map[item.parent];

            if (_parent) {
                (_parent.chilren || (_parent.children = [])).push(item);
            } else {
                result.push(item);
            }
        })
        return result;
    }
```

8. url解析
```js
    // url => query => id=2 | id=2&id=3 | &enabled | 中文解码
    function parseParam(url) {
        // 1. 提取？后的东西
        const paramsStr = /.+\?(.+)$/.exec(url)[1];
        const paramsArr = paramsStr.split('&');
        const result = {};

        (paramsArr || []).forEach(param => {
            if (/=/.test(param)) {
                let [key, val] = param.split('=');

                val = decodeURIComponent(val);
                val = /^\d+$/.test(val)
                    ? parseFloat(val)
                    : val;
                
                if (result.hasOwnProperty(key)) {
                    result[key] = [].concat(result[key], val);
                } else {
                    result[key] = val;
                }
            } else {
                result[param] = true;
            }
        })
        return result;
    }
```