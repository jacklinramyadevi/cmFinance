<template>
    <div>
        <Row class="form_row">
            <Col :sm="22" :xs="18">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.dateChk!=''}">
                                期限<span v-text="formSel.dateChk"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.dateChk=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(d,i) in formSel.dateList" :key="i" name="d" :selected="formSel.dateChk=='d'">{{d}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.moneyGv!=''}">
                                资金提供方<span v-text="formSel.moneyGv"></span>
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
                                省份<span v-text="formSel.payType"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.payType=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.payType=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.payType=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.age!=''}">
                                年龄<span v-text="formSel.age"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.age=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.age=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.age=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                渠道名称<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="打款成功" :selected="formSel.selectTp=='打款成功'">打款成功</DropdownItem>
                                <DropdownItem name="打款失败" :selected="formSel.selectTp=='打款失败'">打款失败</DropdownItem>
                                <DropdownItem name="打款处理中" :selected="formSel.selectTp=='打款处理中'">打款处理中</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.productName!=''}">
                                产品名称<span v-text="formSel.productName"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.productName=='全部'">全部</DropdownItem>
                                <DropdownItem name="打款成功" :selected="formSel.productName=='打款成功'">打款成功</DropdownItem>
                                <DropdownItem name="打款失败" :selected="formSel.productName=='打款失败'">打款失败</DropdownItem>
                                <DropdownItem name="打款处理中" :selected="formSel.productName=='打款处理中'">打款处理中</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="6"><div class="float_right">
                <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show lendTb mineTb">
            <table class="headerTb big_headerTb" cellpadding="0" cellspacing="0">
                <thead>
                    <tr><th rowspan="2" class="txt_center">逾期天数</th><th rowspan="2" class="txt_center">笔数</th><th rowspan="2" class="txt_center">逾期合计</th><th rowspan="2" class="txt_center">逾期本金</th><th rowspan="2" class="txt_center">逾期利息</th><th rowspan="2" class="txt_center">逾期服务费</th><th rowspan="2" class="txt_center">罚息</th><th colspan="3" class="txt_center">逾期本金</th><th colspan="3" class="txt_center">逾期利息</th><th colspan="3" class="txt_center">逾期服务费</th></tr>
                    <tr><th title="占累计放款比例">占累计放款比例</th><th title="占到期本金比例">占到期本金比例</th><th title="占本金余额比例">占本金余额比例</th><th title="占累计利息比例">占累计利息比例</th><th title="占到期利息比例">占到期利息比例</th><th title="占利息余额比例">占利息余额比例</th><th title="占累计放款服务费比例">占累计放款服务费比例</th><th title="占到期服务费比例">占到期服务费比例</th><th title="占服务费余额比例">占服务费余额比例</th></tr>
                </thead>
                <tbody>
                    <tr v-for="d in data1"><td>{{d.time}}</td><td>{{d.lenderCt}}</td><td>{{d.lenderMn}}</td><td>{{d.lenderRlMn}}</td><td>{{d.lenderTmCt}}</td><td>{{d.lenderTmMn}}</td><td>{{d.payWithMn}}</td><td>{{d.payjfMn}}</td><td>{{d.payzkMn}}</td><td>{{d.zknPayMn}}</td><td>{{d.zknPayMn}}</td><td>{{d.hjiPayMn}}</td><td>{{d.money}}</td><td>{{d.lenderCt1}}</td><td>{{d.lenderMn1}}</td><td>{{d.lenderRlMn1}}</td></tr>
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
        formSel:{
            selectTm:'',
            dateList:['10天','20天','30天','1个月','3个月','6个月','9个月','12月','24个月'],
            dateChk:'',
            moneyGv:'',
            payType:'',
            age:'',
            selectTp:'',
            productName:''
        },
        data1:[{
            time:'1-30天',
            lenderCt:'12',
            lenderMn:'5000.00',
            lenderRlMn:'12',
            lenderTmCt:'5000.00',
            lenderTmMn:'666',
            payWithMn:'5000.00',
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00',
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
            lenderTmCt1:'5000.00',
        },{
            time:'31-60天',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
            lenderTmCt1:'5000.00',
        },{
            time:'61-90天',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        },{
            time:'91-180天',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        },{
            time:'181-270天',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        },{
            time:'271-360天',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        },{
            time:'360天以上',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        },{
            time:'合计',
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
            lenderCt1:'12',
            lenderMn1:'5000.00',
            lenderRlMn1:'12',
        }]
    }
    },
    created:function(){
        this.data1=this.data2;
        this.tabSize='small';

        var arr=this.columns1;
        for(var i=0;i<arr.length;i++){
            if(i!=0){
                arr[i]['width']=108;
            }
        }
        this.columns1=arr;
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