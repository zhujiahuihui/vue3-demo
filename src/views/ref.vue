<template>
  <div class="about">
    <h1>ref</h1>
    <button @click="change">count is: {{ count }}</button>

    <h4 ref="element">通过ref获取元素</h4>



    <h1>toRef</h1>
    <h3>reactive响应式数据类型转ref——{{ state.a }}</h3>
    <h3>引用对象转ref——{{ obj.name }}</h3>
    <button @click="changeToref">changeToref</button>
    <h1>torefs</h1>
    <p>{{ foo }}</p>
    <p>{{ bar }}</p>
    <h1>shallowRef</h1>
    <p>值:{{ shallowRefState }}</p>
    <button @click="myFn1">基本数据类型</button>
    <p>值:{{ shallowRefStates }}</p>
    <button @click="myFn2">引用数据类型-对数据进行修改</button>
    <h1>triggerRef</h1>
    <p>triggerRefState展示:{{ triggerRefState }}</p>
    <button @click="myFn3">使用triggerRef</button>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  isRef,
  unref,
  toRef,
  toRefs,
  reactive,
  shallowRef,
  triggerRef,
} from "vue";
/**
 * ref函数
 * 1、ref是把值类型添加一层包装，使其变成响应式的引用类型的值。
 * 2、在vue（template）中使用的时候，ref值是不用通过value获取的，vue会自动给我们添加，在js（script）中使用ref的值必须通过.value修改
 *
 *
 * Ref的本质
 * ——ref底层的本质还是reactive
 * 系统会自动根据我们给ref传入的值将他转换成
 * Ref(xx)->reactive({value:xxx})
 *
 *
 * 相关api
 *
 * isref:判断是否ref对象
 * 在vue解析数据之前，会自动判断是否是ref类型的数据 通过_ _ v_ref这个属性判断的
 *
 * unref
 * 如果参数为 ref，则返回内部值，否则返回参数本身。val = isRef(val) ? val.value : val。
 *
 * toRef
 * 作用：将引用数据类型转换为ref数据类型
 *      将reavtive数据类型转换为ref数据类型
 *
 * 注意：数据发生改变, 界面也不会自动更新
 *
 *
 * toRefs
 * 作用：批量转换。将响应式对象转换为普通对象,会将传入对象的每个属性处理为 ref 的值。
 *
 * shallowRef 创建浅层的 ref
 *
 * 创建一个 ref，它跟踪自己的 .value 更改，但不会使其值成为响应式的。也就是对value进行更新才会触发页面的更新;
 * 但是如果是一个引用数据类型，只对改引用数据进行值的修改，则不会触发更新。
 *
 *
 *triggerRef
 *作用：通常与shallowRef 一起使用，主要是主动触发界面更新的
 *参数是ref变量
 *
 * */
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2,
  });
  // 返回时转换为ref
  return toRefs(state);
}
export default {
  setup() {
    //ref——isRef
    let count = ref(0); // { value: 0 }
    let count1=reactive({name:'lisi'})
    let element = ref(null);
    let a = 1;
    onMounted(() => {
      console.log(element.value); //ref获取<h4>通过ref获取元素</h4>
    });
    const change = () => {};

    console.log(isRef(count1)); //true

    console.log(unref(count)); //0获取ref中value值
    console.log(isRef(a)); //false
    // toRef
    let state = reactive({ a: 1 });
    state.a = "李四";
    console.log(toRef(state),1111111111111); //reactive数据类型——ref数据类型

    let obj = { name: "大脚" };
    let stateToref = toRef(obj, "name"); //引用数据类型——ref数据类型
    const changeToref = () => {
      stateToref.value = "张三";
      console.log("obj", stateToref.value,11111111111); //数据类型发生改变, 界面也不会自动更新
    };

    // toRefs
    let { foo, bar } = useFeatureX();
    console.log(foo, bar); //ref数据类型


    //shallowRef——基本数据修改，页面更新【创建浅层的 ref】
    let shallowRefState = shallowRef(1);
    const myFn1 = () => {
      shallowRefStates.value = {
        a: "a-new",
        b: {
          c: "c-new",
        },
      };
      console.log(shallowRefStates,111111111111);
      shallowRefState.value = 2; //
      // 点击按钮，页面会显2
      // 也就是对value进行修改可以触发页面更新
      console.log(shallowRefState);
    };

    //shallowRef——引用数据修改，页面不更新
    let shallowRefStates = shallowRef({
      a: "a",
      b: {
        c: "c",
      },
    });
    const myFn2 = () => {
      shallowRefStates.value.a = "1";
      shallowRefStates.value.b.c = "1";
      console.log(shallowRefStates.value.a, shallowRefStates.value.b.c); //1   1
      //数据变了，页面没改变
    };

    //triggerRef——主动触发界面
    let triggerRefState = shallowRef({
      a: "a",
      b: {
        c: "c",
      },
    });
    const myFn3 = () => {
      triggerRefState.value.a = "1";
      triggerRefState.value.b.c = "1";
      triggerRef(triggerRefState);
    };

    return {
      count,
      change,
      element,
      obj,
      state,
      changeToref,
      foo,
      bar,
      shallowRefState,
      myFn1,
      shallowRefStates,
      myFn2,
      triggerRefState,
      myFn3,
    };
  },
};
</script>
