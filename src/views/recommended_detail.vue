<template>
  <div class="sections">
    <h1>推荐奖励记录</h1>
    <div class="pl_body">
    	<Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="提现时间" @on-change="dateChange"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                提现状态<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="打款成功" :selected="formSel.selectTp=='打款成功'">打款成功</DropdownItem>
                                <DropdownItem name="打款失败" :selected="formSel.selectTp=='打款失败'">打款失败</DropdownItem>
                                <DropdownItem name="打款处理中" :selected="formSel.selectTp=='打款处理中'">打款处理中</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                </Form>
	    	</Col>
			<Col :sm="2" :xs="24"><div class="float_right">
				<Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
	    	</div></Col>
    	</Row>
    	<div class="table_show">
		<Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="totalRecords" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="totalRecords" simple :current="pageChk" @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
    	vs: false,
        tbWidth:100,
        pageSize:10,
        totalRecords:0,
        total:0,
        pageChk:1,
    	formSel:{
    		input:'',
	    	selectTp:'',
	    	selectTm:[],
	    },
        columns1: [
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '借款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '借款编号',
            key: 'payId'
        },
        {
            title: '借款金额',
            key: 'money'
        },
        {
            title: '推荐人姓名',
            key: 'recommendNm'
        },
        {
            title: '提现状态',
            key: 'status'
        },
        {
            title: '提现流水号',
            key: 'mentionId'
        },
        {
            title: '提现时间',
            key: 'mentionTm',
            width:104
        },
        {
            title: '备注',
            key: 'desc'
        }],
        data1: [{
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            },
            {
                name: '张一河',
                payTm: '2017-02-05 12:12:21',
                payId: '176730972074',
                money: '4566',
                recommendNm: '176730972074     ',
                status: '中国银行',
                mentionId: '332556198805052356',
                mentionTm: '2017-02-05 12:12:21',
                desc: 0
            }]
	    }
	},
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
            this.columns1=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
	methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.selectTp=' : '+val;
            }else{
                this.formSel.selectTp='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
            /*if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                });
            } else*/ if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } /*else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: '自定义数据',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }*/
        },
        changePage(page){
            this.pageChk=page;
        	/*this.data1=this.*/
        },
        handleSubmit(name){
        	/*this.$refs[name].validate((valid) => {
        		if(valid){
        			
        		}else{
        			this.$Message.error('表单验证失败!');
        		}
        	})*/
        }  
    }
}
</script>

