<template>
    <div class="sections">
        <h1>放款明细</h1>
        <div class="pl_body">
            <Row class="form_row">
                <Col :sm="22"
                    :xs="24">
                <Form :model="formSel"
                    class="downMenu">
                    <FormItem>
                        <DatePicker :value="formSel.selectTm"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placement="bottom-start"
                            placeholder="时间区间"
                            @on-change="dateChange"></DatePicker>
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
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuCapital" @on-visible-change="orShowCapital">
                            <Button type="ghost" :class="{active:vs4,chk:formSel.moneyGv!=''}">
                                资金方<span v-text="formSel.moneyGv"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(cp , index) in capitalAarray" :name="index" :key="index"  :selected="formSel.moneyGv==cp.showNm">{{cp.showNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuLtm" @on-visible-change="orShowLtm">
                            <Button type="ghost" :class="{active:vs1,chk:formSel.dateChk!=''}">
                                期限<span v-text="formSel.dateChk"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.dateChk=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(d,index) in dateList" :key="index" :name="index" :selected="formSel.dateChk==d.showNm">{{d.showNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuProvince" @on-visible-change="orShowProvince">
                            <Button type="ghost" :class="{active:vs2,chk:formSel.province!=''}">
                                省份<span v-text="formSel.province"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.province=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(p,index) in provinceArray" :name="index" :key="index" :selected="formSel.province==p.province">{{p.province}}</DropdownItem>                                
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuAge" @on-visible-change="orShowAge">
                            <Button type="ghost" :class="{active:vs,chk:formSel.age!=''}">
                                年龄<span v-text="formSel.age"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.age=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in ageArray" :name="index" :key="index" :selected="formSel.age==s.age">{{s.age}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuProduct" @on-visible-change="orShowProduct">
                            <Button type="ghost" :class="{active:vs6,chk:formSel.productName!=''}">
                                产品名<span v-text="formSel.productName"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.productName=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(product,index) in productArray" :name="index" :key="index" :selected="formSel.productName==product.productNm">{{product.productNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuPayChannel" @on-visible-change="orShowPayChannel">
                            <Button type="ghost" :class="{active:vs5,chk:formSel.loanType!=''}">
                                放款通道<span v-text="formSel.loanType"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.loanType=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(pay , index) in payChannelArray" :name="index" :key="index" :selected="formSel.loanType==pay.belongNm">{{pay.belongNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>                        
                        <Dropdown trigger="click" class="showMn" @on-click="showMenuPay" @on-visible-change="orShowPay">
                            <Button type="ghost" :class="{active:vs7,chk:formSel.payStatus!=''}">
                                放款状态<span v-text="formSel.payStatus"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.payStatus=='全部'">全部</DropdownItem>
                                <DropdownItem v-for="(paysts , index) in paystsArray" :name="index" :key="index" :selected="formSel.payStatus==paysts.showNm">{{paysts.showNm}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.channelCode!='' || formSel.paramAge!='' || formSel.periodNum!='' || formSel.periodType!='' || formSel.paramProvince!='' 
                            || formSel.capitalCode!='' || formSel.tpCode!='' || formSel.payCode!='' || formSel.payStatus !='' || formSel.selectTm != ''"
                            @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2"
                    :xs="24">
                <div class="float_right">
                    <Button type="success"
                        @click="exportData(2)">
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
                <div class="total">共{{total}}页/{{totalRecords}}条</div>
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
import showData from '../router/moneyCount.js'
import axios from 'axios';

export default {
    name: 'sections',
    data () {
        return {
            vs: false,
            vs1: false,
            vs2 : false,
            vs3:false,
            vs4:false,
            vs5:false,
            vs6:false,
            vs7:false,
            model1: false,
            tbWidth: 104,
            total: 0,
            countTotal:0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            formSel: {
                dateList:['10天','20天','30天','1个月','3个月','6个月','9个月','12月','24个月'],
                dateChk:'',
                overdue: '',
                selectTm: '',
                productName:'',
                channelBs: '',
                moneyGv: '',
                payType: '',
                payStatus: '',
                selectTp:'',
                payDate:'',
                province:'',
                paramProvince:'',
                age:'',
                paramAge : '',
                productName:'',
                loanType:'',
                channelNm:'',
                channelCode:'',
                loanLtm :'',
                ltmUnit:'',
                periodNum:'',
                periodType:'',
                capitalCode:'',
                payCode:'',
                tpCode:'',
                paySts:'',
            },
            columns1: [{
                title: '借款编号',
                key: 'loanNo',
                fixed: 'left',
                width: 160
            }, {
                title: '客户姓名',
                key: 'custName',
                fixed: 'left',
                width: 85
            }, {
                title: '性别',
                key: 'sex',
                width: 120
            }, {
                title: '身份证号',
                key: 'idcard',
                width: 170
            },
            {
                title: '年龄',
                key: 'age',
                width: 120
            },
            {
                title: '手机号码',
                key: 'custMobile',
                width: 120
            },
            {
                title: '省份',
                key: 'province',
                width: 160
            },
            {
                title: '城市',
                key: 'city',
                width: 100
            },
            {
                title: '借款金额',
                key: 'loanAmount',
                width: 100
            },
            {
                title: '借款时间',
                key: 'createTime'
            },
            {
                title: '首付金额',
                key: 'downpayAmount',
                width: 100
            },
            {
                title: '分期期数',
                key: 'periodNum',
                width: 160
            },
            {
                title: '年化利率',
                key: 'loanRate',
                width: 120
            },
            {
                title: '贴息金额',
                key: 'discountAmount',
                width: 120
            },
            {
                title: '产品名称',
                key: 'product',
                width: 100
            },
            {
                title: '所属行业',
                key: 'trade',
                width: 100
            },
            {
                title: '产品类型',
                key: 'loanType',
                width: 100
            },
            {
                title: '业务渠道',
                key: 'channelNm'
            },
            {
                title: '结算名称',
                key: 'belongNm',
                width: 100
            },
            {
                title: '结算平台',
                key: 'balPlat',
                width: 160
            },
            {
                title: '结算时间',
                key: 'updateTime',
                width: 120
            },
            {
                title: '结算流水号',
                key: 'tradeNo',
                width: 120
            },
            {
                title: '资金提供方',
                key: 'belongNm',
                width: 100
            },
            {
                title: '订单状态',
                key: 'status',
                width: 100
            },
            {
                title: '备注',
                key: 'remark',
                width: 100
            }/*,
            {
                title: '操作',
                key: 'clrType',
                fixed: 'right',
                width: 100
            }*/],
            data1: [],
            channelArray:[],
            ageArray:[],
            provinceArray:[],
            payChannelArray:[],
            productArray:[],
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
            ],capitalAarray:[
                {
                    'code' : 'HJZR',
                    'showNm' : '华金'
                },{
                    'code' : 'ZKN',
                    'showNm' : '中科诺'
                }
            ], paystsArray :[
                {
                    'status':0,
                    'showNm':'等待放款'
                },{
                    'status':1,
                    'showNm':'放款成功'
                },{
                    'status':2,
                    'showNm':'放款失败'
                },{
                    'status':3,
                    'showNm':'合同取消'
                },{
                    'status':4,
                    'showNm':'合同结清'
                },{
                    'status':5,
                    'showNm':'放款中'
                },
            ],       
            vs:'',
        }
    },
    created: function () {
        this.eachAge();
        this.loadProvince();
        this.loadPayChannel();
        this.loadProduct();
        this.loadChannel();
        var arr = this.columns1;
        for (var i = 0; i < arr.length; i++) {
             arr[i]['width'] = this.tbWidth;
        }
        this.columns1 = arr;
        this.loadContent(1);
    },
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        }
    },
    methods: {
        show (index) {
            this.model1 = true;
        },
        dateChange (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
        },
        exportData (type) {

            var detail = {
                'status' : this.formSel.paySts,
                'channelCode':this.formSel.channelCode,
                'age' : this.formSel.paramAge,
                'periodNum' : this.formSel.periodNum,
                'periodType' : this.formSel.periodType,
                'province' : this.formSel.paramProvince,
                'bsChannel' : this.formSel.capitalCode,
                'payPlat' : this.formSel.payCode,
                'product' : this.formSel.tpCode
            };

            var joinStr = '';
            for(var key in detail) {
                var kv = key + '=' + detail[key] + '&';
                joinStr += kv; 
            }
            
            var resPath = this.$store.getters.httpUrl;
             window.open( resPath + '/export/downLoanDetail?' + joinStr.substring(0,joinStr.length)); 
        },
        changePage (page) {
            /*this.data1=this.*/
            this.loadContent(page);
        },
        loadContent (page) {
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            var maxResults = this.pageSize;
            this.pageChk=page;           

            var detail = {
                'status' : this.formSel.paySts,
                'channelCode':this.formSel.channelCode,
                'age' : this.formSel.paramAge,
                'periodNum' : this.formSel.periodNum,
                'periodType' : this.formSel.periodType,
                'province' : this.formSel.paramProvince,
                'bsChannel' : this.formSel.capitalCode,
                'payPlat' : this.formSel.payCode,
                'product' : this.formSel.tpCode,
                'first' : firstResult,
                'max' : maxResults
            };

            if(this.formSel.selectTm != null && this.formSel.selectTm.length >=2) {
                detail['startTm'] = this.formSel.selectTm[0];
                detail['endTm'] = this.formSel.selectTm[1];
            }

           showData.financeRepay(detail,'detail/loanDetail',this);
        },
        financeRepay(result){
            this.data1=[];
            this.totalRecords = 0 ; 
            this.total = 0 ;
            if(result==null || JSON.stringify(result) == '{}'){
                return false;
            }
            if(result.details.length>0){
                this.total=Math.ceil(result.total/this.pageSize);
                this.totalRecords=result.total;
                for(var r in result.details){
                    var list=result.details[r];
                    var arr=list;
                    arr['sex']=list.sex==0?'女':'男';
                    arr['loanType']=list.loanType==1?'现金贷':'消费贷';
                    if(list.status==0){
                       arr['status']='等待放款';
                    }else if(list.status==1){
                        arr['status']='放款成功';
                    }else if(list.status==2){
                        arr['status']='放款失败';
                    }else if(list.status==3){
                        arr['status']='合同取消';
                    }else if(list.status==4){
                        arr['status']='合同结清';
                    }else{
                        arr['status']='放款处理中';
                    }
                    arr['loanAmount']=(list.loanAmount/100).toFixed(2);
                    arr['downpayAmount']=(list.downpayAmount/100).toFixed(2);
                    arr['loanRate']=(list.loanRate/100).toFixed(2);
                    arr['discountAmount']=(list.discountAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
                var listArr={'loanNo':'合计','loanAmount':result.totalLoanAmount,'discountAmount':result.totalDiscountAmount,'downpayAmount':result.totalDownpayAmount};
                this.data1.push(listArr);
            }
        },eachAge() {
            var start = 18;
            for(var i = start ; i < 41;i++) {
                this.ageArray.push({
                    'age' : i
                });
            }
        },
        loadProvince() {
            var that = this;
            axios({
			    method:'post',
			    url:'detail/province',
                withCredentials:true
            }).then(function(res){                
                if(res.data.success == true) {
                    var result = res.data.result;
                    result.forEach(function(element) {
                        that.provinceArray.push({
                            'province': element.province,
                            'status' : element.status
                        });
                    }, this);
                }
            }).catch(function(error){
                that.$Message.warning('获取省市异常');
            })
        },
        loadPayChannel() {
            var that = this;
            this.axios
             .get('/channel/payChannel')
             .then(res => {
                 if (res.data.success) {
                   this.payChannelArray = res.data.result;
                 }
             });
        },loadChannel(){
            this.axios
             .get('/channel/getChannelList')
             .then(res => {
                 if (res.data.success) {
                   this.channelArray = res.data.result.list;
                 }
             });
        },
        loadProduct() {
            var that = this;
            this.axios
             .get('/detail/product')
             .then(res => {
                 if (res.data.success) {
                   this.productArray = res.data.result;
                 }
             });
        },showMenuPay(i) { 
            if(i!='全部' && i >= 0){
                this.formSel.payStatus = '：' + this.paystsArray[i].showNm;
                this.formSel.paySts = this.paystsArray[i].status;
            }else{
                this.formSel.payStatus = '';
                this.formSel.paySts = '';
            }

            this.loadContent(1);
        },orShowPay(visible) {
            this.vs7 = visible;
        },
        orShowProduct(visible) {
          this.vs6 = visible;  
        },
        showMenuProduct(i) {
            if(i!='全部' && i >= 0){
                this.formSel.productName = '：' + this.productArray[i].productNm;
                this.formSel.tpCode = this.productArray[i].productCode;
            }else{
                this.formSel.productName = '';
                this.formSel.tpCode = '';
            }
            this.loadContent(1);
        },orShowPayChannel(visible) {
          this.vs5 = visible;  
        },
        showMenuPayChannel(i) {
            if(i!='全部' && i >= 0){
                this.formSel.loanType = '：' + this.payChannelArray[i].belongNm;
                this.formSel.payCode = this.payChannelArray[i].payCode;
            }else{
                this.formSel.loanType = '';
                this.formSel.payCode = '';
            }

            this.loadContent(1);
        },
        showMenuCapital(i) {
            if(i!='全部' && i >= 0){
                this.formSel.moneyGv = '：' + this.capitalAarray[i].showNm;
                this.formSel.capitalCode = this.capitalAarray[i].code;
            }else{
                this.formSel.moneyGv = '';
                this.formSel.capitalCode = '';
            }
            this.loadContent(1);
        },orShowCapital(visible) {
            this.vs4 = visible;
        },
        showMenuAge(i) {
            if(i!='全部' && i >= 0){
                this.formSel.age = '：' + this.ageArray[i].age;
                this.formSel.paramAge = this.ageArray[i].age;
            }else{
                this.formSel.age = '';
                this.formSel.paramAge = '';
            }
            this.loadContent(1);
        },
        orShowAge(visible){
            this.vs = visible;
        },
        showMenuLtm(i){
            if(i!='全部' && i >= 0){
                this.formSel.dateChk = '：' + this.dateList[i].showNm;
                this.formSel.periodNum = this.dateList[i].periodNum;
                this.formSel.periodType = this.dateList[i].periodType;
            }else{
                this.formSel.dateChk = '';
                this.formSel.periodNum = '';
                this.formSel.periodType = '';
            }
            this.loadContent(1);
        },orShowLtm(visible) {
            this.vs1 = visible;
        },showMenuProvince(i) {
            if(i!='全部' && i >= 0){
                this.formSel.province = '：' + this.provinceArray[i].province;
                this.formSel.paramProvince = this.provinceArray[i].province;
            }else{
                this.formSel.province = '';
                this.formSel.paramProvince = '';
            }

            this.loadContent(1);
        },orShowProvince(visible) {
            this.vs2 = visible;
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
        },orShow3(visible){
            this.vs3=visible;
        } , reset() {
            this.formSel = {
                selectTp:'',
                moneyGv:'',
                payDate:'',
                province:'',
                paramProvince:'',
                age:'',
                paramAge : '',
                productName:'',
                loanType:'',
                channelNm:'',
                channelCode:'',           
                dateChk:'',
                loanLtm :'',
                ltmUnit:'',
                periodNum:'',
                periodType:'',
                capitalCode:'',
                payCode:'',
                tpCode:''        
            }

            this.loadContent(1);
        }
    }
}
</script>
