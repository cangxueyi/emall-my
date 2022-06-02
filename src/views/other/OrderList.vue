<template>
	<div class=" mt-10 py-10">
		<div id="orderlist" class="containner">
			<div class="text-left text-lg gray bold">我的订单</div>
			<template v-for="(o,i) in orderlist">
				<order :order="o"></order>
			</template>
		</div>
	</div>
</template>

<script>
	import {
		getorderlist
	} from '../../api/OrderApi.js'
	import Order from '../../components/Order.vue'
	export default {
		data: function() {
			return {
				orderlist: []
			}
		},
		methods: {
			getorderlist: async function() {
				let res = await getorderlist()
				this.orderlist=res.data.data
			}
		},
		created() {
			this.getorderlist()
		},
		components:{
			Order
		}
	}
</script>

<style>
</style>
