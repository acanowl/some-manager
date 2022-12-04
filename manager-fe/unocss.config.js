import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true })
  ],
  shortcuts: [
    ['full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col']
  ],
  rules: [[/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })]]
})
