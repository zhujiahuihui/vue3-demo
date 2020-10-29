2.0生命周期选项和Composition API之间的映射
      beforeCreate ->使用 setup()
      created ->使用 setup()
      beforeMount -> onBeforeMount
      mounted -> onMounted
      beforeUpdate -> onBeforeUpdate
      updated -> onUpdated
      beforeDestroy -> onBeforeUnmount
      destroyed -> onUnmounted
      activated -> onActivated
      deactivated -> onDeactivated
      errorCaptured -> onErrorCaptured
新钩子
        onRenderTracked
        onRenderTriggered

Vue3六大亮点
1.	性能比vue2.0快1.2倍~2倍
2.	按需编译，体积比vue2更小
3.	组合api(类似于react hooks)
4.	更好的ts支持
5.	暴露了自定义渲染的api
6.	提供了更先进的组件

Vue3是如何变快的

Diff方法的优化
	——Vue2中的虚拟dom是进行全量的对比
	——Vue3新增了静态标记
	  	 +在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
	   	+并且可以通过flag的信息得知当前节点要对比的具体内容
 ——Vue3的diff算法中，只有有静态标记才会进行比较，才会进行追踪

静态标记的枚举类
1.	Text=1 动态文本节点
2.	Class=2 动态class
3.	Style=4  动态style
4.	Props=8 动态属性，但不包含类名和样式

HoistStatic静态提升
	——Vue2中无论元素是否参与更新，每次都会重新创建
	——Vue3中对于不参与更新的元素，只会被创建一次，之后每次渲染时被不停的复用

CacheHandlers事件侦听器缓存
	——默认情况下onClick会被视为动态绑定，所以每次都会去追踪他的变化
	——但是因为是同一个函数，所以没有追踪变化，直接被缓存起来复用了

Ssr渲染
	——当有大量的静态内容时候，这些内容会被当做纯字符串推进一个buffer里面。即使存在动态绑定，会通过末班插值嵌入进去，这样会比通过虚拟dom来渲染快很多很多
	——当静态内容大到一定量级的时候，会用_createStaticVnode方法在客户端去生成一个static node,这些静态node,会被直接innerHtml,就不需要创建对象，然后根据对象渲染。

什么是组合api
    就是将封装好的具备公用的函数就是组合api
    ——Vue2的，data保存数据一些逻辑他是从meathod、computer、watch中做的
    ——vue3提供了的组合api （当前的业务数据和业务逻辑放在一起）

怎么编写组合api
    提供了一个函数，用来组合api的
    Setup函数是组合api的入口函数