import {
	defineConfig
} from 'vite'

import {
	resolve
} from "path";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
	plugins: [uni(),
		AutoImport({
			imports: ['vue', 'uni-app']
		})
	],
	resolve: {
		alias: {
			"@": resolve("/"),
		},
	},
	
})