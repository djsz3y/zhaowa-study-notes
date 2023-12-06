八、TypeScript 详解（下）

# 目标

- 基础理论及原理
- type 和 interface 的异同
- 如何基于一个已有类型, 扩展出一个大部分内容相似,
- 但是有部分区别的类型?
- 实现一个路由跳转通过 ts 约束参数的 routeHelper
- 实现一个基于 ts 和事件模式的 countdown 基础
- Scanner 扫描器
- Parser 解析器
- Binder 绑定器
- Checker 检查器
- Emitter 发射器

## 一、项目需要使用 typescript

### 1. 引入和使用

#### webpack 打包配置 => vue-cli => webpack 配置 => 编译时

- a. entry - 入口
- b. extensions 加上 ts - 用于处理尝试的数据尾缀列表 => 面试题：如何 webpack 新增一种处理类型文件
- c. loaders - ts-loader，增加对于 ts 的工具处理 => 工程化

#### TS 配置文件

tsconfig.json

### 2. vue / vuex + typescript

```ts
    <template>
        <div>
            <vueComponent />
        </div>
    </template>

    <script lang="ts">
        // const Component = {
        // }
        // 1. 定义组件的方式上：形式上 - extends
        // 申明当前组件模块 Vue.component or Vue.extends
        import Vue from 'vue'
        const Component = Vue.extend({
            // 类型推断
        })

        // 2. 全面拥抱面向对象 - 官方vue-class-component
        import Component from 'vue-class-component'

        // @Component本质 - 类装饰器 => 利用类装饰器，统一进行描述vue模板等概念
        @Component({
            template: '<vueComponent />'
        })
        export default class myComponent extends Vue {
            message: string = 'Hello'
            onclick(): void {
                console.log(this.message);
            }
        }

        // 3. 申明 - 利用ts的额外补充模块declare => 实现独立模块的声明，使之可以被独立引用
        declare module '*.vue' {
            import Vue from 'vue'
            export default Vue
        }
        declare module '/typings/vuePlugin.d.ts' {
            interface Vue {
                myProps: string
            }
        }
        // 实例中使用
        let vm = new Vue()
        console.log(vm.myProps)

        // 4. props = 提供propType原地声明联合变量
        import { propType } from 'vue'

        interface customPayload {
            str: string,
            number: number,
            name: string
        }

        const Component = Vue.extend({
            props: {
                name: String,
                success: {
                    type: String
                },
                payload: {
                    type: Object as propType<customPayload>
                },
                callback: {
                    type: Function as propType<() => void>
                }
            }
        })

        // 5. computed 以及 methods
        computed: {
            getMsg(): string {
                return this.click() + '!';
            }
        },
        methods: {
            click(): string {
                return this.message + 'zhaowa';
            }
        }

        // 6. vuex的接入ts - 声明使用
        // vuex.d.ts声明模块 - ComponentCustomProperties
        import { ComponentCustomProperties } from 'vue'

        decalre module '@vue/runtime-core' {
            interface State {
                count: number
            }

            interface ComponentCustomProperties {
                $store: Store<State>
            }
        }

        // 7. api形式编码实现 - 官方推荐
        // store.ts - 状态机侧
        import { InjectionKey } from 'vue'
        import {
            createStore,
            Store
        } from 'vuex'

        export interface State {
            count: number;
        }

        export const key: InjectionKey<Store<State>> = Symbol()

        export const store = createStore<State>({
            state: {
                count: 0;
            }
        })

        // ################################
        // main.ts - 入口侧代码
        import { createApp } from 'vue'
        import { store, key } from './store'

        const app = createApp({
            // 传入参数
        })

        // 利用了provider & inject
        app.use(store, key) // => 传入injection key => vue高级课程里提到vue.use

        app.mount('#app')

        // ########################
        // 消费方
        import { useStore } from 'vuex'
        import { key } from './store'

        export default {
            const store = useStore(key);

            // store.state.count
        }

        // 8. vuex面向对象 —— 使用vuex-class工具
        import { State, Action, Getter } from 'vuex-class'

        export default class App extends Vue {
            // 利用属性装饰器整合store的状态
            @State login: boolean;

            // 利用事件装饰器，整合store方法
            @Action setInit: () => void;

            get isLogin: boolean;

            mounted() {
                this.setInit();
                this.isLogin = this.login;
            }
        }
    </script>
```

总分总

1. 总接口、总入口
2. 分开数据
3. 汇总展示处理

自动生成 declare
