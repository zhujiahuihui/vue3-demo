
https://github.com/vuejs/vue-next 
vue3.源码


Vue3六大亮点
1.	性能比vue2.0快1.2倍~2倍
2.	按需编译，体积比vue2更小
3.	组合api(类似于react hooks)
4.	更好的ts支持
5.	暴露了自定义渲染的api
6.	提供了更先进的组件
Performance：通过Proxy实现双向响应式绑定，相比defineProperty的遍历属性的方式效率更高，性能更好，另外Virtual DOM(虚拟dom)更新只diff动态部分、事件缓存等，也带来了性能上的提升
Tree-Shaking Support：相比2.x导入整个Vue对象，3.x支持按需导入，只打包需要的代码
Composition API：组合式API，面向函数编程
Fragment、Teleport、Suspense：“碎片”，Teleport即Protal传送门，“悬念”，参考了React的设计
Better Typescript support：2.x设计之初没有考虑到类型推导，导致适配ts比较困难，3.x移除了this对象，利用了天然对类型友好的普通变量与函数，对TypeScript支持更好
Custom Render API：提供了自定义渲染API


Vue3是如何变快的

   1、Diff方法的优化
        ——Vue2中的虚拟dom是进行全量的对比
        ——Vue3新增了静态标记
            +在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
            +并且可以通过flag的信息得知当前节点要对比的具体内容
        ——Vue3的diff算法中，只有有静态标记才会进行比较，才会进行追踪
        静态标记的枚举类
            1.Text=1 动态文本节点
            2.Class=2 动态class
            3.Style=4  动态style
            4.Props=8 动态属性，但不包含类名和样式

    2、HoistStatic静态提升
        ——Vue2中无论元素是否参与更新，每次都会重新创建
        ——Vue3中对于不参与更新的元素，只会被创建一次，之后每次渲染时被不停的复用

    3、CacheHandlers事件侦听器缓存
        ——默认情况下onClick会被视为动态绑定，所以每次都会去追踪他的变化
        ——但是因为是同一个函数，所以没有追踪变化，直接被缓存起来复用了

    4、Ssr渲染
        ——当有大量的静态内容时候，这些内容会被当做纯字符串推进一个buffer里面。即使存在动态绑定，会通过末班插值嵌入进去，这样会比通过虚拟dom来渲染快很多很多
        ——当静态内容大到一定量级的时候，会用_createStaticVnode方法在客户端去生成一个static node,这些静态node,会被直接innerHtml,就不需要创建对象，然后根据对象渲染。

快速搭建vue3.0的项目
    1、安装vue cli
        npm install -g @vue/cli

        之前已经安装过vue-cli的话，可以升级到最新版
        npm update -g @vue/cli // 升级vue-cli到最新版
        vue -V // 查看vue-cli版本
    2、创建vue3.0项目
        vue create vue3-test
        vue ui
        

计算属性 computed
    2.x和3.x中的computed都支持getter和setter，写法一样，只是3.x中是组合函数式

watchEffect与watch的不同？
    1、watchEffect不需要指定监听属性，可以自动收集依赖，属性变更的时候都会执行，watch只能监听指定属性的变更
    2、watch可以取到新值和旧值，watchEffect拿不到
    3、watchEffect在组件初始化的时候就会取一次值，属性变化时，回调会再次执行，watch不需要，从一开始就指定了依赖

什么是组合api
    就是将封装好的具备公用的函数就是组合api
    ——Vue2使用的是选项型api(Option API)，在选项API分成了不同的属性：data、meathod、computer、watch等
    ——vue3提供了的合成型api(Composition API) ，合成型API能让我们用放法（function）来分割，相对于旧的api，这样代码会比较整洁

1、setup函数
        有两个参数：第一个是props,第二个是context（attrs，slots，emit）
        返回值[对象或函数]
        1、setup 是在组件内 Composition API 的入口点。
        2、调用时机：在breforeCreate之前调用
        3、setup 返回一个对象，这个对象的属性将会被合并到组件模板中去渲染上下文
        4、setup 也可以返回一个函数，函数中也能使用当前 setup函数作用域中的响应式数据。
        5、由于我们不能在setup中使用data和methods,所以vue中为了避免我们错误的使用，他直接将setup函数中this修改成了undefined
        6、Setup只能是同步的，不能是异步。

2、ref函数
        1、ref是把值类型添加一层包装，使其变成响应式的引用类型的值。
        2、在vue（template）中使用的时候，ref值是不用通过value获取的，vue会自动给我们添加，在js（script）中使用ref的值必须通过.value修改
        Ref的本质
            ref底层的本质还是reactive
            系统会自动根据我们给ref传入的值将他转换成
            Ref(xx)->reactive({value:xxx})

3、isref
        ————判断是否ref对象
        在vue解析数据之前，会自动判断是否是ref类型的数据 通过_ _ v_ref这个属性判断的

4、unref
        ————如果参数为 ref，则返回内部值，否则返回参数本身。val = isRef(val) ? val.value : val。

5、toRef
        作用：
            将引用数据类型转换为ref数据类型
            将reavtive数据类型转换为ref数据类型
        注意：
            数据发生改变, 界面也不会自动更新
 
6、toRefs
        作用：
            批量转换。将响应式对象转换为普通对象,会将传入对象的每个属性处理为 ref 的值。

7、shallowRef 
        作用：
            创建浅层的 ref
        创建一个 ref，它跟踪自己的 .value 更改，但不会使其值成为响应式的。也就是对value进行更新才会触发页面的更新;
        但是如果是一个引用数据类型，只对改引用数据进行值的修改，则不会触发更新。
 
8、triggerRef
        作用：
            通常与shallowRef 一起使用，主要是主动触发界面更新的
        参数：
            是ref变量

9、什么是reactive
        ————reactive是vue3中提供的实现响应式数据的方法
        ————在vue2中相应式数据是通过defineProperty来实现的，而在Vue3中响应式数据是通es6中的proxy来实现的
        注意：
            ——Reactive的参数必须是对象（json和arr）
            ——如果Reactive传递了其他对象
                +默认情况下修改对象，界面是不会自动更新的
                +如果想更新，可以通过重新赋值的方式
        通过Reactive来创建一个响应式数据
        本质：将传入的数据包装成一个proxy对象
        proxy有get、set方法
        reactive方法会将普通对象转换为proxy对象

10、isReactive
        作用：
            检查对象是否是由创建的反应式代理reactive。

11、shallowReactive 
        作用：
            浅层响应式数据对象
        只为某个对象的（第一层）属性创建浅层的响应式代理，不会对“属性的属性”做深层次、递归地响应式代理，而只是保留原样。

12、readonly函数
        传入ref或reactive对象,并返回一个原始对象的只读代理,对象内部任何嵌套的属性也都是只读的。
        传入普通对象等也返回只读代理
        入普通数值或字符串不能变成只读

13、isReadonly
         检查对象是否是由创建的只读代理readonly

14、shallowReadonly 
        作用：
            创建浅层的只读响应式代理

15、markRaw函数
        作用：
            添加不可转为响应式数据的标记
   
16、toRaw 
        作用：
            响应式对象转普通对象
        返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发更改。不建议一直持有原始对象的引用。请谨慎使用。

17、customRef函数
        作用：
            自定义ref
        返回一个ref对象,可以显式地控制依赖追踪和触发响应


在Vue2.x版本中频繁出现的this，在Vue3.0中也消失了，取而代之的是Composition API提供的getCurrentInstance方法，用来获取当前组件实例，然后通过ctx获取当前上下文。

        import {getCurrentInstance} from "vue"
        export default{
            setup(){
                const {ctx} =  getCurrentInstance()
                console.log(ctx)//获取上下文
            }
        }

与 React Hooks 相比
    基于函数的组合式 API 提供了与 React Hooks 同等级别的逻辑组合能力，但是它们还是有很大不同：组合式 API 的 setup() 函数只会被调用一次，这意味着使用 Vue 组合式 API 的代码会是：
    一般来说更符合惯用的 JavaScript 代码的直觉；

    不需要顾虑调用顺序，也可以用在条件语句中；
    不会在每次渲染时重复执行，以降低垃圾回收的压力；
    不存在内联处理函数导致子组件永远更新的问题，也不需要 useCallback；
    不存在忘记记录依赖的问题，也不需要“useEffect”和“useMemo”并传入依赖数组以捕获过时的变量。Vue 的自动依赖跟踪可以确保侦听器和计算值总是准确无误。

5、Fragment
    2.x中，vue template只允许有一个根节点
    3.x中，vue template支持多个根节点，用过React的人应该知道<React.Fragment>和<></>

2.0生命周期选项和Composition API之间的映射
      beforeCreate ->使用 setup()
      created ->使用 setup()
      beforeMount -> onBeforeMount———— // 相当于 beforeMount
      mounted -> onMounted—————————————// 相当于 mounted
      beforeUpdate -> onBeforeUpdate———// 相当于 beforeUpdate
      updated -> onUpdated—————————————// 相当于 updated
      beforeDestroy -> onBeforeUnmount—// 相当于 beforeDestroy
      destroyed -> onUnmounted—————————// 相当于 destroyed
      errorCaptured -> onErrorCaptured—// 错误监控
      onRenderTracked——————————————————// 已渲染

新钩子
        onRenderTracked
        onRenderTriggered
