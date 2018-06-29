<template>
  <div class="sections">
      <h1>资金日对账</h1>
      <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="18">
                <Form :model="formSel2" class="downMenu">
                    <FormItem>
                        <DatePicker class="datesel" type="month" :value="formSel2.selectTm" format="yyyy-MM" placement="bottom-start" placeholder="日期区间" @on-change="dateChange"></DatePicker>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="6"><div class="float_right">
                <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show lendTb">
            <Table :columns="columns2" :data="data2" class="moneyTb ivu-table-border">
                <div class="table-header" slot="header">
                <table class="headerTb big_headerTb" cellpadding="0" cellspacing="0">
                <thead>
                    <tr><th rowspan="2" width="104">日期</th><th colspan="5" class="txt_center">系统</th><th colspan="5" class="txt_center">第三方支付</th><th colspan="5" class="txt_center">线下收支</th><th colspan="2">资金差异</th></tr>
                    <tr><th>放款</th><th>还款</th><th>手续费</th><th>退款</th><th>余额</th><th>付款</th><th>收款</th><th>手续费</th><th>退款</th><th>余额</th><th>付款</th><th>收款</th><th>手续费</th><th>退款</th><th>余额</th><th>收入</th><th>支出</th></tr>
                </thead></table></div>
            </Table>
            
        </div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="total" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple :current="pageChk" @on-change="changePage"></Page>
            
    </div>
    

  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        vs:false,
        vs2:false,
        vs3:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        tabSize:'default',
        formSel2:{
            moneyGv:''
        },
        columns2:[{
            key:'time',
            width:104
        },{
            key:'lenderCt'
        },{
            key:'lenderMn'
        },{
            key:'lenderRlMn'
        },{
            key:'lenderTmCt'
        },{
            key:'lenderTmMn'
        },{
            key:'payWithMn'
        },{
            key:'payjfMn'
        },{
            key:'payzkMn'
        },{
            key:'zknPayMn'
        },{
            key:'hjiPayMn'
        },{
            key:'money'
        }],
        data2:[{
            time:'2017-08-02',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
        }],
    }
    },
    created:function(){

            var arr=this.columns2;
            for(var i=0;i<arr.length;i++){
                if(i!=0)
                    arr[i]['width']=93;
            }
            this.columns2=arr;
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.moneyGv=' : '+val;
            }else{
                this.formSel.moneyGv='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel2.moneyGv=' : '+val;
            }else{
                this.formSel2.moneyGv='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel3.moneyGv=' : '+val;
            }else{
                this.formSel3.moneyGv='';
            }
        },
        orShow3(visible){
            this.vs3=visible;
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
        }
    }
}
</script>
