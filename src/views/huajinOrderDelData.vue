
<template>
  <div class="sections">
    <h1>华金退单明细</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="24" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Row>
                        <Col span="12">
                            <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placeholder="退单时间" @on-change="dateChange"></DatePicker>
                        </Col>
                        <Col span="12">
                            <Button type="primary" class="float_right" @click="exportData">导出EXCEL</Button>
                        </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Col></Col>
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
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        formSel:{
            selectTm:''
        },
        columns1: [
        {
            title: '借款编号',
            key: 'payId'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '手机号',
            key: 'phone'
        },
        {
            title: '身份证号',
            key: 'ID'
        },
        {
            title: '华金产品ID',
            key: 'productId'
        },
        {
            title: '放款总金额',
            key: 'payMn'
        },
        {
            title: '当前期数',
            key: 'date'
        },
        {
            title: '总期数',
            key: 'dates'
        },
        {
            title: '应还本金',
            key: 'repayMn'
        },
        {
            title: '应还利息',
            key: 'repayDs'
        },
        {
            title: '应还总金额',
            key: 'countMn'
        },
        {
            title: '应还时间',
            key: 'repayTmRl',
            width:104
        },
        {
            title: '创建时间',
            key: 'beginTm',
            width:104
        },
        {
            title: '当前状态',
            key: 'paySt'
        },
        {
            title: '放款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '退款时间',
            key: 'repayTm',
            width:104
        },
        {
            title: '退款平台',
            key: 'place'
        },
        {
            title: '操作人',
            key: 'person'
        }],
        data1: [{
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            },
            {
                payId:'112',
                name: '3562',
                phone: '3562',
                ID: '2017/02/15  12:22:23',
                productId: '12',
                payMn: '3562',
                date: '12',
                dates: '3562',
                repayMn:'455',
                repayDs:'3%',
                countMn:'334',
                countTm: '12',
                repayTmRl: '2017/02/15  12:22:23',
                beginTm: '2017/02/15  12:22:23',
                paySt: 'y',
                payTm: '2017/02/15  12:22:23',
                repayTm: '2017/02/15  12:22:23',
                place:'信美宝付',
                person:'fdf'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
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
        dateChange(date){
            this.formSel.selectTm=date;
        },
        dateChange1(date){
            this.selectTm=date;
        },
        changePage(page){
            this.pageChk=page;
            /*this.data1=this.*/
        },
        chkDate(){

        },
        exportData(){

        },
        handleSubmit(name){
            /*this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })*/
        },
        countDesc(name){
            var desc=this.descForm.desc;
            this.descForm.descNm=desc.length;
            this.descForm.descCount=this.descForm.descNm+'/'+this.descRules.descLength;
            this.$refs[name].validate((valid) => {
                if(valid){

                }else{
                    this.$Message.error('表单验证失败!');
                }
            });
             
        }   
    }
}
</script>

