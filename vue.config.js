module.exports = {
	devServer: {
		proxy: {
			"/api": {
				"target": "http://localhost:3001",
				"secure": false
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
			  '@': __dirname + '/client'
			}
		},
		entry: {
			app: './client/main.ts'
		}
	}
}