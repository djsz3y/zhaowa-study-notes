// solid.js

// 和 vue3 差不多

const obs = [] // 我们还要定义一个数组：

const createState = (value) => {
	const subscribers = new Set()
	// 假设有一个 getter setter 函数，
	const getter = () => {
		const curOb = obs[obs.length - 1]
		if (curOb) {
			subscribers.add(curOb) // 那么，此时我拿到的这个值就订阅了。
		}
		return value
	}

	const setter = (newValue) => {
		value = newValue
		subscribers.forEach((s) => s())
	}
	return [getter, setter] // return 这个 getter setter
}

// createEffect 是函数，执行时，先定义函数，把 它放进去，然后执行，如果用到了这个值，此时触发 getter ，getter 又把自己放进去了。
const createEffect = (effect) => {
	const execute = () => {
		obs.push(execute) // execute 相当于 调用 createEffect 执行的
		effect()
		obs.pop()
	}
	execute()
}

// useState , useEffect.

const [name, setName] = createState('luyi') // useState ，自己实现 所以命名 createState 。

createEffect(() => {
	console.log('name', name()) // 只要用到了 name ，name 是可执行的。
})

setName('yunyin')
setName('yunyin2')

// 我们先来实现这个状态管理，如果后面使用，就用自己实现的 状态管理。
