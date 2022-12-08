import DarkMode from '@/components/DarkMode/index.vue'
import FormSearch from '@/components/FormSearch/index.vue'

// TODO 太多直接require.context
const components = [DarkMode, FormSearch]

export function registerGlobComp(app) {
  for (let component of components) {
    app.component(component.name, component)
  }
}
