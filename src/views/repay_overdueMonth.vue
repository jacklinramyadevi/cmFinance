<template>
  <div class="sections">
      <h1>超90天逾期统计</h1>
      <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="18">
                <Form :model="formSel2" class="downMenu">
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
        <div class="table_show">
            <Table border :columns="columns2" :data="data2" ref="table"></Table>
            
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
        columns2:[{
            title:'借款月份',
            key:'time',
            width:104
        },{
            title:'资金方',
            key:'lenderCt'
        },{
            title:'逾期合计',
            key:'lenderMn'
        },{
            title:'逾期本金',
            key:'lenderRlMn'
        },{
            title:'利息',
            key:'lenderTmCt'
        },{
            title:'服务费',
            key:'lenderTmMn'
        },{
            title:'罚息',
            key:'payWithMn'
        },{
            title:'合计',
            key:'payjfMn'
        }],
        data2:[{
            time:'2016.9',
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
            time:'2016.10',
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
            time:'2016.11',
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
            time:'2016.12',
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
            time:'2017.1',
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
            time:'2017.2',
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
            time:'2017.3',
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
            payjfMn:'5000.00',
            payzkMn:'5000.00',
            zknPayMn:'5000.00',
            hjiPayMn:'5000.00',
            money:'5000.00'
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
