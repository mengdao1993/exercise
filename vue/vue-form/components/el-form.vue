<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
// 跨组件传递数据
export default {
  name: "elFrom",
  provide() {
    // elementItem 这个属性放到了当前组件的_provide
    return { elFrom: this };
  },
  props: {
    rules: {
      type: Object,
      default: () => ({}) // 保证数据不被共享和data一样
    },
    model: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    async validate(cb) {
      let children = this.$broadcast("elFormItem"); // 获取所有子元素
      // 需要看一下内部的elfromItem 是否都通过校验
      // 获取所有的子组件
      try {
          await Promise.all(children.map(child => child.validate()))
          cb(true)
      } catch (e) {
          cb(false)
      }
      
    }
  }
};
</script>

<style>
</style>