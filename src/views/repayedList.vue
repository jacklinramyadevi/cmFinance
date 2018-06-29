<template>
  <div class="sections">
    <h1>结清明细</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input"
                          placeholder="借款编号/客户手机号"
                          @on-enter="loadContent(1)"></Input>
                          <Button type="primary" @click="loadContent(1)">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="结清日期" @on-change="dateChange"></DatePicker>
                        <DatePicker :value="formSel.selectTm1" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款日期" @on-change="dateChange1"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.dateChk!=''}">
                                期限<span v-text="formSel.dateChk"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.dateChk=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(d,index) in this.formSel.dateList" :key="index" :name="index" :selected="formSel.periodNum==d.periodNum && formSel.periodType == d.periodType">{{d.showNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu1" @on-visible-change="orShow1">
                            <Button type="ghost" :class="{active:vs1,chk:formSel.capProChannelNm!=''}">
                                资金提供方<span v-text="formSel.capProChannelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.capProChannelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in capProArray" :name="index" :key="index" :selected="formSel.capProChannelCode==s.code">{{s.value}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.channelNm!=''}">
                                业务渠道<span v-text="formSel.channelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.channelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in channelArray" :name="index" :key="index" :selected="formSel.channelCode==s.code">{{s.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.productName!=''}">
                                产品名称<span v-text="formSel.productName"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.productName=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in productArray" :name="index" :key="index" :selected="formSel.productCode==s.productCode">{{s.productNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!=''" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
		<div class="table_show">
        	<Table border :columns="columns1" :data="data1" ref="table"></Table>
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
import dataShow from '../router/moneyCount.js'
import '../router/dateFormat.js'

export default {
  name: 'sections',
  data () {
    return {
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageSize:10,
        pageChk:1,
        vs:false,
		vs1:false,
		vs2:false,
		vs3:false,
        formSel:{
            input:'',
            selectTm:'',
            selectTm1:'',
            selectTm2:'',
            dateList:[
							{
								'periodNum':10,
								'periodType':1,
								'showNm':'10天'
							},{
								'periodNum':20,
								'periodType':1,
								'showNm':'20天'
							},{
								'periodNum':30,
								'periodType':1,
								'showNm':'30天'
							},{
								'periodNum':1,
								'periodType':0,
								'showNm':'1个月'
							},{
								'periodNum':3,
								'periodType':0,
								'showNm':'3个月'
							},{
								'periodNum':6,
								'periodType':0,
								'showNm':'6个月'
							},{
								'periodNum':9,
								'periodType':0,
								'showNm':'9个月'
							},{
								'periodNum':12,
								'periodType':0,
								'showNm':'12个月'
							},{
								'periodNum':24,
								'periodType':0,
								'showNm':'24个月'
							}
						],
            dateChk:'',
			periodNum: '',
			periodType: '',
            moneyGv:'',
            payType:'',
            selectTp:'',
            productName:'',
			productCode:'',
			capProChannelNm: '',
			capProChannelCode: '',
            channelNm: '',
			channelCode: ''
        },
        columns1: [
        {
            title: '借款编号',
            key: 'loanNo',
            minWidth:104,
            fixed:'left'
        },
        {
            title: '产品名称',
            key: 'product',
            minWidth:104
        },
        {
            title: '渠道名称',
            key: 'channel',
            minWidth:104
        },
        {
            title: '资金方',
            key: 'payPlatNm',
            minWidth:104
        },
        {
            title: '借款金额',
            key: 'loanAmount',
            minWidth:104
        },
        {
            title: '分期期数',
            key: 'periodNum',
            minWidth:104
        },
        {
            title: '分期已还本金',
            key: 'realPrp',
            minWidth:104
        },
        {
            title: '分期已还利息',
            key: 'realInt',
            minWidth:104
        },
        {
            title: '分期已还服务费',
            key: 'realSfe',
            minWidth:104
        },
        {
            title: '结清本金',
            key: 'planPrp',
            minWidth:104
        },
        {
            title: '结清违约金',
            key: 'defaultRate',
            minWidth:104
        },
        {
            title: '减免金额',
            key: 'clrReductionAmount',
            width:104
        },
        {
            title: '合计还款金额',
            key: 'repAmount',
            minWidth:104
        },
        {
            title: '结清日期',
            key: 'realTime',
            minWidth:104
        },
        {
            title: '借款日期',
            key: 'loanTime',
            minWidth:120
        }],
        data1: [],
		capProArray: [
				{
					code: 'HJZR',
					value: '华金'
				},
				{
					code: 'ZKN',
					value: '中科诺'
				}
		],
		channelArray: [],
		productArray: []
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
		
		this.loadContent(1);
		this.axios
             .get('/channel/getChannelList')
             .then(res => {
                 if (res.data.success) {
                   this.channelArray = res.data.result.list;
                 }
             });
			 
		this.axios
             .get('/detail/product')
             .then(res => {
                 if (res.data.success) {
                   this.productArray = res.data.result;
                 }
             });
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(i){
            if(i!='全部' && i >= 0){
				this.formSel.dateChk=' : ' + this.formSel.dateList[i].showNm;
                this.formSel.periodNum=this.formSel.dateList[i].periodNum;
				this.formSel.periodType=this.formSel.dateList[i].periodType;
            }else{
				this.formSel.dateChk='';
                this.formSel.periodNum='';
				this.formSel.periodType='';
            }
			this.loadContent(1);
        },
        orShow(visible){
            this.vs=visible;
        },
		showMenu1(i){
            if(i!='全部' && i >= 0){
                this.formSel.capProChannelNm = '：' + this.capProArray[i].value;
                this.formSel.capProChannelCode = this.capProArray[i].code;
            }else{
                this.formSel.capProChannelNm = '';
                this.formSel.capProChannelCode = '';
            }
			this.loadContent(1);
        },
        orShow1(visible){
            this.vs1=visible;
        },
		showMenu2(i){
            if(i!='全部' && i >= 0){
                this.formSel.channelNm = '：' + this.channelArray[i].name;
                this.formSel.channelCode = this.channelArray[i].code;
            }else{
                this.formSel.channelNm = '';
                this.formSel.channelCode = '';
            }
			this.loadContent(1);
        },
        orShow2(visible){
            this.vs2=visible;
        },
		showMenu3(i){
            if(i!='全部' && i >= 0){
                this.formSel.productName=' : '+this.productArray[i].productNm;
				this.formSel.productCode=this.productArray[i].productCode;
            }else{
                this.formSel.productName='';
				this.formSel.productCode='';
            }
			this.loadContent(1);
        },
        orShow3(visible){
            this.vs3=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        dateChange1(date){
            this.formSel.selectTm1=date;
        },
        dateChange2(date){
            this.formSel.selectTm2=date;
        },
        exportData () {
            window.open(this.$store.getters.httpUrl + "/export/exportAlreadyClrStatisOfDetail");
        },
        changePage(){
            /*this.data1=this.*/
        },
		loadContent (page) {
            this.pageChk=page;
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            this.data1=[];
            var detail='startRowNum='+firstResult+'&pageRowCount='+this.pageSize;
            detail+='&value=' + this.formSel.input + '&channelCode='+this.formSel.channelCode+'&payPlat='+this.formSel.capProChannelCode+'&product='+this.formSel.productCode
				+'&periodNum='+this.formSel.periodNum+'&periodType='+this.formSel.periodType;
            dataShow.financeRepay(detail,'detail/findAlreadyClrStatisOfDetail',this);
        },
        financeRepay(result){
            this.data1=[];
            if(result==null){
                return false;
            }
			
			this.total = Math.ceil(result.count / this.pageSize);
			this.totalRecords = result.count;
            if(result.content.length>0){
                for(var r in result.content){
                    var list=result.content[r];
                    var arr=list;
                    arr['loanAmount']=(list.loanAmount/100).toFixed(2);
                    arr['loanTime']=new Date(list.loanTime).Format('yyyy-MM-dd');
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['defaultRate']=(list.defaultRate/100).toFixed(2);
                    arr['repAmount']=(list.repAmount/100).toFixed(2);
                    arr['clrReductionAmount']=list.clrReductionAmount==null?'0':(list.clrReductionAmount/100).toFixed(2);
                    arr['realTime']=new Date(list.realTime).Format('yyyy-MM-dd');
                    this.data1.push(arr);
                }
                if(result.total!=undefined){
                    var list=result.total;
                    var arr=list;
                    arr['loanNo']='合计';
                    arr['loanAmount']=(list.loanAmount/100).toFixed(2);
                    arr['loanTime']='无';
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['defaultRate']=(list.defaultRate/100).toFixed(2);
                    arr['repAmount']=(list.repAmount/100).toFixed(2);
                    arr['clrReductionAmount']=list.clrReductionAmount==null?'0':(list.clrReductionAmount/100).toFixed(2);
                    arr['realTime']='无';
                    this.data1.push(arr);
                }
            }
        }    
    }
}
</script>
