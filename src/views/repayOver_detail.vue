<template>
    <div class="sections">
        <h1>还款明细</h1>
        <div class="pl_body">
            <Row class="form_row">
                <Col :sm="22"
                    :xs="24">
                <Form :model="formSel"
                    class="downMenu">
                    <FormItem>
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input"
                            icon="ios-search"
                            width="120"
                            placeholder="借款编号/客户手机号"
                            @on-enter="loadContent(1)"></Input>
                        <Button type="primary"
                            @click="loadContent(1)">查询</Button>
                        <DatePicker :value="formSel.selectTm"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placement="bottom-start"
                            placeholder="时间区间"
                            @on-change="dateChange"></DatePicker>
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
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.productName!=''}">
                                产品名称<span v-text="formSel.productName"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.productName=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in productArray" :name="index" :key="index" :selected="formSel.productCode==s.productCode">{{s.productNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                            <Button type="ghost" :class="{active:vs3,chk:formSel.channelNm!=''}">
                                业务渠道<span v-text="formSel.channelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.channelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in channelArray" :name="index" :key="index" :selected="formSel.channelCode==s.code">{{s.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu4" @on-visible-change="orShow4">
                            <Button type="ghost" :class="{active:vs4,chk:formSel.capProChannelNm!=''}">
                                资金提供方<span v-text="formSel.capProChannelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.capProChannelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in capProArray" :name="index" :key="index" :selected="formSel.capProChannelCode==s.code">{{s.value}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu5" @on-visible-change="orShow5">
                            <Button type="ghost" :class="{active:vs5,chk:formSel.repayChannelNm!=''}">
                                还款通道<span v-text="formSel.repayChannelNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.repayChannelNm=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in payChannelArray" :name="index" :key="index" :selected="formSel.repayChannelCode==s.payCode">{{s.belongNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu6" @on-visible-change="orShow6">
                            <Button type="ghost" :class="{active:vs6,chk:formSel.payStatusNm!=''}">
                                还款状态<span v-text="formSel.payStatusNm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.payStatus==''">全部</DropdownItem>
                                <DropdownItem name="0" :selected="formSel.payStatus=='0'">计划未开始</DropdownItem>
                                <DropdownItem name="1" :selected="formSel.payStatus=='1'">未到期</DropdownItem>
								<DropdownItem name="2" :selected="formSel.payStatus=='2'">本期待还</DropdownItem>
                                <DropdownItem name="3" :selected="formSel.payStatus=='3'">逾期待还</DropdownItem>
                                <DropdownItem name="4" :selected="formSel.payStatus=='4'">还款中</DropdownItem>
								<DropdownItem name="5" :selected="formSel.payStatus=='5'">已还清</DropdownItem>
                                <DropdownItem name="6" :selected="formSel.payStatus=='6'">合同取消</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!='' || formSel.overdue!='' || formSel.selectTm!='' || formSel.productName!='' || formSel.channelNm!='' || formSel.crpProChannelNm!='' || formSel.repayChannelNm!='' || formSel.payStatusNm!=''"
                            @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2"
                    :xs="24">
                <div class="float_right">
                    <Button type="success"
                        @click="exportData">
                        <Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
                </div>
                </Col>
            </Row>
            <div class="table_show">
                <Table border
                    :columns="columns1"
                    :data="data1"
                    ref="table"></Table>
            </div>
            <Row :gutter="16"
                v-if="pageWin>=768">
                <Col :sm="5"
                    :xs="24">
                <div class="total">共{{total}}页</div>
                </Col>
                <Col :sm="19"
                    :xs="24"
                    class="txt_right">
                <Page :total="totalRecords"
                    show-elevator :current="pageChk"
                    @on-change="changePage"></Page>
                </Col>
            </Row>
            <Page v-else
                :total="totalRecords" :current="pageChk"
                simple
                @on-change="changePage"></Page>
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
            model1: false,
            tbWidth: 104,
            total: 0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            vs:false,
            vs2:false,
            vs3:false,
			vs4:false,
            vs5:false,
            vs6:false,
            formSel: {
                input: '',
                overdue: '',
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
                selectTm: '',
                productName:'',
				productCode:'',
                channelNm: '',
				channelCode: '',
                capProChannelNm: '',
				capProChannelCode: '',
                repayChannelNm: '',
				repayChannelCode: '',
                payStatusNm: '',
				payStatus: ''
            },
            columns1: [{
                title: '借款编号',
                key: 'loanNo',
                fixed: 'left',
                width: 160
            }, {
                title: '产品名称',
                key: 'product',
                fixed: 'left',
                width: 85
            }, {
                title: '客户手机号',
                key: 'custMobile',
                width: 130
            }, {
                title: '渠道名称',
                key: 'channel',
                width: 120
            }, {
                title: '资金方',
                key: 'payPlatNm',
                width: 170
            },
            {
                title: '借款金额',
                key: 'loanAmount',
                width: 120
            },
            {
                title: '分期期数',
                key: 'planStage',
                width: 120
            },
            {
                title: '应还本金',
                key: 'planPrp',
                width: 100
            },
            {
                title: '应还利息',
                key: 'planInt',
                width: 100
            },
            {
                title: '应还服务费',
                key: 'planSfe',
                width: 100
            },
            {
                title: '应还罚息',
                key: 'planPin',
                width: 80
            },
            {
                title: '已还本金',
                key: 'realPrp',
                width: 100
            },
            {
                title: '已还利息',
                key: 'realInt',
                width: 100
            },
            {
                title: '已还服务费',
                key: 'realSfe',
                width: 120
            },
            {
                title: '已还罚息',
                key: 'realPin',
                width: 120
            },
            {
                title: '减免金额',
                key: 'derateAmount',
                width: 100
            },
            {
                title: '结清违约金',
                key: 'dfltAmount',
                width: 100
            },
            {
                title: '应还时间',
                key: 'planLtm',
                width: 130
            },
            {
                title: '还款状态',
                key: 'statusDes',
                fixed: 'right',
                width: 100
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
    created: function () {
        //var arr = this.columns1;
        // for (var i = 0; i < arr.length; i++) {
        //     arr[i]['width'] = this.tbWidth;
        // }
        //this.columns1 = arr;
        this.loadContent(1);
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
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        }
    },
    methods: {
        dateChange (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
        },
        dateChange2 (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
        },
        dateChange3 (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
        },
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
        showMenu2(i){
            if(i!='全部' && i >= 0){
                this.formSel.productName=' : '+this.productArray[i].productNm;
				this.formSel.productCode=this.productArray[i].productCode;
            }else{
                this.formSel.productName='';
				this.formSel.productCode='';
            }
			this.loadContent(1);
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(i){
            if(i!='全部' && i >= 0){
                this.formSel.channelNm = '：' + this.channelArray[i].name;
                this.formSel.channelCode = this.channelArray[i].code;
            }else{
                this.formSel.channelNm = '';
                this.formSel.channelCode = '';
            }
			this.loadContent(1);
        },
        orShow3(visible){
            this.vs3=visible;
        },
		showMenu4(i){
            if(i!='全部' && i >= 0){
                this.formSel.capProChannelNm = '：' + this.capProArray[i].value;
                this.formSel.capProChannelCode = this.capProArray[i].code;
            }else{
                this.formSel.capProChannelNm = '';
                this.formSel.capProChannelCode = '';
            }
			this.loadContent(1);
        },
        orShow4(visible){
            this.vs4=visible;
        },
		showMenu5(i){
            if(i!='全部' && i >= 0){
                this.formSel.repayChannelNm = '：' + this.payChannelArray[i].belongNm;
                this.formSel.repayChannelCode = this.payChannelArray[i].payCode;
            }else{
                this.formSel.repayChannelNm = '';
                this.formSel.repayChannelCode = '';
            }
			this.loadContent(1);
        },
        orShow5(visible){
            this.vs5=visible;
        },
		showMenu6(i){
            if(i!='全部' && i>=0){
                var statusNm = "";
				switch(i){
					case "0":
						statusNm = "计划未开始";
						break;
					case "1":
						statusNm = "未到期";
						break;
					case "2":
						statusNm = "本期待还";
						break;
					case "3":
						statusNm = "逾期待还";
						break;
					case "4":
						statusNm = "还款中";
						break;
					case "5":
						statusNm = "已还清";
						break;
					case "6":
						statusNm = "合同取消";
						break;
				}
				this.formSel.payStatusNm = '：' + statusNm;
                this.formSel.payStatus = i;
            }else{
                this.formSel.payStatusNm = '';
                this.formSel.payStatus = '';
            }
			this.loadContent(1);
        },
        orShow6(visible){
            this.vs6=visible;
        },
        exportData () {
            var planLtmStart = "";
            var planLtmEnd = "";
            if (this.formSel.selectTm.length != 0) {
                if (this.formSel.selectTm[0]) {
                    planLtmStart = this.formSel.selectTm[0];
                }
                if (this.formSel.selectTm[1]) {
                    planLtmEnd = this.formSel.selectTm[1];
                }
            }

            window.open(this.$store.getters.httpUrl + "/export/exportRepayStatisOfRepayDetail");
        },
        changePage (page) {
            /*this.data1=this.*/
            this.loadContent(page);
        },
        loadContent (page) {
            this.pageChk=page;
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            this.data1=[];
            var detail='startRowNum='+firstResult+'&pageRowCount='+this.pageSize;
            detail+='&value=' + this.formSel.input + '&channelCode='+this.formSel.channelCode+'&payPlat='+this.formSel.capProChannelCode
				/*+'&product='+this.formSel.productName+'&periodNum='+this.formSel.periodNum*/
				+'&periodNum='+this.formSel.periodNum+'&periodType='+this.formSel.periodType+'&product='+this.formSel.productCode
				+'&repayPlat='+this.formSel.repayChannelCode+'&repayStatus='+this.formSel.payStatus;
            dataShow.financeRepay(detail,'detail/findRepayStatisOfRepayDetail',this);
        },
        financeRepay(result){
            if(result.count==0){
                return false;
            }
            this.total = Math.ceil(result.count / this.pageSize);
            this.totalRecords = result.count;
            if(result.content.length>0){
                for(var r in result.content){
                    var list=result.content[r];
                    var arr=list;
                    arr['loanAmount']=(list.loanAmount/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['planInt']=(list.planInt/100).toFixed(2);
                    arr['planSfe']=(list.planSfe/100).toFixed(2);
                    arr['planPin']=(list.planPin/100).toFixed(2);
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realPin']=(list.realPin/100).toFixed(2);
                    arr['derateAmount']=(list.derateAmount/100).toFixed(2);
                    arr['dfltAmount']=(list.dfltAmount/100).toFixed(2);
                    arr['planLtm'] = new Date(list.planLtm).Format('yyyy-MM-dd');
					this.data1.push(arr);
					
                }
                if(result.total!=undefined){
                    var list=result.total;
                    var arr=list;
                    arr['loanNo']='合计';
                    arr['loanAmount']=(list.loanAmount/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['planInt']=(list.planInt/100).toFixed(2);
                    arr['planSfe']=(list.planSfe/100).toFixed(2);
                    arr['planPin']=(list.planPin/100).toFixed(2);
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realPin']=(list.realPin/100).toFixed(2);
                    arr['derateAmount']=(list.derateAmount/100).toFixed(2);
                    arr['dfltAmount']=(list.dfltAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
            }
        },
        reset () {
            this.formSel = {
                input: '',
                overdue: '',
                dateList:['10天','20天','30天','1个月','3个月','6个月','9个月','12月','24个月'],
                dateChk:'',
                selectTm: '',
                productName:'',
                channelNm: '',
				channelCode: '',
                capProChannelNm: '',
				capProChannelCode: '',
                repayChannelNm: '',
				repayChannelCode: '',
                payStatusNm: '',
				payStatus: ''
				
            }
            this.loadContent(1);
        }
    }
}
</script>
