<template>
  <div class="sections">
      <div class="pl_body">
          <Tabs :size="tabSize" v-model="tabVal" @on-click="tabClick">
            <TabPane label="每月应收还款" name="tab1">
                <Row class="form_row">
                <Col :sm="22" :xs="24">
                    <Form :model="formSel" class="downMenu">
                        <FormItem>
                            <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
                            <!-- <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                                <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
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
                            </Dropdown> -->

                            <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                                <Button type="ghost" :class="{active:vs3,chk:formSel.moneyGv!=''}">
                                    资金提供方<span v-text="formSel.moneyGv"></span>
                                    <Icon type="arrow-down-b"></Icon>
                                </Button>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                    <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                                    <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                             <!-- <Button type="primary" @click="loadContent">查询</Button> -->
                            <Button v-if="formSel.moneyGv!='' || formSel.selectTm.length>0" @click="reset">重置</Button>
                        </FormItem>
                    </Form>
                    </Col>
                    <Col :sm="2" :xs="24"><div class="float_right">
                        <Button type="success" @click="loadContentSel"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
                    </div></Col>
                </Row>
                <div class="table_show">
                <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
                <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" :page-size="pageSize" :current="pageChk" show-elevator @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" :current="pageChk" simple @on-change="changePage"></Page>


            </TabPane>
            <TabPane label="每月已还款" name="tab2">
                <Row class="form_row">
                    <Col :sm="22" :xs="24">
                        <Form :model="formSel2" class="downMenu">
                            <FormItem>
                                <DatePicker class="datesel" :value="formSel2.selectTm" format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange2"></DatePicker>
                                <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                                    <Button type="ghost" :class="{active:vs2,chk:formSel2.typePd!=''}">
                                        产品类型<span v-text="formSel2.typePd"></span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="全部" :selected="formSel2.typePdValue==-1">全部</DropdownItem>
                                        <DropdownItem name="0:现金贷" :selected="formSel2.typePdValue==0">现金贷</DropdownItem>
                                        <DropdownItem name="1:消费贷" :selected="formSel2.typePdValue==1">消费贷</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown trigger="click" class="showMn" @on-click="showMenu4" @on-visible-change="orShow4">
                                    <Button type="ghost" :class="{active:vs4,chk:formSel2.moneyGv!=''}">
                                        资金提供方<span v-text="formSel2.moneyGv"></span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="全部" :selected="formSel2.moneyGv=='全部'">全部</DropdownItem>
                                        <DropdownItem name="华金" :selected="formSel2.moneyGv=='华金'">华金</DropdownItem>
                                        <DropdownItem name="中科诺" :selected="formSel2.moneyGv=='中科诺'">中科诺</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                 <!-- <Button type="primary" @click="loadContent1">查询</Button> -->
                                <Button v-if="formSel2.selectTm.length>0 || formSel2.typePd!='' || formSel2.moneyGv!=''" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col :sm="2" :xs="24"><div class="float_right">
                        <Button type="success" @click="loadContentSel1"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
                    </div></Col>
                </Row>
                <div class="table_show">
                <Table border :columns="columns2" :data="data2" ref="table2"></Table></div>
                <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" :page-size="pageSize" show-elevator :current="pageChk" @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" :current="pageChk" simple @on-change="changePage"></Page>
            </TabPane>
            <TabPane label="逾期未还款" name="tab3">
                <Row class="form_row">
                    <Col :sm="22" :xs="24">
                        <Form :model="formSel3">
                            <FormItem>
                                <DatePicker class="datesel" :value="formSel3.selectTm" format="yyyy-MM-dd" placement="bottom-start" placeholder="查询截止时间" @on-change="dateChange3" ></DatePicker>
                                <Button v-if="formSel3.selectTm!=''" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col :sm="2" :xs="24"><div class="float_right">
                        <Button type="success" @click="loadContentSel2"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
                    </div></Col>
                </Row>
                <div class="table_show">
                <Table border :columns="columns3" :data="data3" ref="table3"></Table></div>
                <Row :gutter="16">
                    <Col :sm="12" :xs="24">
                        <!-- <Col span="12">累计放贷金额：<span>56261212121.00</span></Col> -->
                        <Col span="12">总逾期率：<span v-html="overdueRate"></span>%</Col>
                    </Col>
                    <Col :sm="12" :xs="24"></Col>
                </Row>
                <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" :page-size="pageSize" show-elevator :current="pageChk" @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" :current="pageChk" simple @on-change="changePage"></Page>
            </TabPane>
        </Tabs>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import '../router/dateFormat.js';

export default {
  name: 'sections',
  data () {
    return {
        vs: false,
        vs2: false,
        vs3: false,
        vs4: false,
        tbWidth:100,
        tabSize:'default',
        tabVal:'tab1',
        startPage:0,
        pageSize:10,
        totalRecords:0,
        total:0,
        pageChk:1,
        formSel:{
            selectTm:[],
            /*typePd:'',*/
            moneyGv:'',
            moneyGvValue:''
        },
        formSel2:{
            selectTm:[],
            typePd:'',
            typePdValue:-1,
            moneyGv:'',
            moneyGvValue:''
        },
        formSel3:{
            selectTm:''
        },
        overdueRate:0,
        columns1: [
        {
            title: '应收时间',
            key: 'planLtm',
            width:104
        },
        {
            title: '产品类型',
            key: 'type'
        },
        {
            title: '应收还款笔数',
            key: 'planCount'
        },
        {
            title: '应收本金金额',
            key: 'planPrp'
        },
        {
            title: '应收利息',
            key: 'planInt'
        },
        {
            title: '应收服务费',
            key: 'planSfe'
        },
        {
            title: '日应收本息合计',
            key: 'planAmt'
        }],
        data1: [
            /*{
                repayTm:'小计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                dateMoneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            },
            {
                repayTm:'总计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                dateMoneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            }*/],
            columns2: [
            {
                title: '实收时间',
                key: 'realTm',
                width:104
            },
            {
                title: '产品类型',
                key: 'type'
            },
            {
                title: '实收还款笔数',
                key: 'realCount'
            },
            {
                title: '实收本金',
                key: 'realPrp'
            },
            {
                title: '实收利息',
                key: 'realInt'
            },
            {
                title: '实收服务费',
                key: 'realSfe'
            },
            {
                title: '实收逾期罚息',
                key: 'realPin'
            },
            {
                title: '实收提前结清违约金',
                key: 'realDflt'
            },
            {
                title: '日实收本息合计',
                key: 'realAmt'
            }],
            data2: [
            /*{
                repayTm:'小计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                overdueMn:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayOverdueMn:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                dateMoneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            },
            {
                repayTm:'总计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                overdueMn:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayOverdueMn:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                dateMoneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            }*/],
            columns3: [
            {
                title: '逾期天数',
                key: 'overdueDay'
            },
            {
                title: '笔数',
                key: 'overdueCount'
            },
            {
                title: '本金',
                key: 'overduePrp'
            },
            {
                title: '利息',
                key: 'overdueInt'
            },
            {
                title: '服务费',
                key: 'overdueSfe'
            },
            {
                title: '逾期本金占累计借款比例',
                key: 'overdueRate'
            }],
            data3: [
            /*{
                repayTm:'小计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            },
            {
                repayTm:'总计',
                typePd: '消费贷<br/>现金贷（无贴息）<br/>当日现金贷（有贴息）<br/>提前结清订单<br/>截止5.31日逾期90天订单',
                repayCt: '100<br/>50<br/>20<br/>1<br/>5',
                moneyCt: '500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                repayLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00',
                serviceLv:'500.00<br/>500.00<br/>500.00<br/>5000.00<br/>500.00'
            }*/]
        }
    },
    created:function(){
        if($(window).width()<768){
            this.tabSize='small';

            var arr=this.columns1;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
            this.columns1=arr;

            var arr2=this.columns2;
            for(var i=0;i<arr2.length;i++){
                arr2[i]['width']=this.tbWidth;
            }
            this.columns2=arr2;

            var arr3=this.columns3;
            for(var i=0;i<arr3.length;i++){
                arr3[i]['width']=this.tbWidth;
            }
            this.columns3=arr3;
        }
        this.loadContent();
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        tabClick(name){
            this.startPage=0;
            this.pageSize=10;
            this.totalRecords=0;
            this.total=0;
            this.pageChk=1;
            if(this.tabVal=='tab1'){
                this.loadContent();
            }else if(this.tabVal=='tab2'){
                this.loadContent1();
            }else{
                this.loadContent2();
            }

        },
        /*showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },*/
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel2.typePd=' : '+val.split(":")[1];
                this.formSel2.typePdValue = val.split(":")[0];
            }else{
                this.formSel2.typePd='';
                this.formSel2.typePdValue = -1;
            }
            this.pageChk=1;
            this.loadContent1();
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.moneyGv=' : '+val;
                 this.formSel.moneyGvValue = val;
            }else{
                this.formSel.moneyGv='';
                 this.formSel.moneyGvValue = '';
            }
            this.pageChk=1;
            this.loadContent();
        },
        orShow3(visible){
            this.vs3=visible;
        },
        showMenu4(val){
            if(val!='全部' && val!=''){
                this.formSel2.moneyGv=' : '+val;
                this.formSel2.moneyGvValue = val;
            }else{
                this.formSel2.moneyGv='';
                this.formSel2.moneyGvValue = '';
            }
            this.pageChk=1;
            this.loadContent1();
        },
        orShow4(visible){
            this.vs4=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
            this.pageChk=1;
            this.loadContent();
        },
        dateChange2(date){
            this.formSel2.selectTm=date;
            this.pageChk=1;
            this.loadContent1();
        },
        dateChange3(date){
            this.formSel3.selectTm=date;
            this.pageChk=1;
            this.loadContent2();
        },
        /*exportData (type) {
            this.loadContentSel();
            if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: '排序和过滤后的数据',
                    columns:this.columns1,
                    data:this.data
                    //original: false
                });
            }
        },*/
        loadContentSel(){
            let repayStart='';
            let repayEnd='';
            if(this.formSel.selectTm.length>0){
                repayStart=this.formSel.selectTm[0];
                repayEnd=this.formSel.selectTm[1];
            }

            window.open(this.$store.getters.httpUrl+'/export/excelRepayPlanStatInfo?repayStart='+repayStart+'&repayEnd='+repayEnd+'&payPlat='+this.formSel.moneyGvValue,'_blank');
        },
        loadContentSel1(){
            let repayStart='';
            let repayEnd='';
            if(this.formSel2.selectTm.length>0){
                repayStart=this.formSel2.selectTm[0];
                repayEnd=this.formSel2.selectTm[1];
            }

            window.open(this.$store.getters.httpUrl+'/export/excelRealPlanStatInfo?repayStart='+repayStart+'&repayEnd='+repayEnd+'&payPlat='+this.formSel2.moneyGvValue+'&type='+this.formSel2.typePdValue,'_blank');
        },
        loadContentSel2(){

            window.open(this.$store.getters.httpUrl+'/export/excelOverduePlanStatInfo?statTm='+this.formSel3.selectTm,'_blank');
        },
        changePage(page){
            /*this.data1=this.*/
            this.pageChk=page;
            this.startPage=(page-1) * this.pageSize;
            if(this.tabVal=='tab1'){
                this.loadContent();
            }else if(this.tabVal=='tab2'){
                this.loadContent1();
            }else{
                this.loadContent2();
            }
        },
        loadContent(){
            var firstResult = this.startPage;//(parseInt(page) - 1) * 10
            var maxResults =  this.pageSize;
            this.data1=[];
            var that=this;
            let repayStart='';
            let repayEnd='';
            if(that.formSel.selectTm.length>0){
                repayStart=that.formSel.selectTm[0];
                repayEnd=that.formSel.selectTm[1];
            }

            var detail='repayStart='+repayStart+'&repayEnd='+repayEnd+'&payPlat='+that.formSel.moneyGvValue+'&firstResult='+firstResult+'&maxResults='+maxResults;

                this.axios({
                    url:'/stat/selectRepayPlanStatInfo?'+detail,
                    method:'post',
                    headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
                }).then(function(resp){
                    if(resp.data.resCode == 1){
                        that.total = Math.ceil(resp.data.count / that.pageSize);
                        that.totalRecords=resp.data.count;
                        var data=resp.data.result.statList;
                        if(data.length>0){
                            for(var s in data){
                                let list={};
                                list['planLtm']=new Date(data[s].planLtm).Format('yyyy-MM-dd');
                                if(data[s].type==0){
                                    list['type']='现金贷';
                                }else if(data[s].type==1){
                                    list['type']='消费贷';
                                }
                                list['planCount']=data[s].planCount;
                                list['planPrp']=data[s].planPrp;
                                list['planInt']=data[s].planInt;
                                list['planSfe']=data[s].planSfe;
                                list['planAmt']=data[s].planAmt;
                                that.data1.push(list);
                            }
                        }
                    }
                }).catch(function(resp){
                    that.$Message.warning('每月应收还款查询异常');
                });
        },
        loadContent1(){
            var firstResult = this.startPage;//(parseInt(page) - 1) * 10
            var maxResults = this.pageSize;
            this.data2=[];
            var that=this;
            let repayStart='';
            let repayEnd='';
            if(that.formSel2.selectTm.length>0){
                repayStart=that.formSel2.selectTm[0];
                repayEnd=that.formSel2.selectTm[1];
            }
            var detail='repayStart='+repayStart+'&repayEnd='+repayEnd+'&payPlat='+that.formSel2.moneyGvValue+'&type='+that.formSel2.typePdValue+'&firstResult='+firstResult+'&maxResults='+maxResults;
                this.axios.post('/stat/selectRealPlanStatInfo?'+detail,{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
                }).then(function(resp){
                    console.log(resp)
                    if(resp.data.resCode == 1){
                        that.total = Math.ceil(resp.data.count / that.pageSize);
                        that.totalRecords=resp.data.count;
                        var data=resp.data.result.statList;
                        if(data.length>0){
                            for(var s in data){
                                let list={};
                                list['realTm']=new Date(data[s].realTm).Format('yyyy-MM-dd');
                                if(data[s].type==0){
                                    list['type']='现金贷';
                                }else if(data[s].type==1){
                                    list['type']='消费贷';
                                }
                                list['realCount']=data[s].realCount;
                                list['realPrp']=data[s].realPrp;
                                list['realInt']=data[s].realInt;
                                list['realSfe']=data[s].realSfe;
                                list['realPin']=data[s].realPin;
                                list['realDflt']=data[s].realDflt;
                                list['realAmt']=data[s].realAmt;
                                that.data2.push(list);
                            }
                        }
                    }
                }).catch(function(resp){
                    that.$Message.warning('每月已还款查询异常');
                });
        },
        loadContent2(){
            var firstResult = this.startPage;//(parseInt(page) - 1) * 10
            var maxResults = this.pageSize;
            this.data3=[];
            var that=this;
            this.overdueRate=0;
            var detail='statTm='+that.formSel3.selectTm+'&firstResult='+firstResult+'&maxResults='+maxResults;

                this.axios.post('/stat/selectOverduePlanStatInfo?'+detail,{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
                }).then(function(resp){
                    if(resp.data.resCode == 1){
                        that.total = Math.ceil(resp.data.count/that.pageSize);
                        that.totalRecords=resp.data.count;
                        var data=resp.data.result.statList;
                        if(data.length>0){
                            for(var s in data){
                                let list={};
                                list['overdueDay']=data[s].overdueDay;
                                list['overdueCount']=data[s].overdueCount;
                                list['overduePrp']=data[s].overduePrp;
                                list['overdueInt']=data[s].overdueInt;
                                list['overdueSfe']=data[s].overdueSfe;
                                list['overdueRate']=data[s].overdueRate;
                                that.overdueRate+=parseFloat(data[s].overdueRate);
                                that.data3.push(list);
                            }
                        }
                    }
                }).catch(function(resp){
                    that.$Message.warning('逾期未还款查询异常');
                });
        },
        reset(){
            this.formSel.selectTm=[];
            this.formSel.moneyGv='';
            this.formSel.moneyGvValue='';
            this.formSel2.selectTm=[];
            this.formSel2.typePd='';
            this.formSel2.typePdValue=-1;
            this.formSel2.moneyGv='';
            this.formSel2.moneyGvValue='';
            this.formSel3.selectTm=[];
            this.data1=[];
            this.data2=[];
        }
    }
}
</script>
