<template>
  <div class="sections">
    <h1>借款合同</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                选择省份<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="内蒙古" :selected="formSel.selectTp=='内蒙古'">内蒙古</DropdownItem>
                                <DropdownItem name="北京市" :selected="formSel.selectTp=='北京市'">北京市</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.moneyGv!=''}">
                                资金提供方<span v-text="formSel.moneyGv"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData">批量下载合同</Button>
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
        vs2: false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        formSel:{
            input:'',
            selectTp:'',
            selectTm:'',
            moneyGv:''
        },
        columns1: [{
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '客户手机',
            key: 'phone'
        },
        {
            title: '产品类型',
            key: 'addressNm'
        },
        {
            title: '年利率',
            key: 'cardNb'
        },
        {
            title: '借款期限',
            key: 'bank'
        },
        {
            title: '还款方式',
            key: 'type'
        },
        {
            title: '融资金额',
            key: 'money'
        },
        {
            title: '省市',
            key: 'address'
        },
        {
            title: '借款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '资金提供方',
            key: 'payGv'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                
                            }
                        }
                    }, '下载合同')
                ]);
            }
        }],
        data1: [{
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            },
            {
                userId: '319668',
                name: '张一河',
                phone: '12336588',
                addressNm: '深圳市轻工科技有限公司',
                cardNb: '176730972074     ',
                bank: '中国银行',
                type: '对公',
                money: '3562',
                address:'深圳市轻工科技有限公司',
                payTm: '2017-02-05 12:12:21',
                payGv:'华金'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['fixed']='right';
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
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel.moneyGv=' : '+val;
            }else{
                this.formSel.moneyGv='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData () {

        },
        changePage(page){
            this.pageChk=page;
            /*this.data1=this.*/
        }   
    }
}
</script>
