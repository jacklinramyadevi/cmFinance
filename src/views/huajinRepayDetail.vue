
<template>
  <div class="sections">
    <h1>华金借款核对表</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="24" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Row>
                        <Col span="12">
                            <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" placeholder="统计时间" @on-change="dateChange"></DatePicker>
                        </Col>
                        <Col span="12">
                            <Button type="primary" class="float_right" @click="exportData">导出EXCEL</Button>
                        </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Col></Col>
        </Row>
        <div class="table_show lendTb" style="overflow-x:scroll;">
            <Table :columns="columns1" :data="data1" class="moneyTb ivu-table-border" style="width:2900px;">
                <div slot="header">
                <table class="headerTb" cellpadding="0" cellspacing="0">
                <thead>
                    <tr><th>借款人姓名</th><th>收款人姓名</th><th colspan="10" class="txt_center">信美</th><th colspan="5" class="txt_center">宝付</th><th colspan="10" class="txt_center">华人</th><th title="是否存在差异">是否存在差异</th></tr>
                    <tr><th></th><th>张三</th><th>借款编号</th><th>发标金额</th><th>募集金额</th><th title="实际募集金额">实际募集金额</th><th>放款状态</th><th title="信美放款时间">信美放款时间</th><th>提现金额</th><th>提现时间</th><th>募资率</th><th>收益率</th><th>交易号</th><th>批次号</th><th>金额</th><th>收款人姓名</th><th>收款人卡号</th><th>借款人姓名</th><th>收款人姓名</th><th>产品ID</th><th>募集金额</th><th title="实际募集金额">实际募集金额</th>
                    <th>提现金额</th><th>提现时间</th><th>募资率</th><th>收益率</th><th>服务费金额</th><th></th></tr>
                </thead></table></div>
            </Table>
            
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
        total: 0,
        totalRecords: 0,
        pageSize: 10,
        pageChk:1,
        formSel:{
            selectTm:''
        },
        selectTm:'',
        countMn:'5000.00',
        columns1: [
        {
            key: 'payName'
        },
        {
            key: 'name'
        },
        {
            key: 'payId'
        },
        {
            key: 'issuingMn'
        },
        {
            key: 'raiseMn'
        },
        {
            key: 'payMnRel'
        },
        {
            key: 'paySt'
        },
        {
            key: 'issuingXinmei'
        },
        {
            key: 'mentionMn'
        },
        {
            key: 'mentionTm',
            width:104
        },
        {
            key: 'raiseLv'
        },
        {
            key: 'repayLv'
        },
        {
            key: 'repayId'
        },
        {
            key: 'NoId'
        },
        {
            key: 'money'
        },
        {
            key: 'payNameB'
        },
        {
            key: 'payCardNo'
        },
        {
            key: 'repayNameH'
        },
        {
            key: 'payNameH'
        },
        {
            key: 'productId'
        },
        {
            key: 'raiseMnH'
        },
        {
            key: 'raiseMnRelH'
        },
        {
            key: 'mentionMnH'
        },
        {
            key: 'mentionTmH'
        },
        {
            key: 'raiseLvH'
        },
        {
            key: 'payLvH'
        },
        {
            key: 'seviceMnH'
        },
        {
            key: 'difference'
        }],
        data1: [{
                payName:'kjk',
                name:'fgfg',
                payId:'fd22',
                issuingMn:'df',
                raiseMn:'434',
                payMnRel:'ee',
                paySt:'dfdf',
                issuingXinmei:'34343',
                mentionMn:'3434',
                mentionTm:'2017/02/15 12:22:23',
                raiseLv:'23%',
                repayLv:'2%',
                repayId:'1212g',
                NoId:'23erer',
                money:'244.00',
                payNameB:'fgfg',
                payCardNo:'3435',
                repayNameH:'fdfd',
                payNameH:'fdfd',
                productId:'e3r',
                raiseMnH:'4545',
                raiseMnRelH:'3434',
                mentionMnH:'545',
                mentionTmH:'fgf',
                raiseLvH:'2%',
                payLvH:'2%',
                seviceMnH:'35',
                difference:'2'
            },{
                payName:'kjk',
                name:'fgfg',
                payId:'fd22',
                issuingMn:'df',
                raiseMn:'434',
                payMnRel:'ee',
                paySt:'dfdf',
                issuingXinmei:'34343',
                mentionMn:'3434',
                mentionTm:'2017/02/15 12:22:23',
                raiseLv:'23%',
                repayLv:'2%',
                repayId:'1212g',
                NoId:'23erer',
                money:'244.00',
                payNameB:'fgfg',
                payCardNo:'3435',
                repayNameH:'fdfd',
                payNameH:'fdfd',
                productId:'e3r',
                raiseMnH:'4545',
                raiseMnRelH:'3434',
                mentionMnH:'545',
                mentionTmH:'fgf',
                raiseLvH:'2%',
                payLvH:'2%',
                seviceMnH:'35',
                difference:'2'
            },{
                payName:'kjk',
                name:'fgfg',
                payId:'fd22',
                issuingMn:'df',
                raiseMn:'434',
                payMnRel:'ee',
                paySt:'dfdf',
                issuingXinmei:'34343',
                mentionMn:'3434',
                mentionTm:'2017/02/15 12:22:23',
                raiseLv:'23%',
                repayLv:'2%',
                repayId:'1212g',
                NoId:'23erer',
                money:'244.00',
                payNameB:'fgfg',
                payCardNo:'3435',
                repayNameH:'fdfd',
                payNameH:'fdfd',
                productId:'e3r',
                raiseMnH:'4545',
                raiseMnRelH:'3434',
                mentionMnH:'545',
                mentionTmH:'fgf',
                raiseLvH:'2%',
                payLvH:'2%',
                seviceMnH:'35',
                difference:'2'
            },{
                payName:'kjk',
                name:'fgfg',
                payId:'fd22',
                issuingMn:'df',
                raiseMn:'434',
                payMnRel:'ee',
                paySt:'dfdf',
                issuingXinmei:'34343',
                mentionMn:'3434',
                mentionTm:'2017/02/15 12:22:23',
                raiseLv:'23%',
                repayLv:'2%',
                repayId:'1212g',
                NoId:'23erer',
                money:'244.00',
                payNameB:'fgfg',
                payCardNo:'3435',
                repayNameH:'fdfd',
                payNameH:'fdfd',
                productId:'e3r',
                raiseMnH:'4545',
                raiseMnRelH:'3434',
                mentionMnH:'545',
                mentionTmH:'fgf',
                raiseLvH:'2%',
                payLvH:'2%',
                seviceMnH:'35',
                difference:'2'
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

