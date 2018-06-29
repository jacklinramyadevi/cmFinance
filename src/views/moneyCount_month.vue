<template>
  <div class="sections">
      <div class="pl_body">
        <Row class="form_row">
            <Col :sm="24" :xs="6"><div class="float_right">
                <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show lendTb moneyCount">
            <Table :columns="columns2" :data="data2" class="moneyTb ivu-table-border">
                <div class="table-header" slot="header">
                <table class="headerTb big_headerTb" cellpadding="0" cellspacing="0">
                <thead>
                    <tr><th rowspan="2" width="104" class="txt_center">月份</th><th colspan="6" class="txt_center">已收款</th><th colspan="5" class="txt_center">应收款</th><th colspan="5" class="txt_center">华人应还款</th><th colspan="4" class="txt_center">中科诺应还款</th><th rowspan="2" class="txt_center">收支差额</th></tr>
                    <tr><th title="已收金额">已收金额</th><th title="已收本金">已收本金</th><th title="已收利息">已收利息</th><th title="已收罚息">已收罚息</th><th title="已收服务费">已收服务费</th><th title="已收违约金">已收违约金</th><th title="应还款金额">应还款金额</th><th title="应还款本金">应还款本金</th><th title="应还款利息">应还款利息</th><th title="应还款罚息">应还款罚息</th><th title="应还款服务费">应还款服务费</th><th title="应还款金额">应还款金额</th><th title="应还款利息">应还款利息</th><th title="应还款服务费">应还款服务费</th><th title="已还款金额">已还款金额</th><th title="待还余额">待还余额</th><th title="应还款金额">应还款金额</th><th title="应还款利息">应还款利息</th><th title="已还款金额">已还款金额</th><th title="待还余额">待还余额</th></tr>
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
            key:'lenderCt',
            width:90
        },{
            key:'lenderMn',
            width:90
        },{
            key:'lenderRlMn',
            width:90
        },{
            key:'lenderTmCt',
            width:90
        },{
            key:'lenderTmMn',
            width:90
        },{
            key:'payWithMn',
            width:90
        },{
            key:'payjfMn',
            width:90
        },{
            key:'payzkMn',
            width:90
        },{
            key:'zknPayMn',
            width:90
        },{
            key:'hjiPayMn',
            width:90
        },{
            key:'money',
            width:90
        },{
            key:'payjfMna',
            width:90
        },{
            key:'payzkMna',
            width:90
        },{
            key:'zknPayMna',
            width:90
        },{
            key:'hjiPayMna',
            width:90
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
            money:'5000.00',
            payjfMna:'5000.00',
            payzkMna:'5000.00',
            zknPayMna:'5000.00',
            hjiPayMna:'5000.00'
        }/*,{
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
            money:'5000.00'
        }*/],
        columns3:[{
            key:'time',
            width:104
        },{
            key:'lenderCt'
        },{
            key:'lenderCxMn'
        },{
            key:'lenderYjMn'
        },{
            key:'lenderBfMn'
        },{
            key:'lenderYmtMn'
        },{
            key:'lenderHkMn'
        },{
            key:'lenderOutMn'
        },{
            key:'moneyCt'
        },{
            key:'moneyDf'
        }],
        data3:[{
            time:'2017-08-02',
            lenderCt:'12',
            lenderCxMn:'5000.00',
            lenderYjMn:'12',
            lenderBfMn:'5000.00',
            lenderYmtMn:'',
            lenderHkMn:'5000.00',
            lenderOutMn:'5000.00',
            moneyCt:'5000.00',
            moneyDf:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderCxMn:'5000.00',
            lenderYjMn:'12',
            lenderBfMn:'5000.00',
            lenderYmtMn:'',
            lenderHkMn:'5000.00',
            lenderOutMn:'5000.00',
            moneyCt:'5000.00',
            moneyDf:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderCxMn:'5000.00',
            lenderYjMn:'12',
            lenderBfMn:'5000.00',
            lenderYmtMn:'',
            lenderHkMn:'5000.00',
            lenderOutMn:'5000.00',
            moneyCt:'5000.00',
            moneyDf:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderCxMn:'5000.00',
            lenderYjMn:'12',
            lenderBfMn:'5000.00',
            lenderYmtMn:'',
            lenderHkMn:'5000.00',
            lenderOutMn:'5000.00',
            moneyCt:'5000.00',
            moneyDf:'5000.00'
        },{
            time:'2017-08-02',
            lenderCt:'12',
            lenderCxMn:'5000.00',
            lenderYjMn:'12',
            lenderBfMn:'5000.00',
            lenderYmtMn:'',
            lenderHkMn:'5000.00',
            lenderOutMn:'5000.00',
            moneyCt:'5000.00',
            moneyDf:'5000.00'
        },{
            time:'月汇总',
            lenderCt:'50000.00',
            lenderCxMn:'50000.00',
            lenderYjMn:'50000.00',
            lenderBfMn:'50000.00',
            lenderYmtMn:'50000.00',
            lenderHkMn:'50000.00',
            lenderOutMn:'50000.00',
            moneyCt:'50000.00',
            moneyDf:'50000.00'
        }]
    }
    },
    created:function(){
        if($(window).width()<768){
            this.tabSize='small';

            var arr=this.columns2;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=130;
            }
            this.columns2=arr;

            var arr3=this.columns3;
            for(var i=0;i<arr3.length;i++){
                arr3[i]['width']=this.tbWidth;
            }
            this.columns3=arr3;
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
