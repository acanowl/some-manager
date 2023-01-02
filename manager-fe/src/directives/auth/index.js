import { useUserStore } from '@/store/modules/user'

export default {
  mounted(el, binding, vnode, prevVnode) {
    // TODO 根据power来渲染是否要展示
    const userStore = useUserStore()
    const { value } = binding
    let permissions = userStore.userInfo?.character

    if (value && permissions) {
      !permissions.includes(value) && (el.style.display = 'none')
    }
  }
}
