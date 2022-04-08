import { createStore } from 'vuex'
import WebSite from './modules/WebSite.js'
import Spu from './modules/Spu.js'
import User from './modules/User.js'
import Order from './modules/Order.js'

export default createStore({
  modules: {
	  // 模块
	  WebSite,
	  Spu,
	  User,
	  Order
  }
})
