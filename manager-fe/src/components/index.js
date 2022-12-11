const modules = import.meta.glob('@/components/*/index.vue')

export function registerGlobComp(app) {
  for (let path in modules) {
    const result = path.match(/.*\/(.+).index.vue$/)
    const modulesConent = modules[path]
    app.component(result[1], defineAsyncComponent(modulesConent))
  }
}
