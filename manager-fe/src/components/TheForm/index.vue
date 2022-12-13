<template lang="pug">
el-form.form(ref="commonFormRef" v-if="formItem && formItem.length > 0" :rules="rules" :model="state.form" :inline="true" label-position="right" v-bind="{ 'label-width': labelWidth, ...$attrs }")
  el-row
    el-col(v-for="(item, index) in formItem" :key="index" v-bind="cptColSpan")
      el-form-item(:class="{'important-mb-0': noPd }" :key="index" :label="item.label" :prop="item.value")
        //- 下拉框
        el-select(v-if="item.type === 'select'" v-model="state.form[item.value]" clearable :filterable="item.filterable ? item.filterable : false" :multiple="item.multiple ? item.multiple : false" :disabled="item.disabled" :placeholder="`请选择${item.placeholder || ''}`" @change="emits('change', state.form, item.value)")
          el-option(v-for="(option, i) in item.children" :key="i" :value="option.value" :label="option.label")
        //- 文本框
        el-input(v-if="item.type === 'text'" :id="item.value" v-model.trim="state.form[item.value]" clearable :placeholder="item.disabled === true ? '' : `请输入${item.placeholder || ''}`" :maxlength="item.maxlength" :oninput="emits('oninput', state.form, item)" :disabled="item.disabled" @change="emits('change', state.form, item.value)")
        //- 密码框
        el-input(v-if="item.type === 'password'" v-model="state.form[item.value]" type="password" :placeholder="item.placeholder ? item.placeholder : '请输入'" show-password :disabled="item.disabled")
        //- 数字
        el-input(v-if="item.type === 'number'" :id="item.value" v-model.number="state.form[item.value]" clearable :placeholder="item.disabled === true ? '' : `请输入${item.placeholder || ''}`" :maxlength="item.maxlength" :oninput="emits('oninput', state.form, item)" :disabled="item.disabled" @change="emits('change', state.form, item.value)")
        //- 文本域
        el-input(v-if="item.type === 'textarea'" v-model="state.form[item.value]" clearable :rows="item.rows ? item.rows : 3" type="textarea" :placeholder="`${item.placeholder || ''}`" :maxlength="item.maxlength" show-word-limit resize="none")
        //- 颜色选择
        el-color-picker(v-if="item.type === 'colorPicker'" :predefine="item.predefine || []" v-model="state.form[item.value]")
        //- 单选
        el-radio-group(v-if="item.type === 'radio'" v-model="state.form[item.value]" :disabled="item.disabled" @change="emits('change', state.form, item.value)")
          el-radio(v-for="option in item.children" :key="option.value" :label="option.value") {{ option.label }}
        //- 联级选择器
        el-cascader(v-if="item.type === 'cascader'" v-model="state.form[item.value]" :options="item.children" :props="item.props" :show-all-levels="false" :disabled="item.disabled" @change="handleChange")
        //- 日期
        el-date-picker(v-if="item.type === 'date'" v-model="state.form[item.value]" type="date" :disabled="item.disabled" placeholder="选择日期")
        //- 日期
        el-date-picker(v-if="item.type === 'daterange'" v-model="state.form[item.value]" type="daterange" :disabled="item.disabled" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期")
        //- 上传
        el-upload.upload-file(v-if="item.type === 'upload'" ref="uploadRef" :action="''" :accept="item.accept" :http-request="uploadFile" :before-upload="beforeUpload" :on-remove="onRemove" :limit="item.limit" :multiple="item.multiple" :on-exceed="handleExceed" :file-list="state.form.fileList")
          el-button(size="small" type="primary") 点击上传
        //- 上传图片
        el-upload(v-if="item.type === 'uploadCard'" action="#" :accept="item.accept" list-type="picture-card" :on-remove="onRemove" :on-exceed="handleExceed" :http-request="httpRequest" :file-list="state.form[item.value]")
          el-icon
            Plus
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance()
const emits = defineEmits(['update:formData', 'change', 'oninput', 'submitForm', 'uploadFile'])
const props = defineProps({
  // 表单
  formItem: { type: Array, default: () => [] },
  // 表单数据
  formData: { type: Object, default: () => { } },
  // 标签宽度
  labelWidth: { type: String, default: 'auto' },
  colSpan: { type: Number, default: 0 },
  // 校验规则
  rules: { type: Object, default: () => { } },
  noPd: { type: Boolean, default: false }
})

const state = reactive({
  form: {}
})

const commonFormRef = ref(null)
const uploadRef = ref(null)

const cptColSpan = computed(() => {
  return props.colSpan ? { span: props.colSpan } : { xs: 8, sm: 8, md: 8, lg: 6, xl: 6 }
})

// 双向绑定
watch(() => props.formData, val => (state.form = val), { deep: true })
watch(() => state.form, val => emits('update:formData', val), { deep: true })

const submitForm = () => {
  if (props.rules) {
    return commonFormRef.value.validate((valid) => {
      if (!valid) return false
      emits('submitForm', state.form, valid)
    })
  } else {
    emits('submitForm', state.form)
  }
}

const handleChange = (data) => {
  emits('change', data)
}

const uploadFile = (params) => {
  emits('uploadFile', params)
}
const beforeUpload = (file) => {
  state.form.file = file
}
const onRemove = (params) => {
  const index = state.form.fileList.findIndex((item) => item.file.name === params.name)
  state.form.fileList.splice(index, 1)
}
const httpRequest = (file) => {
  if (!state.form.fileList) {
    state.form.fileList = []
  }
  state.form.fileList.push(file)
  console.log(state.form)
}
const handleExceed = (files) => {
  proxy.$message.warning('当前限制选择 1 个文件')
}

const clearValidate = () => {
  commonFormRef.value.clearValidate()
}
const resetFields = () => {
  commonFormRef.value.resetFields()
}

defineExpose({
  submitForm,
  clearValidate,
  uploadFile,
  onRemove,
  beforeUpload,
  resetFields,
  handleChange
})
</script>

<script>
export default { name: 'the-form' }
</script>