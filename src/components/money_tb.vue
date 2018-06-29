<template>
    <div>
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                        <DatePicker :value="formSel.payTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="结算时间" @on-change="dateChange1"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                渠道<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="内蒙古代理商" :selected="formSel.selectTp=='内蒙古代理商'">内蒙古代理商</DropdownItem>
                                <DropdownItem name="百事贷" :selected="formSel.selectTp=='百事贷'">百事贷</DropdownItem>
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
                <Page :total="total" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple @on-change="changePage"></Page>
    </div>
</template>

<script>
export default {
    props:['tabMsg'],
    data:function(){
        return{
            tbWidth:100,
            total:100,
            vs:false,
            formSel:{
                input:'',
                selectTp:'',
                selectTm:'',
                payTm:''
        },
        /*formFr:{
            txtFr:'',
            descNm:0
        },
        ruleFr:{
            descLength:200,
            txtFr:[
                {require:true,type:'string',max:this.descLength,message:'备注最多为200字',trigger:'blur'}
            ]
        },*/
        columns1: [{
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '客户姓名',
            key: 'typeBs'
        },
        {
            title: '手机号码',
            key: 'name'
        },
        {
            title: '借款金额',
            key: 'addressNm'
        },
        {
            title: '放款金额',
            key: 'bank'
        },
        {
            title: '分期期数',
            key: 'type'
        },
        {
            title: '产品名称',
            key: 'namePr'
        },
        {
            title: '贴息金额',
            key: 'ops'
        },
        {
            title: '借款时间',
            key: 'selectTm',
            width:104
        },
        {
            title: '结算时间',
            key: 'payTm',
            width:104
        },
        {
            title: '审核人',
            key: 'who'
        },
        {
            title: '状态',
            key: 'status'
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
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.show(params.index);
                            }
                        }
                    }, '详情')
                ]);
            }
        }],
        data1: [{
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            },
            {
                userId: '319668',
                typeBs: '商户',
                name: '张一河',
                addressNm: '深圳市轻工科技有限公司',
                bank: '中国银行',
                type: '对公',
                namePr: '3562',
                ops: 0,
                selectTm:'2017/02/15  12:22:23',
                payTm:'2017/02/15  12:22:23',
                who:'张一',
                status:'等待放款'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=70;
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
        dateChange(date){
            this.formSel.selectTm=date;
        },
        dateChange1(date){
            this.formSel.payTm=date;
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
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            this.$emit('listenTo',index);
        }
    }
}
</script>