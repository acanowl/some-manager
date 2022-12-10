import DarkMode from '@/components/DarkMode/index.vue'
import FormSearch from '@/components/FormSearch/index.vue'
import theTable from '@/components/theTable/index.vue'

// TODO 太多直接require.context
const components = [DarkMode, FormSearch, theTable]

export function registerGlobComp(app) {
  for (let component of components) {
    app.component(component.name, component)
  }
}
