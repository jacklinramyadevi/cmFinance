<template>
    <div>
        <Row class="form_row">
            <Col :sm="24" :xs="6"><div class="float_right">
                <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show lendTb mineTb moneyCount">
            <table class="headerTb big_headerTb" cellpadding="0" cellspacing="0">
                <thead>
                    <tr><th rowspan="2" class="txt_center">日期</th><th colspan="6" class="txt_center">已收款</th><th colspan="5" class="txt_center">应收款</th><th colspan="5" class="txt_center">华人应还款</th><th colspan="4" class="txt_center">中科诺应还款</th><th rowspan="2" class="txt_center">收支差额</th></tr>
                    <tr><th title="已收金额">已收金额</th><th title="已收本金">已收本金</th><th title="已收利息">已收利息</th><th title="已收罚息">已收罚息</th><th title="已收服务费">已收服务费</th><th title="已收违约金">已收违约金</th><th title="应还款金额">应还款金额</th><th title="应还款本金">应还款本金</th><th title="应还款利息">应还款利息</th><th title="应还款罚息">应还款罚息</th><th title="应还款服务费">应还款服务费</th><th title="应还款金额">应还款金额</th><th title="应还款利息">应还款利息</th><th title="应还款服务费">应还款服务费</th><th title="已还款金额">已还款金额</th><th title="待还余额">待还余额</th><th title="应还款金额">应还款金额</th><th title="应还款利息">应还款利息</th><th title="已还款金额">已还款金额</th><th title="待还余额">待还余额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="d in data1"><td>{{d.time}}</td><td>{{d.lenderCt}}</td><td>{{d.lenderMn}}</td><td>{{d.lenderRlMn}}</td><td>{{d.lenderTmCt}}</td><td>{{d.lenderTmMn}}</td><td>{{d.payWithMn}}</td><td>{{d.payjfMn}}</td><td>{{d.payzkMn}}</td><td>{{d.zknPayMn}}</td><td>{{d.zknPayMn}}</td><td>{{d.hjiPayMn}}</td><td>{{d.money}}</td><td>{{d.lenderCt1}}</td><td>{{d.lenderMn1}}</td><td>{{d.lenderTmMn2}}</td>
                    <td>{{d.lenderTmCt2}}</td><td>{{d.zknPayMn}}</td><td>{{d.lenderTmCt110}}</td><td>{{d.lenderTmMn11}}</td><td>{{d.lenderTmCt21}}</td><td>{{d.lenderTmMn21}}</td></tr>
                </tbody>
            </table>
        </div>

  </div>
</template>

<script>
export default {
    props:['tabMsg'],
  data () {
    return {
        vs:false,
        vs2:false,
        vs3:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        data1:[{
            time:'1998-02-18',
            lenderCt:'4677 lenderCt',
            lenderMn:'4677 lenderMn',
            lenderRlMn:'4677 lenderRlMn',
            lenderTmCt:'4677 lenderTmCt',
            lenderTmMn:'4677 lenderTmMn',
            payWithMn:'46 77 payWithMn',
            payjfMn:'4677 payjfMn',
            payzkMn:'4677 payzkMn',
            zknPayMn:'4677 zknPayMn',
            hjiPayMn:'4677 hjiPayMn',
            money:'4677 money',
            lenderMn1:'24343 lenderMn1',
            lenderRlMn1:'24343 lenderRlMn1',
            lenderTmCt1:'24343 lenderTmCt1',
            lenderTmMn1:'24343 lenderTmMn1',
            lenderTmCt2:'24343 lenderTmCt2',
            lenderTmMn2:'24343 ',
            lenderTmCt110:'3434',
            lenderTmMn11:'55',
            lenderTmCt21:'33',
            lenderTmMn21:'444'
        }]
    }
    },
    created:function(){
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
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
