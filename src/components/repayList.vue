<template>
  <div>
    <Row class="form_row">
        <Col :sm="22" :xs="24">
            <Form :model="formSel" class="downMenu">
                <FormItem>
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
                            <Button type="ghost" :class="{active:vs1,chk:formSel.channelNm!=''}">
                                业务渠道<span v-text="formSel.channelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.channelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in channelArray" :name="index" :key="index" :selected="formSel.channelCode==s.code">{{s.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.capProChannelNm!=''}">
                                资金提供方<span v-text="formSel.capProChannelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.capProChannelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in capProArray" :name="index" :key="index" :selected="formSel.capProChannelCode==s.code">{{s.value}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.repayChannelNm!=''}">
                                还款通道<span v-text="formSel.repayChannelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.repayChannelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in payChannelArray" :name="index" :key="index" :selected="formSel.repayChannelCode==s.payCode">{{s.belongNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow4">
                        <Button type="ghost" :class="{active:vs4,chk:formSel.productName!=''}">
                            产品名称<span v-text="formSel.productName"></span>
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="全部" :selected="formSel.productName=='全部'">全部</DropdownItem>
                            <DropdownItem v-for="(s,index) in productArray" :name="index" :key="index" :selected="formSel.productCode==s.productCode">{{s.productNm}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
    
  </div>
</template>

<script>
import dataShow from '../router/moneyCount.js'

export default {
  props:['tabMsg'],
  data () {
    return {
        tbWidth:100,
        vs:false,
		vs1:false,
        vs2:false,
        vs3:false,
		vs4:false,
		statisType: 0,
        formSel:{
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
            payTypeId:'',
            selectTp:'',
            selectTpId:'',
            productName:'',
			productCode:'',
            productId:'',
			channelNm: '',
			channelCode: '',
            capProChannelNm: '',
			capProChannelCode: '',
            repayChannelNm: '',
			repayChannelCode: ''
        },
        columns1: [
        {
            title: '日期',
            key: 'planLtm',
            minWidth:104,
            fixed:'left'
        },
        {
            title: '应还金额',
            key: 'dueRepAmount',
            minWidth:104
        },
        {
            title: '应还笔数',
            key: 'dueRepCount',
            minWidth:104
        },
        {
            title: '应还本金',
            key: 'duePlanPrp',
            minWidth:104
        },
        {
            title: '应还利息',
            key: 'duePlanInt',
            minWidth:104
        },
        {
            title: '应还服务费',
            key: 'duePlanSfe',
            minWidth:104
        },
        {
            title: '应还罚息',
            key: 'duePlanPin',
            minWidth:104
        },
        {
            title: '实还金额',
            key: 'realRepAmount',
            minWidth:104
        },
        {
            title: '实还笔数',
            key: 'realRepConut',
            minWidth:104
        },
        {
            title: '实还本金',
            key: 'realPrp',
            minWidth:104
        },
        {
            title: '实还利息',
            key: 'realInt',
            minWidth:104
        },
        {
            title: '实还服务费',
            key: 'realSfe',
            width:104
        },
        {
            title: '实还罚息',
            key: 'realPin',
            minWidth:104
        },
        {
            title: '实还违约金',
            key: 'realDfltAmount',
            minWidth:104
        },
        {
            title: '正常还款金额',
            key: 'normalRepAmount',
            minWidth:120
        },
        {
            title: '正常还款笔数',
            key: 'normalRepCount',
            width:120
        },
        {
            title: '正常还款本金',
            key: 'normalRepPrp',
            minWidth:120
        },
        {
            title: '正常还款利息',
            key: 'normalRepInt',
            minWidth:120
        },
        {
            title: '正常还款服务费',
            key: 'normalRepSfe',
            minWidth:130
        },
        {
            title: '正常还款罚息',
            key: 'normalRepPin',
            minWidth:110
        },
        {
            title: '正常还款违约金',
            key: 'normalDfltAmount',
            minWidth:120 
        },
        {
            title: '提前还款金额',
            key: 'clrRepAmount',
            minWidth:120
        },
        {
            title: '提前还款笔数',
            key: 'clrRepCount',
            minWidth:120
        },
        {
            title: '提前还款本金',
            key: 'clrRepPrp',
            minWidth:120
        },
        {
            title: '提前还款利息',
            key: 'clrRepInt',
            width:120
        },
        {
            title: '提前还款服务费',
            key: 'clrRepSfe',
            minWidth:120
        },
        {
            title: '提前还款罚息',
            key: 'clrRepPin',
            minWidth:120
        },
        {
            title: '提前还款违约金',
            key: 'clrDfltAmount',
            minWidth:130
        },
        {
            title: '逾期还款金额',
            key: 'overRepAmount',
            width:120
        },
        {
            title: '逾期还款笔数',
            key: 'overRepCount',
            minWidth:120
        },
        {
            title: '逾期还款本金',
            key: 'overRepPrp',
            minWidth:120
        },
        {
            title: '逾期还款利息',
            key: 'overRepInt',
            minWidth:120
        },
        {
            title: '逾期还款服务费',
            key: 'overRepSfe',
            minWidth:130
        },
        {
            title: '逾期还款罚息',
            key: 'overRepPin',
            minWidth:130
        },
        {
            title: '逾期还款违约金',
            key: 'overDfltAmount',
            minWidth:130
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
		payChannelArray: [],
		productArray: []
       }
    },
    created:function(){
        var detail='statisticType=0';
        dataShow.financeRepay(detail,'detail/findRepayStatistic',this);
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=70;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
		
		this.axios
             .get('/channel/getChannelList')
             .then(res => {
                 if (res.data.success) {
                   this.channelArray = res.data.result.list;
                 }
             });

		this.axios
             .get('/detail/queryPayChannelList?type=2')
             .then(res => {
                 if (res.data.success) {
                   this.payChannelArray = res.data.result;
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
    watch:{
        tabMsg:function(val){
            if(val=='tab1'){
                this.columns1[0].title='日期';
                this.statisType=0;
            }else{
                this.columns1[0].title='月份';
                this.statisType=1;
            }
            this.loadContent();
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
			this.loadContent();
        },
        orShow(visible){
            this.vs=visible;
        },
		showMenu1(i){
            if(i!='全部' && i >= 0){
                this.formSel.channelNm = '：' + this.channelArray[i].name;
                this.formSel.channelCode = this.channelArray[i].code;
            }else{
                this.formSel.channelNm = '';
                this.formSel.channelCode = '';
            }
			this.loadContent();
        },
        orShow1(visible){
            this.vs1=visible;
        },
		showMenu2(i){
            if(i!='全部' && i >= 0){
                this.formSel.capProChannelNm = '：' + this.capProArray[i].value;
                this.formSel.capProChannelCode = this.capProArray[i].code;
            }else{
                this.formSel.capProChannelNm = '';
                this.formSel.capProChannelCode = '';
            }
			this.loadContent();
        },
        orShow2(visible){
            this.vs2=visible;
        },
		showMenu3(i){
            if(i!='全部' && i >= 0){
                this.formSel.repayChannelNm = '：' + this.payChannelArray[i].belongNm;
                this.formSel.repayChannelCode = this.payChannelArray[i].payCode;
            }else{
                this.formSel.repayChannelNm = '';
                this.formSel.repayChannelCode = '';
            }
			this.loadContent();
        },
        orShow3(visible){
            this.vs3=visible;
        },
		showMenu4(i){
            if(i!='全部' && i >= 0){
                this.formSel.productName=' : '+this.productArray[i].productNm;
				this.formSel.productCode=this.productArray[i].productCode;
            }else{
                this.formSel.productName='';
				this.formSel.productCode='';
            }
			this.loadContent();
        },
        orShow4(visible){
            this.vs4=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData () {
            var type=0;
            if(this.tabMsg=='tab1'){
                type=0;
            }else{
                type=1;
            }
            window.open(this.$store.getters.httpUrl + '/export/exportRepayStatistic?statisticType=' + type + '&channelCode='+this.formSel.channelCode+'&payPlat='+this.formSel.capProChannelCode+'&product='+this.formSel.productId+'&periodNum='+ this.formSel.dateChk +'&repayPlat='+this.formSel.repayChannelCode);
        },
		loadContent () {
            var detail='statisticType='+this.statisType + '&channelCode=' + this.formSel.channelCode
				+ '&payPlat=' + this.formSel.capProChannelCode + '&repayPlat=' + this.formSel.repayChannelCode
				+'&periodNum='+this.formSel.periodNum+'&periodType='+this.formSel.periodType+'&product='+this.formSel.productCode;
			dataShow.financeRepay(detail,'detail/findRepayStatistic',this);
        },
        financeRepay(data){
            this.data1=[];
            if(data==null){
                return false;
            }
            if(data.content.length>0){
                for(var d in data.content){
                    var list=data.content[d];
                    var arr=list;
                    arr['dueRepAmount']=(list.dueRepAmount/100).toFixed(2);
                    arr['duePlanPrp']=(list.duePlanPrp/100).toFixed(2);
                    arr['duePlanInt']=(list.duePlanInt/100).toFixed(2);
                    arr['duePlanSfe']=(list.duePlanSfe/100).toFixed(2);
                    arr['duePlanPin']=(list.duePlanPin/100).toFixed(2);
                    arr['realRepAmount']=(list.realRepAmount/100).toFixed(2);
                    //arr['realRepConut']=list.realRepConut;
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realPin']=(list.realPin/100).toFixed(2);
                    arr['realDfltAmount']=(list.realDfltAmount/100).toFixed(2);
                    arr['normalRepAmount']=(list.normalRepAmount/100).toFixed(2);
                    //arr['normalRepCount']=Math.floor(list.normalRepCount)/100;
                    arr['normalRepPrp']=(list.normalRepPrp/100).toFixed(2);
                    arr['normalRepInt']=(list.normalRepInt/100).toFixed(2);
                    arr['normalRepSfe']=(list.normalRepSfe/100).toFixed(2);
                    arr['normalRepPin']=(list.normalRepPin/100).toFixed(2);
                    //arr['realRepConut']=list.realRepConut;
                    arr['normalDfltAmount']=(list.normalDfltAmount/100).toFixed(2);
                    arr['clrRepAmount']=(list.clrRepAmount/100).toFixed(2);
                    //arr['clrRepCount']=list.clrRepCount;
                    arr['clrRepPrp']=(list.clrRepPrp/100).toFixed(2);
                    arr['clrRepInt']=(list.clrRepInt/100).toFixed(2);
                    arr['clrRepSfe']=(list.clrRepSfe/100).toFixed(2);
                    //arr['normalRepCount']=Math.floor(list.normalRepCount)/100;
                    arr['clrRepPin']=(list.clrRepPin/100).toFixed(2);
                    arr['clrDfltAmount']=(list.clrDfltAmount/100).toFixed(2);
                    arr['overRepAmount']=(list.overRepAmount/100).toFixed(2);
                    //arr['overRepCount']=list.overRepCount;
                    arr['overRepPrp']=(list.overRepPrp/100).toFixed(2);
                    arr['overRepInt']=(list.overRepInt/100).toFixed(2);
                    arr['overRepSfe']=(list.overRepSfe/100).toFixed(2);
                    arr['overRepPin']=(list.overRepPin/100).toFixed(2);
                    arr['overDfltAmount']=(list.overDfltAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
                if(data.total!=undefined){
                    var list = data.total;
					var arr = list;
                    arr['planLtm']='合计';
                    arr['dueRepAmount']=(list.dueRepAmount/100).toFixed(2);
                    arr['duePlanPrp']=(list.duePlanPrp/100).toFixed(2);
                    arr['duePlanInt']=(list.duePlanInt/100).toFixed(2);
                    arr['duePlanSfe']=(list.duePlanSfe/100).toFixed(2);
                    arr['duePlanPin']=(list.duePlanPin/100).toFixed(2);
                    arr['realRepAmount']=(list.realRepAmount/100).toFixed(2);
                    //arr['realRepConut']=list.realRepConut;
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realPin']=(list.realPin/100).toFixed(2);
                    arr['realDfltAmount']=(list.realDfltAmount/100).toFixed(2);
                    arr['normalRepAmount']=(list.normalRepAmount/100).toFixed(2);
                    //arr['normalRepCount']=Math.floor(list.normalRepCount)/100;
                    arr['normalRepPrp']=(list.normalRepPrp/100).toFixed(2);
                    arr['normalRepInt']=(list.normalRepInt/100).toFixed(2);
                    arr['normalRepSfe']=(list.normalRepSfe/100).toFixed(2);
                    arr['normalRepPin']=(list.normalRepPin/100).toFixed(2);
                    //arr['realRepConut']=list.realRepConut;
                    arr['normalDfltAmount']=(list.normalDfltAmount/100).toFixed(2);
                    arr['clrRepAmount']=(list.clrRepAmount/100).toFixed(2);
                    //arr['clrRepCount']=list.clrRepCount;
                    arr['clrRepPrp']=(list.clrRepPrp/100).toFixed(2);
                    arr['clrRepInt']=(list.clrRepInt/100).toFixed(2);
                    arr['clrRepSfe']=(list.clrRepSfe/100).toFixed(2);
                    //arr['normalRepCount']=Math.floor(list.normalRepCount)/100;
                    arr['clrRepPin']=(list.clrRepPin/100).toFixed(2);
                    arr['clrDfltAmount']=(list.clrDfltAmount/100).toFixed(2);
                    arr['overRepAmount']=(list.overRepAmount/100).toFixed(2);
                    //arr['overRepCount']=list.overRepCount;
                    arr['overRepPrp']=(list.overRepPrp/100).toFixed(2);
                    arr['overRepInt']=(list.overRepInt/100).toFixed(2);
                    arr['overRepSfe']=(list.overRepSfe/100).toFixed(2);
                    arr['overRepPin']=(list.overRepPin/100).toFixed(2);
                    arr['overDfltAmount']=(list.overDfltAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
            }
        }
    }
}
</script>
