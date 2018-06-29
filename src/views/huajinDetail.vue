
<template>
  <div class="sections">
    <h1>华金数据传输记录</h1>
    <div class="pl_body">
        <Form :model="formSel" class="downMenu">
            <FormItem>
                <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd"  placeholder="上传时间" @on-change="dateChange"></DatePicker>
            </FormItem>
        </Form>
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
            title: '债权包编号',
            key: 'userId'
        },
        {
            title: '风控确认书ID',
            key: 'windCtrId'
        },
        {
            title: '借款期限',
            key: 'paymt'
        },
        {
            title: '借款笔数',
            key: 'money'
        },
        {
            title: '借款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '总金额',
            key: 'payMn'
        },
        {
            title: '传输时间',
            key: 'countTm',
            width:104
        }],
        data1: [{
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
            },
            {
                userId: '3562',
                windCtrId: '3562',
                paymt: '2017/02/15  12:22:23',
                money: '12',
                payTm: '2017/02/15  12:22:23',
                payMn: '3562',
                countTm: '2017/02/15  12:22:23'
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
        show(index){
            this.descForm.desc='';
            this.model1=true;
            this.descForm.descCount=this.descForm.descNm+'/'+this.descRules.descLength;
        },
        chkDate(){

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

