<template>
  <div class="sections">
    <h1>按期还款明细</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                        <DatePicker :value="formSel.repayTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="应还时间" @on-change="dateChange1"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.channelBs!=''}">
                                业务渠道<span v-text="formSel.channelBs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.channelBs=='全部'">全部</DropdownItem>
                                <DropdownItem name="普通" :selected="formSel.channelBs=='普通'">普通</DropdownItem>
                                <DropdownItem name="安利" :selected="formSel.channelBs=='安利'">安利</DropdownItem>
                                <DropdownItem name="华人" :selected="formSel.channelBs=='华人'">华人</DropdownItem>
                                <DropdownItem name="国美" :selected="formSel.channelBs=='国美'">国美</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu4" @on-visible-change="orShow4">
                            <Button type="ghost" :class="{active:vs4,chk:formSel.typePd!=''}">
                                产品类型<span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="消费分期" :selected="formSel.typePd=='消费分期'">消费分期</DropdownItem>
                                <DropdownItem name="数码3C分期" :selected="formSel.typePd=='数码3C分期'">数码3C分期</DropdownItem>
                                <DropdownItem name="小美钱包" :selected="formSel.typePd=='小美钱包'">小美钱包</DropdownItem>
                                <DropdownItem name="美容分期" :selected="formSel.typePd=='美容分期'">美容分期</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.typeBs!=''}">
                                业务类型<span v-text="formSel.typeBs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.typeBs=='全部'">全部</DropdownItem>
                                <DropdownItem name="现金贷" :selected="formSel.typeBs=='现金贷'">现金贷</DropdownItem>
                                <DropdownItem name="消费贷" :selected="formSel.typeBs=='消费贷'">消费贷</DropdownItem>
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
                <Page :total="total" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple :current="pageChk" @on-change="changePage"></Page>
    </div>
    <Modal v-model="model1" title="详情" class="userInfo noFooter" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form>
                        <FormItem label="借款编号"><span>XM201555612165123</span></FormItem>
                        <FormItem label="客户姓名"><span>张一河</span></FormItem>
                        <FormItem label="借款金额"><span>500.00</span></FormItem>
                        <FormItem label="借款利率（月）"><span>1.50%</span></FormItem>
                        <FormItem label="服务费利率（月）"><span>2.00%</span></FormItem>
                        <FormItem label="当前期数"><span>2</span></FormItem>
                        <FormItem label="分期期数"><span>12个月</span></FormItem>
                        <FormItem label="借款时间"><span>2017-06-05 13:12:32 </span></FormItem>
                        <FormItem label="应收本金"><span>500.00</span></FormItem>
                        <FormItem label="应收利息"><span>50.00</span></FormItem>
                        <FormItem label="应收服务费"><span>50.00</span></FormItem>
                        <FormItem label="应收罚息"><span>0.00</span></FormItem>
                        <FormItem label="应收违约金"><span>0.00</span></FormItem>
                        <FormItem label="应还合计"><span>500.00</span></FormItem>
                        <FormItem label="应还时间"><span>2017-06-05 13:12:32 </span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form>
                        <FormItem label="资金提供方"><span>华人金控</span></FormItem>
                        <FormItem label="实收本金"><span>5000.00</span></FormItem>
                        <FormItem label="实收利息"><span>50.00</span></FormItem>
                        <FormItem label="实收服务费"><span>50.00</span></FormItem>
                        <FormItem label="实收罚息"><span>10.00</span></FormItem>
                        <FormItem label="实收违约金"><span>10.00</span></FormItem>
                        <FormItem label="实收合计"><span>500.00</span></FormItem>
                        <FormItem label="实际还款时间"><span>2017-06-06 12:12:21</span></FormItem>
                        <FormItem label="还款状态"><span>正常未还款</span></FormItem>
                        <FormItem label="还款渠道"><span>线上/线下</span></FormItem>
                        <FormItem label="还款平台"><span>信美宝付</span></FormItem>
                        <FormItem label="结算流水号"><span>tsfsdfsdf5s62d6f5gdsfg2df6gdfgd555</span></FormItem>
                        <FormItem label="业务类型"><span>消费贷</span></FormItem>
                        <FormItem label="产品名称"><span>消费分期</span></FormItem>
                        <FormItem label="业务渠道"><span>普通</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
        <div slot="footer"></div>

    </Modal>

  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        vs: false,
        vs2: false,
        vs3: false,
        vs4: false,
        model1:false,
        tbWidth:100,
        total:0,
        totalRecords: 0,
        pageSize: 10,
        pageChk:1,
        formSel:{
            input:'',
            channelBs:'',
            typePd:'',
            typeBs:'',
            selectTm:'',
            repayTm:'',
            moneyGv:''
        },
        columns1: [
        {
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '借款金额',
            key: 'money'
        },
        {
            title: '借款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '应还时间',
            key: 'repayTm',
            width:104
        },
        {
            title: '资金提供方',
            key: 'moneyGv'
        },
        {
            title: '业务类型',
            key: 'typeBs'
        },
        {
            title: '产品名称',
            key: 'namePd'
        },
        {
            title: '业务渠道',
            key: 'channelBs'
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
                            type: 'primary',
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
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
            },
            {
                userId: '319668',
                name: '商户',
                money: 1767,
                payTm: '2017-02-05 12:12:21',
                repayTm: '2017-02-05 12:12:21',
                moneyGv:'华金',
                typeBs:'rrre',
                namePd:'中国银行',
                channelBs: '55hhh'
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
                this.formSel.typeBs=' : '+val;
            }else{
                this.formSel.typeBs='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.channelBs=' : '+val;
            }else{
                this.formSel.channelBs='';
            }
        },
        orShow3(visible){
            this.vs3=visible;
        },
        showMenu4(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow4(visible){
            this.vs4=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        dateChange1(date){
            this.formSel.repayTm=date;
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
            this.model1=true;
        }  
    }
}
</script>
