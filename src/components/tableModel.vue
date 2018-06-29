<template>
	<div class="tb_commom">
        <Table border :columns="columns" :data="data" ref="table"></Table></div>
	</div>
</template>

<script>
export default {
	name:'tb_commom',
	props:['columns','data'],
	data(){
		return{

		}
	},
	methods:{

	}
}
</script>