import {
		getCartList,
		updateCart,
		delCart,
		clearCart
	} from '../../api/OrderApi.js'
export default {
	namespaced: true,
	state: {
		cartlist: [],
		isallchecked: false,
		zong: 0,
	},
	mutations :{
		setZong:function(state,zhi){
			state.zong=zhi
		}
	},
	actions :{
		getcartlist: function(context) {
			//调用接口获取购物车的数据
			getCartList().then((res) => {
				// console.log(res.data.data)
				context.state.cartlist = res.data.data
				//计算选中的商品的价格
				let zong = 0;
				context.state.isallchecked = false
				for (let c of context.state.cartlist) {
					if (c.cart_checked == 1) {
						context.state.isallchecked = true
						zong += c.cart_price * c.cart_count
					}
				}
				context.state.zong = Math.floor(zong * 100) / 100
			})
		}
	}
}
