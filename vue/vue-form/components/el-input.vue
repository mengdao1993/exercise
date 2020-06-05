<template>
  <input type="text" :value="value" @input="handleInput">
</template>

<script>
export default {
    // model: {
    //     // 可以重新定义v-model解析出来的结果
    // },
    name: 'elInput',
    props: {
        value: {
            type: String
        }
    },
    methods: {
        handleInput (e) {
            this.$emit('input', e.target.value)
            // $parent指向不明确
            // this.$parent.$emit('validate')
            // 自己实现dispatch
            this.$dispatch('elFormItem','validate')
        }
    }
}
</script>

<style>

</style>