<template lang="pug">
el-dialog(:title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="closeHandle")
  the-form(
    ref="formOperationRef" 
    v-model:formData="state.form"
    :formItem="formItem"
    :labelWidth="labelWidth"
    :disabled="mode === 'show'"
    :rules="rules"
    :colSpan="colSpan")
  template(#footer)
    el-button(@click="cancel") 取 消
    el-button(v-if="mode !== 'show'" type="primary" @click="submit()") 保 存
</template>

<script setup>
import { clone } from '@/utils/tool'

const formOperationRef = ref(null)

const emits = defineEmits(['submitForm', 'closed'])

const props = defineProps({
  type: { type: String, default: 'add' },
  // 表单
  formItem: { type: Array, default: () => [] },
  // 表单数据
  formData: { type: Object, default: () => { } },
  // 校验规则
  rules: { type: Object, default: () => { } },
  colSpan: { type: Number, default: 24 },
  labelWidth: { type: String, default: '100px' },
})

const state = reactive({ form: {} })
state.form = clone(props.formData)

const titleMap = { add: '新增', edit: '编辑', show: '查看' }

let mode = ref(props.type)
let visible = ref(false)

// 设置弹窗隐藏显示
const setVisible = (value = false) => visible.value = value

// 展示不同类型弹窗
const show = (status = 'add') => {
  mode.value = status
  setVisible(true)
  return exposes
}

// 表单取消方法
const cancel = () => {
  formOperationRef.value.resetFields()
  setVisible()
  emits('closed')
}
// 表单提交方法
const submit = () => {
  const { valid, data } = formOperationRef.value.submitForm()
  if (valid) {
    emits('submitForm', data, mode.value)
    cancel()
  }
}
// 点击右上角关闭弹窗
const closeHandle = () => {
  cancel()
}

// 表单注入数据
const setData = data => Object.assign(state.form, data)

// 实现链式调用
const exposes = { show, setData, submit }
defineExpose(exposes)
</script>

<script>
export default { name: 'form-operation' }
</script>