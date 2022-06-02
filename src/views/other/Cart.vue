<template>
	<div class=" mt-10 py-10">
		<div id="cart">
			<!---->
			<div class="containner">
				<template v-if="Order.cartlist.length>0">
				<div class="flex justify-between item-center text-md dark bg-gray px-20 py-5 cart-header">
					<div class="mx-5"><input type="checkbox" :checked="Order.isallchecked" class="cart_cbx"
							@change="quanxuan"></div>
					<div class="cart-product mx-5">商品</div>
					<div class="cart-param mx-5">单价</div>
					<div class="cart-param mx-5">数量</div>
					<div class="cart-param mx-5">小计</div>
					<div class="cart-param mx-5">操作</div>
				</div>
				<template v-for="(c,i) in Order.cartlist" :key="i">
					<div class="flex justify-between item-center text-md dark my-10 px-20 py-5 cart-body">
						<div class="mx-5">
							<input @change="qie($event,c.car_id,c.cart_count)" type="checkbox"
								:checked="c.cart_checked==1" class="cart_cbx">
						</div>
						<div class="cart-product mx-5 flex item-start"><img
								:src="'http://127.0.0.1:8001/img/'+c.cart_thumburl" class="rounded hand"
								style="width: 80px; height: 80px;">
							<div class="cart-name mx-10 text-left flex-column justify-between item-start">
								<div class="hover-red hand ">{{c.cart_name}}</div>

								<div class="cart-sku flex item-center">
									<template v-for="(attr,a) in JSON.parse(c.cart_sku)">
										<div class="gray text-sm pr-5 hand hover-red"> {{attr.value_name}} </div>
									</template>
								</div>
							</div>
						</div>
						<div class="cart-param mx-5">￥{{c.cart_price}}</div>
						<div class="cart-param mx-5"><input @input="gaishuliang(c.car_id,c.cart_count,c.cart_checked)"
								type="number" min="1" class="cart-count" v-model="c.cart_count"></div>
						<div class="cart-param mx-5">￥{{c.cart_price * c.cart_count }}</div>
						<div class="cart-param mx-5 hover-red hand" @click="deleleCartById(c.car_id)">删除</div>
					</div>
				</template>
				
					<div class="flex justify-between item-center mt-10">
						<div class="flex item-center">
							<div class="mx-5 gray hover-red hand text-sm" @click="pldel">批量删除</div>
							<div class="mx-5 gray hover-red hand text-sm" @click="clearcart">清空购物车</div>
						</div>
						<div class="flex item-center justify-end">
							<div class="mx-5 dark text-md"><span>总价：</span><span
									class="red text-xl weight">￥{{Order.zong}}</span>
							</div>

							<button class="btn-pay ml-10 hand" :disabled="!Order.isallchecked" @click="jiesuan">去结算</button>

						</div>
					</div>
				</template>
				<template v-if="Order.cartlist<=0">
					<h1>您的购物车是空的
						<router-link to="/">去购物</router-link>
					</h1>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getCartList,
		updateCart,
		delCart,
		clearCart
	} from '../../api/OrderApi.js'

	import {mapState,mapActions,mapMutations} from 'vuex'
	export default {
		data: function() {
			return {
				
			}
		},
		computed:{
			...mapState(['Order'])
		},
		methods: {
			...mapActions({getcartlist:'Order/getcartlist'}),
			...mapMutations({setZong:'Order/setZong'}),
			//点击购物车的结算，跳转到结算页面
			jiesuan:function(){
				this.$router.push("/pri/customer/comorder")
			},
			
			
			//清空购物车
			clearcart:async function(){
				await clearCart()
				this.getcartlist()
			},
			
			//批量删除，就是删除当期选中的那个购物车的商品的数据
			pldel: async function() {
				for (let c of this.cartlist) {
					if (c.cart_checked == 1) {
						await delCart(c.car_id)
					}
				}
				this.getcartlist()
			},
			//根据购物车的id删除购物的一条数据
			deleleCartById: function(cartid) {
				delCart(cartid).then((res) => {
					this.getcartlist()
				})
			},

			quanxuan: async function() {
				//event.target.checked代表当期全选按钮是不是选中状态
				let ischecked;
				ischecked = event.target.checked ? 1 : 0
				console.log(ischecked)

				//现在仅仅操作当期的数据，实际数据我们还要重新更新
				let zong = 0
				for (let c of this.Order.cartlist) {
					c.cart_checked = ischecked
					if (ischecked == 1) {
						zong += c.cart_price * c.cart_count
					}

				}
				
				//保留两位小数
				zong = Math.floor(zong * 100) / 100
				
				//总赋值给vuex中的总
				this.setZong(zong)
				

				for (let c of this.Order.cartlist) {
					let params = {
						cart_count: c.cart_count,
						cart_checked: ischecked,
						car_id: c.car_id
					}
					//修改功能
					await updateCart(params)
				}
				this.getcartlist()

			},
			gaishuliang: function(cartid, count, ischeck) {
				console.log(cartid)
				console.log(count)
				console.log(ischeck)
				let params = {
					cart_count: count,
					cart_checked: ischeck,
					car_id: cartid
				}



				//修改功能
				updateCart(params).then((res) => {
					//修改成功，购物车的数据 重新刷新一下
					this.getcartlist()
				})
			},
			qie: function(e, cartid, count) {

				//如果当前打钩就是选中，选中的时候，将当前购物车的id ，还有 数量，还有是否选中的状态 提交进行修改
				let params = {
					cart_count: count,
					// cart_checked:
					car_id: cartid
				}
				if (e.target.checked) {
					params.cart_checked = 1
				} else {
					params.cart_checked = 0
				}
				//params就是修改购物车所需要的参数
				// console.log(params)
				updateCart(params).then((res) => {
					//修改成功，购物车的数据 重新刷新一下
					this.getcartlist()
				})
			},

			
		},
		created() {
			this.getcartlist()
		}
	}
</script>

<style scoped="scoped">
	.cart-header {
		border: 1px solid #ddd;
	}

	.cart-product {
		width: 600px;
	}

	.cart-param {
		width: 120px;
	}

	.cart-count {
		width: 120px;
		text-align: right;
	}

	.cart-name {
		width: 500px;
		height: 80px;
	}

	.btn-pay {
		outline: none;
		padding: 9px 20px;
		background-color: #c33;
		color: #fff;
		border: 1px solid #c33;
		border-radius: 6px;
	}

	.btn-pay:hover {
		background-color: #d33;
	}
	
	button[disabled]{
		color: #666666;
		background: #C2C2C2;
	}
	button[disabled]:hover{
		color: #666666;
		background: #C2C2C2;
	}
</style>

