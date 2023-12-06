# qiankun2

> qiankun2/index.js

```js
// **********applist********** //
let _appList = []
export const setAppList = list => { _appList = list}

// *************lifeCycles************* //
// 通过闭包的方式，构建了生命周期的存储。
let _lifeCycles {}
export const setLifeCycle = (lifeCycles) => {_lifeCycles =lifeCycles }
export const getLifeCycle = () => _lifeCycles;
// *************暴露出去的方法************* //
// 注册的过程，其实就是一个依赖收集的过程。
export const registerMicroApps = (appList,lifeCycle)=> {
setAppList(appList);
setLifeCycle(lifeCycle {})
}

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="pushstate">pushstate</button>
    <button id="replaceState">replaceState</button>
    <button id="hash">hash</button>
  </body>
  <script>
    // hack ->
    const originPushState = window.history.pushState;
    const originReplaceState = window.history.replaceState;
    let historyEvent

    window.history.pushState = (...args) => {
      // 先把原始的，拿出来执行一下
      historyEvent = new PopState('popstate')
      dispatchEvent(historyEvent)
      historyEvent = undefined
    }
    window.history.replaceState = (...args) => {
      // 先把原始的，拿出来执行一下
      historyEvent = new PopStateEvent('popstate')
      dispatchEvent(historyEvent)
      historyEvent = undefined
    }

    document.getElementById('pushState').addEventListener('click', () => {
      history.pushState({}, '', 'pushState')
    })
    document.getElementById('replaceState').addEventListener('click', () => {
      history.pushState({}, '', 'replaceState')
    })
    document.getElementById('hash').addEventListener('click', () => {
      location.hash = 'myhash'
    })0

    window.addEventListener('popstate', () => {
      console.log()
    })
  </script>
</html>
```

> lifecycle.js

```js
// *************lifecycle*************//
// 通过闭包的方式，构建了生命周期的存储。
let _lifeCycles = {}
export const setLifeCycle = (lifeCycles) => {
  _lifeCycles = lifeCycles
}
export const getLifeCycle = () => _lifeCycles

const runLifeCycle = async (name, app) => {
  const fn = _lifeCycles[name]
  if(fn instanceof Aray) {
    await Promise.all(fn.map(fn => fn(app)))
  } else {
    await fn & fn(app)
  }
}

// 用户，或者我自己需要吧 EnumAppStatus 的生命周期流转，
// 和生命周期相关的方法，执行一下。

export const runMounted = async (app) => {
  app.status =  EnumAppStatus.MOUNTING
  await app.mount(app)
  app.status =  EnumAppStatus.MOUNTED
  await runLifeCycle('mounted', app)
}



```

> applist.js

> route.js

```js
const originPushState = window.history.pushState
const originReplaceState = window.history.replaceState
let historyEvent
const pop

// 在整个路由变化的时候。我们使用这个方法进行处理，对应用进行挂载和卸载。
export const reroute = (url) => {

}

const handleUrlChange = () => {
  reroute(location.href)
}

export const hackRoute = () => {
  window.history.pushState = (...args) => {
    // 先把原始的，拿出来执行一下
    historyEvent = new PopState('popstate')
    dispatchEvent(historyEvent)
    historyEvent = undefined
  }

  window.history.replaceState = (...args) => {
    // 先把原始的，拿出来执行一下
    historyEvent = new PopStateEvent('popstate')
    dispatchEvent(historyEvent)
    historyEvent = undefined
  }

  window.addEventListener('hashchange', handleUrlChange);
  window.addEventListener('popstate', handleUrlChange);
  // 我要对hashchange和popstate进行拦截
  window.addEventListener = hackEventListener(window.addEventListener);
  window.removeEventListener = hackEventListener(window.removeEventListener);
}

const hasListeners = (name,fn)=> {
  return capturedListeners[name].findIndex((listeners)=listeners ===fn)!==-1;

}

const hackEventListener = (func) => {

  return function(name,eventFn) {
    if(['hashchange','popstate'].includes(name)) {

    }

    //正常的事件，肯定还是要按照正常的方式执行
    return func.apply(window,arguments);

  }
}

```

> utils.js

```js
export const EnumAppStatus = {
  NOT_FOUND: 'NOT_FOUND',
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  BOOTSTRAPPING: 'BOOTSTRAPPING',
  NOT_MOUNTED: 'NOT_MOUNTED',
  MOUNTING: 'MOUNTING',
  MOUNTED: 'MOUNTED',
  UNMOUNTED: 'UNMOUNTED',
  UNMOUNTING: 'UNMOUNTING'
}
```
