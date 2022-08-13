<template>
    <!-- 申明表单  model属性要双向绑定数据，数据中对应每个表单元素的value值 form[item.model]-->
  <el-form ref="form" label-width="100px" :model="formData" :inline="formInline">
    <!-- 循环渲染 formLabel 中的表单元素 -->
    <!-- formLabel 包含所需要的 表单元素 -->
    <!-- 其中每项都包含表单元素的类型type、表单的名称name、表单对应的值model -->
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
        <!-- 如果表单元素type是输入框，依次设置占位符、双向绑定的model值 -->
      <el-input
        v-if="item.type == 'input'"
        :placeholder="'请输入' + item.label"
        v-model="formData[item.model]"
      >
      </el-input>
        <!-- 如果是switch表单元素 设置占位符、双向绑定model值 -->
      <el-switch
        v-if="item.type === 'switch'"
        v-model="formData[item.model]"
      ></el-switch>
        <!-- 如果是日期选择的表单元素，要设置日期格式，占位符、双向绑定model值 -->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="formData[item.model]"
      ></el-date-picker>
        <!-- 如果是下拉选项表单元素，设置占位符、双向绑定model值 -->
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="formData[item.model]"
      >
        <!-- 循环渲染下拉选项， -->
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- 预留一个插槽，存放自定义的内容 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CommonForm",
  // 接收数据
  props: {
    // 要渲染的表单内部的表单元素，数组的每个元素是一个对象
    // 每个对象包含：表单的名称name、表单的类型type、表单的双向绑定值model
    label: Array,
    // 表单所要提交的数据，即表单元素双向绑定的数据model，同formLabel中每个表单元素的model
    form: Object,
    // form表单的格式
    inline: Boolean,
  },
  data() {
    return {

    };
  },
  computed: {
    formLabel () {
      return this.label
    },
    formData () {
      return this.form
    },
    formInline () {
      return this.inline
    }
  },
  created () {

  }

};
</script>

<style lang="less" scoped>
  
</style>