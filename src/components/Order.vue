<template>
	<div class="mt-20 px-20 py-20 rounded box-shadow">
		<div class="flex item-center text-sm gray">
			<div>{{order.createtime}}</div>
			<div class="ml-20">订单号：{{order.order_no}}</div>
			<div class="ml-20">订单状态：
				<template v-if="order.order_status==0">待评价</template>
				<template v-if="order.order_status==1">已评价</template>
			</div>
			<div class="ml-20">支付金额：{{order.order_totalamount}}</div>
			<div><router-link :to="'/pri/customer/orderdetail/'+order.id" class="">查看当前订单详情</router-link></div>
		</div>
		<div class="flex justify-between item-center text-md dark bg-gray px-20 py-5 cart-header mt-20">
			<div class="mx-5"></div>
			<div class="cart-product mx-5">商品</div>
			<div class="cart-param mx-5">单价</div>
			<div class="cart-param mx-5">数量</div>
			<div class="cart-param mx-5">小计</div>
			<div class="cart-param mx-5"></div>
		</div>
		<template v-for="(od,j) in order.orderDetailList">
			<div class="flex justify-between item-center text-md dark my-10 px-20 py-5 cart-body">
				<div class="mx-5"></div>
				<div class="cart-product mx-5 flex item-start">
					<img :src="'http://127.0.0.1:8001/img/'+od.odtails_thumburl" class="rounded hand"
						style="width: 80px; height: 80px;">
					<div class="cart-name mx-10 text-left flex-column justify-between item-start">
						<div class="hover-red hand ">{{od.odtails_name}}</div>
						<div class="cart-sku flex item-center">
							<template v-for="(sk,k) in JSON.parse(od.odtails_sku)">
								<div class="gray text-sm pr-5 hand hover-red"> {{sk.value_name}} </div>
							</template>
						</div>
					</div>
				</div>
				<div class="cart-param mx-5">￥{{od.odtails_price}}</div>
				<div class="cart-param mx-5">{{od.odtails_count}}</div>
				<div class="cart-param mx-5">￥{{od.odtails_price*od.odtails_count}}</div>
				<div class="cart-param mx-5 hover-red hand"></div>
			</div>
		</template>
		<div class="flex item-center justify-end mt-20 text-sm gray">
			<div class="ml-20">收货人：{{order.orderAddress.consignee}}</div>
			<div class="ml-20">联系电话：{{order.orderAddress.phone}}</div>
			<div class="ml-20">配送地址：
				{{order.orderAddress.province}}
				{{order.orderAddress.city}} 
				{{order.orderAddress.district}}
				{{order.orderAddress.address}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['order']
	}
</script>

<style>
</style>
