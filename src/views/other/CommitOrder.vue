<template>
	<div class=" mt-10 py-10">
		<div id="account" class="containner">
			<div class="text-left text-lg gray bold">填写并核对订单信息</div>
			<div class="mt-20 px-20 py-20 rounded box-shadow">
				<div class="text-left text-md dark bold">收货人信息</div>
				<div class="mt-10 flex justify-between item-center">
					<div class="flex item-center">
						<div class="address-name ml-20 py-10 px-20 rounded text-md dark hand hover-red">
							{{shoujianaddress.uaddr_name}}
						</div>
						<div class="ml-20 text-md dark">{{shoujianaddress.uaddr_name}}</div>
						<div class="ml-20 text-md dark">{{shoujianaddress.uaddr_province}}</div>
						<div class="ml-10 text-md dark">{{shoujianaddress.uaddr_city}}</div>
						<div class="ml-10 text-md dark">{{shoujianaddress.uaddr_district}}</div>
						<div class="ml-10 text-md dark">{{shoujianaddress.uaddr_address}}</div>
						<div class="ml-20 text-md dark">{{shoujianaddress.uaddr_phone}}</div>
					</div>
					<div class="text-md dark hover-red hand" @click="zhanshi">修改收货信息</div>
				</div>
			</div>
			<div v-show="show" class="flex justify-between item-center wrap" style="">
				<div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
					style="width: 100%;">
					<div class="hidden-columns">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div class="el-table__header-wrapper">
						<table cellspacing="0" cellpadding="0" border="0" class="el-table__header"
							style="width: 1199px;">
							<colgroup>
								<col name="el-table_3_column_17" width="180">
								<col name="el-table_3_column_18" width="180">
								<col name="el-table_3_column_19" width="180">
								<col name="el-table_3_column_20" width="135">
								<col name="el-table_3_column_21" width="131">
								<col name="el-table_3_column_22" width="131">
								<col name="el-table_3_column_23" width="131">
								<col name="el-table_3_column_24" width="131">
								<col name="gutter" width="0">
							</colgroup>
							<thead class="has-gutter">
								<tr class="">
									<th colspan="1" rowspan="1" class="el-table_3_column_17     is-leaf el-table__cell">
										<div class="cell">选择收件地址</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_18     is-leaf el-table__cell">
										<div class="cell">收件人</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_19     is-leaf el-table__cell">
										<div class="cell">电话</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_20     is-leaf el-table__cell">
										<div class="cell">省</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_21     is-leaf el-table__cell">
										<div class="cell">市</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_22     is-leaf el-table__cell">
										<div class="cell">区</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_23     is-leaf el-table__cell">
										<div class="cell">详细地址</div>
									</th>
									<th colspan="1" rowspan="1" class="el-table_3_column_24     is-leaf el-table__cell">
										<div class="cell">操作</div>
									</th>
									<th class="el-table__cell gutter" style="width: 0px; display: none;"></th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="el-table__body-wrapper is-scrolling-none">
						<table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1199px;">
							<colgroup>
								<col name="el-table_3_column_17" width="180">
								<col name="el-table_3_column_18" width="180">
								<col name="el-table_3_column_19" width="180">
								<col name="el-table_3_column_20" width="135">
								<col name="el-table_3_column_21" width="131">
								<col name="el-table_3_column_22" width="131">
								<col name="el-table_3_column_23" width="131">
								<col name="el-table_3_column_24" width="131">
							</colgroup>
							<tbody>
								<template v-for="(add,i) in addresslist">
									<tr class="el-table__row">
										<td rowspan="1" colspan="1" class="el-table_3_column_17   el-table__cell">
											<div class="cell">
												<input type="radio" @change="getshoujian" v-model="xuanzhong"
													:value="add.uaddr_id" />
											</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_18   el-table__cell">
											<div class="cell">{{add.uaddr_name}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_19   el-table__cell">
											<div class="cell">{{add.uaddr_phone}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_20   el-table__cell">
											<div class="cell">{{add.uaddr_province}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_21   el-table__cell">
											<div class="cell">{{add.uaddr_city}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_22   el-table__cell">
											<div class="cell">{{add.uaddr_district}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_23   el-table__cell">
											<div class="cell">{{add.uaddr_address}}</div>
										</td>
										<td rowspan="1" colspan="1" class="el-table_3_column_24   el-table__cell">
											<div class="cell">
												<button type="button" @click="guanli">管理地址</button>
											</div>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
					<div class="el-table__column-resize-proxy" style="display: none;"></div>
				</div>
			</div>

			<div class="mt-20 px-20 py-20 rounded box-shadow">
				<div class="text-left text-md dark bold">配送清单</div>
				<div class="flex justify-between item-center text-md dark bg-gray px-20 py-5 cart-header my-20">
					<div class="mx-5"></div>
					<div class="cart-product mx-5">商品</div>
					<div class="cart-param mx-5">单价</div>
					<div class="cart-param mx-5">数量</div>
					<div class="cart-param mx-5">小计</div>
					<div class="cart-param mx-5"></div>
				</div>
				<template v-for="(v,i) of commitorderlist">
					<div class="flex justify-between item-center text-md dark my-10 px-20 py-5 cart-body">
						<div class="mx-5"></div>
						<div class="cart-product mx-5 flex item-start">
							<img :src="'http://127.0.0.1:8001/img/'+v.cart_thumburl" class="rounded hand"
								style="width: 80px; height: 80px;">
							<div class="cart-name mx-10 text-left flex-column justify-between item-start">
								<div class="hover-red hand ">{{v.cart_name}}</div>
								<div class="cart-sku flex item-center">
									<template v-for="(attr,a) in JSON.parse(v.cart_sku)">
										<div class="gray text-sm pr-5 hand hover-red"> {{attr.value_name}} </div>
									</template>
								</div>
							</div>
						</div>
						<div class="cart-param mx-5">￥{{v.cart_price}}</div>
						<div class="cart-param mx-5">{{v.cart_count}}</div>
						<div class="cart-param mx-5">￥{{v.cart_count * v.cart_price}}</div>
						<div class="cart-param mx-5 hover-red hand"></div>
					</div>
				</template>
			</div>
			<div class="px-20 py-20">
				<div class="flex justify-end item-center text-right text-sm gray mt-20">
					<div class="account-left">商品总金额：</div>
					<div class="account-right">￥{{zong}}</div>
				</div>
				<div class="flex justify-end item-center text-right text-sm gray mt-10">
					<div class="account-left">配送费：</div>
					<div class="account-right">￥0</div>
				</div>
				<div class="flex justify-end item-center text-right text-sm gray mt-10">
					<div class="account-left">订单总金额：</div>
					<div class="account-right">￥{{zong}}</div>
				</div>
				<div class="flex justify-end item-center text-right text-sm gray mt-10">
					<div class="account-left">优惠金额：</div>
					<div class="account-right">￥0</div>
				</div>
				<div class="flex justify-end item-center text-right text-sm gray mt-20">
					<div class="account-left text-lg dark bold">应付总金额：</div>
					<div class="account-right text-xl red weight">￥{{zong}}</div>
				</div>
				<div class="flex justify-end item-center text-right text-sm gray mt-20">
					<div>配送至：</div>
					<div class="ml-5">{{shoujianaddress.uaddr_province}}</div>
					<div class="ml-5">{{shoujianaddress.uaddr_city}}</div>
					<div class="ml-5">{{shoujianaddress.uaddr_district}}</div>
					<div class="ml-5">{{shoujianaddress.uaddr_address}}</div>
					<div class="ml-20">收货人：</div>
					<div class="ml-5">{{shoujianaddress.uaddr_name}}</div>
					<div class="ml-5">{{shoujianaddress.uaddr_phone}}</div>
				</div>
				<div class="flex justify-end mt-20">
					<button class="btn-account hand" @click="commitorder">提交订单</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getaddresslist,
	} from '../../api/UserApi.js'
	import {
		tijiaoOrder,delCart
	} from '../../api/OrderApi.js'
	import {
		mapState
	} from 'vuex'
	export default {
		//一进页面获取地址列表
		data: function() {
			return {
				addresslist: [],
				shoujianaddress: {},
				xuanzhong: 0,
				show: false,
				commitorderlist: []
			}
		},
		computed: {
			...mapState(['Order']),
			zong: function() {
				let zong = 0
				for (let c of this.Order.cartlist) {
					if (c.cart_checked == 1) {
						zong += c.cart_price * c.cart_count
					}
				}
				//保留两位小数
				zong = Math.floor(zong * 100) / 100
				return zong
			}
		},
		methods: {
			//提交订单
			commitorder: async function() {
				// console.log(this.shoujianaddress)
				// console.log(this.commitorderlist)
				// console.log(this.zong)
				let params = {
					order_spuamount: this.zong,
					order_expressfee: 0,
					order_totalamount: this.zong,
					order_discountamount: 0,
					order_payamount: this.zong,
					"orderAddress.consignee": this.shoujianaddress.uaddr_name,
					"orderAddress.phone": this.shoujianaddress.uaddr_phone,
					"orderAddress.province": this.shoujianaddress.uaddr_province,
					"orderAddress.city": this.shoujianaddress.uaddr_city,
					"orderAddress.district": this.shoujianaddress.uaddr_district,
					"orderAddress.address": this.shoujianaddress.uaddr_address
				}
				//购买的商品的封装
				for (let i = 0; i < this.commitorderlist.length; i++) {
					//给params添加属性，属性叫
					//第i个商品的名称
					params["orderDetailList[" + i + "].odtails_name"] = this.commitorderlist[i].cart_name
					//第i个商品的图片
					params["orderDetailList[" + i + "].odtails_thumburl"] = this.commitorderlist[i].cart_thumburl
					//第i个商品的单价
					params["orderDetailList[" + i + "].odtails_price"] = this.commitorderlist[i].cart_price
					//第i个商品的数量
					params["orderDetailList[" + i + "].odtails_count"] = this.commitorderlist[i].cart_count
					//第i个商品的 每个商品的小计 单价乘以数量
					params["orderDetailList[" + i + "].odtails_amount"] = this.commitorderlist[i].cart_price * this
						.commitorderlist[i].cart_count
					//第i个商品的 状态
					params["orderDetailList[" + i + "].odtails_scorestatus"] = 0
					//第i个商品的 spu
					params["orderDetailList[" + i + "].odtails_spu_id"] = this.commitorderlist[i].cart_spuid
					////第i个商品的 sku对应的明细数组信息
					params["orderDetailList[" + i + "].odtails_sku"] = this.commitorderlist[i].cart_sku
				}
				let res = await tijiaoOrder(params)
				//数据提交完成
				//还需要删除 购物车列表
				// console.log(res.data)
				//this.commitorderlist 提交订单的列表 就是购物车被选中的列表
				this.pldel()
				//删除完了 ，跳转到详情页面
				this.$router.push("/pri/customer/orderdetail/"+res.data.data.id)
			},
			pldel: async function() {
				for (let c of this.commitorderlist) {
					await delCart(c.car_id)
				}
			},
			getshoujian: function() {
				//选择了哪个地址的id
				let id = event.target.value
				this.shoujianaddress = this.addresslist.filter(function(v) {
					return v.uaddr_id == id
				})[0]
			},
			zhanshi: function() {
				this.show = !this.show;
			},
			guanli: function() {
				//调到地址列表里面去
				this.$router.push("/pri/customer/address")
			},
			//获取所有的商品列表
			getalladdresslist() {
				//调用封装的api
				getaddresslist().then((res) => {
					this.addresslist = res.data.data
					//ccc就是筛选的当期的默认地址
					let ccc = this.addresslist.filter(function(v, i) {
						return v.uaddr_isdefault == 1
					})
					this.shoujianaddress = ccc[0]
					console.log(this.shoujianaddress)
					this.xuanzhong = this.shoujianaddress.uaddr_id
				})
			},
			//数据压根不存在 ，也就意味着 没有通过购物车提交订单，
			yzpageexist: function() {
				if (this.Order.cartlist.length <= 0) {
					this.$router.push("/pri/customer/cart")
				}
				this.commitorderlist = this.Order.cartlist.filter(function(v) {
					return v.cart_checked == 1
				})
			}
		},
		created() {
			this.getalladdresslist()
			//一进页面，如果订单没有数据，这个页面 不可能访问 直接跳转到购物车页面
			this.yzpageexist()
		}
	}
</script>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		text-indent: initial;
		border-spacing: 2px;
		border-color: grey;
	}
	td,th {
		padding: 0.25rem;
	}
	button {
		padding: 8px 10px;
		background-color: #42B983;
		border: none;
		border-radius: 5px;
		color: #fff;
	}
</style>
