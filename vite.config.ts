import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from "path";


export default defineConfig({
    plugins: [
        vue(),
        alias({
            entries: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src')
                }
            ]
        }),
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
                {
                    "@/store/messageStore": ["useMessageStore"],
                    "@/store/authStore": ["useAuthStore"],
                    "@/store/booksListStore": ["useBooksStore"]
                }
            ],
            dts: 'auto-imports.d.ts',
        })
    ]
})
