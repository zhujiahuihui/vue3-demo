<template>
  <div class="home">
    <h1>reactive</h1>

    <p>{{ state.a }}</p>
    <p>{{ state.b.c }}</p>
    <p>{{ state.b.d.e }}</p>
    <p>{{ state.b.d.f.g }}</p>
    <h1>shallowReactive</h1>
    <button @click="change">shallowReactive</button>
    <p>{{ shallowReactiveState.foo }}</p>
    <p>{{ shallowReactiveState.nested }}</p>
    <ul>
      <li>{{ value }}</li>
    </ul>
  </div>
</template>

<script>
import { watchEffect, ref, isReactive, reactive, shallowReactive } from "vue";
/**
 * 什么是reactive
 * ————reactive是vue3中提供的实现响应式数据的方法
 * ————在vue2中相应式数据是通过defineProperty来实现的，而在Vue3中响应式数据是通es6中的proxy来实现的
 *
 * 注意：
 *      ——Reactive的参数必须是对象（json和arr）
 *  	——如果Reactive传递了其他对象
 *          +默认情况下修改对象，界面是不会自动更新的
 *          +如果想更新，可以通过重新赋值的方式
 *
 * 通过Reactive来创建一个响应式数据
 * 本质：将传入的数据包装成一个proxy对象
 *
 * 1、proxy有get、set方法
 * 2、get方法除了会返回todos的值外还会定义一个方法，这里假设为B方法，B会改变视图中对应的数据
 * 3、set方法会调用方法B
 *
 *reactive方法会将普通对象转换为proxy对象
 *
 *
 *isReactive
 *检查对象是否是由创建的反应式代理reactive。
 *
 *
 * shallowReactive - 浅层响应式数据对象
 * 只为某个对象的（第一层）属性创建浅层的响应式代理，不会对“属性的属性”做深层次、递归地响应式代理，而只是保留原样。
 *
 */
function myReative(value) {
  if (typeof value === "object") {
    if (value instanceof Array) {
      console.log("数组");
      value.forEach((item, index) => {
        if (typeof item == "object") {
          value[index] = myReative(item);
        }
      });
    } else {
      console.log("对象");
      for (let key in value) {
        if (typeof value[key] == "object") {
          value[key] = myReative(value[key]);
        }
      }
    }
    return new Proxy(value, {
      //get直接返回对应的值
      get(value, key) {
        return value[key];
      },
      //将修改的值重新赋值，更新ui界面，并且返回true
      set(value, key, newValue) {
        value[key] = newValue;
        console.log("更新ui界面", newValue);
        return true;
      },
    });
  } else {
    console.log("不是对象");
  }
}

export default {
  name: "Home",
  setup() {
    //reative
    let obj = {
      a: "a",
      b: {
        c: "c",
        d: {
          e: "e",
          f: {
            g: "g",
          },
        },
      },
    };
    let state = myReative(obj);

    (state.a = 1), (state.b.c = 2), (state.b.d.e = 3), (state.b.d.f.g = 4);
    /**
     * watchEffect
     * watchEffect与watch的不同？
     * 1、watchEffect不需要指定监听属性，可以自动收集依赖，属性变更的时候都会执行，watch只能监听指定属性的变更
     * 2、watch可以取到新值和旧值，watchEffect拿不到
     * 3、watchEffect在组件初始化的时候就会取一次值，属性变化时，回调会再次执行，watch不需要，从一开始就指定了依赖
     *
     */
    let value = ref(0);
    setTimeout(() => {
      value.value = 1;
    }, 1000);
    // 停止监听
    let stop = watchEffect(() => {
      console.log(value.value);//0
    });
    stop();

    //isReactive
    let arr = reactive({ name: "晓红",age:{
      a:1
    } });
    console.log(arr)
    let arr1 = isReactive(arr);
    console.log(arr1); //true

    //shallowReactive 只有第一层是响应式数据，第二层不是
    let shallowReactiveState = shallowReactive({
      foo: 1,
      nested: {
        bar: 2,
      },
    });

    let change = () => {
      shallowReactiveState.foo++;
      // 但不会深层代理
      shallowReactiveState.nested.bar = 90;
      console.log(shallowReactiveState.nested,11111); //{bar: 3}非响应时的
      console.log(isReactive(shallowReactiveState.nested),11111);
    };

    return { state, value, change, shallowReactiveState };
  },
};
</script>
