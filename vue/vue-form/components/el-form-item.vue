<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <label v-if="errorMessage">{{errorMessage}}</label>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: "elFormItem",
  inject: ["elFrom"], // 去找父亲的._provide属性，找到后合并到自己身上
  data() {
    return { errorMessage: null };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  methods: {
    validate() {
      let value = this.elFrom.model[this.prop]; // 当前数据
      let ruleValue = this.elFrom.rules[this.prop];
      if (this.prop) {
        let schema = new Schema({
          [this.prop]: ruleValue
        });
        schema.validate({ [this.prop]: value }, (err, res) => {
          if (err) {
            this.errorMessage = err[0].message;
          } else {
            this.errorMessage = null;
          }
        });
      }
    }
  },
  mounted() {
    // 挂载的顺序是先子在父
    this.$on("validate", () => {
      // console.log('校验', this._uid)
      this.validate();
    });
  }
  // 在 el-form-item 中需要校验当前你输入的内容是否符合规范 用户更改对应的输入框，对应的el-from-item应该知道
};
</script>

<style>
</style>