import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs: ['src/components', 'src/assets/images/svg', 'src/views'],
            extensions: ['vue'],
            deep: true,
            dts: true,
            directoryAsNamespace: false,
            include: [/\.vue$/, /\.vue\?vue/],
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
            ],
            dts: 'auto-imports.d.ts',
        })
    ]
})
