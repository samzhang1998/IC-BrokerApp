import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { wrapperEnv } from './build/utils'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_DROP_CONSOLE } = viteEnv

  // 动态导入 UnoCSS 以避免 ESM 兼容性问题
  const UnoCSS = (await import('unocss/vite')).default

  return {
    plugins: [
      UnoCSS(),
      AutoImport({
        dts: 'types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
        imports: ['vue', 'uni-app', 'pinia'],
        dirs: ['./src/api'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      // Components({
      //   // 指定组件位置，默认是src/components
      //   // dirs: ['src/components/base'],
      //   // ui库解析器
      //   // resolvers: [ElementPlusResolver()],
      //   // extensions: ['vue'],
      //   // 配置文件生成位置
      //   dts: 'types/components.d.ts'
      // }),
      UniComponents({
        resolvers: [WotResolver()],
        dts: 'types/components.d.ts'
      }),
      uni()
    ],
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, 'src')
      }
    },
    base: './',
    // define: { __VUE_I18N_FULL_INSTALL__: true, __VUE_I18N_LEGACY_API__: true, __INTLIFY_PROD_DEVTOOLS__: false }
    // server: {
    //   port: VITE_PORT,
    //   open: true //自动打开
    // },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    }
  }
})
