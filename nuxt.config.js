import fs from "fs"

const theme = process.env.THEME || "default";

export default {
	mode: 'universal',
	srcDir: "src/",
	// required if themed and normal version should run at the same time
	buildDir: `.nuxt-${theme}`,
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
	],
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
			Object.assign(config.resolve.alias, require("./aliases.config"));
		},
	},
	/*
	** themed pages
	*/
	router: {
		extendRoutes(routes, resolve) {
			if(theme === "default"){
				console.log("not themed!")
				return
			}
			routes.map(route => {
				const path = resolve(`src/themes/${theme}/${route.chunkName}.vue`)

				if (fs.existsSync(path)) {
					route.component = path
				}

				return route
			})
		}
	}
}
