const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  		open: true, //是否自动弹出浏览器页面
  		host: "localhost",
  		port: '8900', //我的端口 这就是当期项目的端口
  		
  		//proxy 单词是代理的意思 这一块是为了解决跨域的问题
  		proxy: {
  			'/api': {//代表 http://localhost:8900/api
  				target: 'http://localhost:8001', //后端服务器地址
  				ws: true, //代理websockets
  				changeOrigin: true, // 虚拟的站点需要更管origin 允许跨域
  				pathRewrite: { //重写路径
  					'^/api': ''
  				}
  			}
  		}
  	}
})
