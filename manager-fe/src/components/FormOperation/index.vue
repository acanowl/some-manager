<template lang="pug">
el-dialog(:title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="closeHandle")
  the-form(:formItem="formItem" :formData="formData" :rules="rules")
  template(#footer)
    el-button(@click="visible = false") 取 消
    el-button(v-if="mode != 'show'" type="primary" @click="submit()") 保 存
</template>

<script setup>
const dialogForm = ref(null)

const emits = defineEmits(['submit', 'closed'])

const props = defineProps({
  // 表单
  formItem: { type: Array, default: () => [] },
  // 表单数据
  formData: { type: Object, default: () => {} },
  // 校验规则
  rules: Object,
})

const titleMap = { add: '新增', edit: '编辑', show: '查看' }
let mode = ref('add')
let visible = ref(false)

const show = (mode = 'add') => {
  mode.value = mode
  visible.value = true
}

const closeHandle = () => emits('closed')

//表单提交方法
const submit = () => {
  dialogForm.value.validate(async (valid) => {
    valid && emits('submit', () => visible.value = false)
  })
}
//表单注入数据
const setData = data => Object.assign(props.formData, data)

defineExpose({ show, setData, submit })
</script>

<script>
export default { name: 'form-operation' }
</script>