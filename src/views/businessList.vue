<template>
  <div class="sections">
    <h1>收支明细</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="对方账号/交易流程号/客户手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="交易时间" @on-change="dateChange"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.moneyGv!=''}">
                                资金通道<span v-text="formSel.moneyGv"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.payType!=''}">
                                交易状态<span v-text="formSel.payType"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.payType=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.payType=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.payType=='中科诺'">中科诺</DropdownItem>
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
        	<Table border :columns="columns1" :data="data1" ref="table"></Table>
        </div>
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
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        vs:false,
        formSel:{
            input:'',
            selectTm:'',
            moneyGv:'',
            payType:''
        },
        columns1: [
        {
            title: '时间',
            key: 'nameBs',
            minWidth:104,
            fixed:'left'
        },
        {
            title: '对方账户名',
            key: 'typeBs',
            minWidth:104
        },
        {
            title: '对方账号',
            key: 'applyNm',
            minWidth:104
        },
        {
            title: '对方账户名',
            key: 'applyPh',
            minWidth:104
        },
        {
            title: '交易类型',
            key: 'name',
            minWidth:104
        },
        {
            title: '交易金额',
            key: 'type',
            minWidth:104
        },
        {
            title: '交易账户',
            key: 'addressCt',
            minWidth:104
        },
        {
            title: '交易状态',
            key: 'address',
            minWidth:104
        },
        {
            title: '余额',
            key: 'licenseNo',
            minWidth:104
        },
        {
            title: '支付流水号',
            key: 'payNo',
            minWidth:104
        },
        {
            title: '系统流水号',
            key: 'nameOp',
            minWidth:104
        },
        {
            title: '系统用户编号',
            key: 'timeOp',
            width:110
        },
        {
            title: '系统交易金额',
            key: 'licenseNo',
            minWidth:110
        },
        {
            title: '系统状态',
            key: 'status',
            minWidth:104
        }],
        data1: [{
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                payNo:'687888888',
                timeOp:'3667777777',
                timeOp:'5567778888',
                licenseNo: '中国银行',
                status: '对公'
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
            this.model1=true;
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
