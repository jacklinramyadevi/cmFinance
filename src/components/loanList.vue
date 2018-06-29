<template>
    <div>
	<Row class="form_row">
        <Col :sm="22" :xs="18">
            <Form :model="formSel" class="downMenu">
                <FormItem>
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
                        <Button v-if="formSel.channelCode!='' || formSel.paramAge!='' || formSel.periodNum!='' || formSel.periodType!='' || formSel.paramProvince!='' || formSel.capitalCode!='' || formSel.tpCode!='' || formSel.payCode!=''"
                            @click="reset">重置</Button>
                </FormItem>
            </Form>
        </Col>
        <Col :sm="2" :xs="6"><div class="float_right">
            <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
        </div></Col>
    </Row>
	<div class="table_show">
    	<Table border :columns="columns" :data="data" ref="table"></Table>
    </div>
    </div>
</template>
<script>
import dataShow from '../router/moneyCount.js'
import axios from 'axios';

export default {
  props:['tabMsg'],
  data () {
    return {
            vs1: false,
            vs2 : false,
            vs3:false,
            vs4:false,
            vs5:false,
            vs6:false,
            tbWidth:100,
            vs:false,
            formSel:{                
                payType:'',
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
            },
            columns1: [
            {
                title: '放款日期',
                key: 'payTime'
            },
            {
                title: '放款金额',
                key: 'payAmount'
            },
            {
                title: '放款笔数',
                key: 'total'
            }],
            columns2: [
            {
                title: '放款日期',
                key: 'payTime'
            },
            {
                title: '放款金额',
                key: 'loanAmount'
            },
            {
                title: '放款笔数',
                key: 'total'
            },
            {
                title: '实付金额',
                key: 'payAmount'
            },
            {
                title: '首付',
                key: 'downpayAmount'
            },
            {
                title: '贴息金额',
                key: 'discountAmount'
            }],
            columns:[],
            data:[],
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
            ],        
            vs:'',
        }
    },
    created:function(){
        this.columns=this.columns1;
        this.loadContent();
        this.eachAge();
        this.loadProvince();
        this.loadPayChannel();
        this.loadProduct();
        this.loadChannel();
                
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
    watch:{
        tabMsg:function(val){
            if(val=='tab1'){
                this.columns=this.columns1;
                dataShow.financeRepay({"status": 1},'detail/sttLoanMonthOfDay',this);
            }else{
                this.columns=this.columns2;
                dataShow.financeRepay({"status": 1},'detail/findMonthLoanDetail',this);
            }
        }
    },
    computed :{
    },
    methods: {
        loadContent() {
            var detail = {
                'status':1,
                'channelCode':this.formSel.channelCode,
                'age' : this.formSel.paramAge,
                'periodNum' : this.formSel.periodNum,
                'periodType' : this.formSel.periodType,
                'province' : this.formSel.paramProvince,
                'bsChannel' : this.formSel.capitalCode,
                'payPlat' : this.formSel.payCode,
                'product' : this.formSel.tpCode
            };

            if(this.tabMsg=='tab1') {
                dataShow.financeRepay(detail,'detail/sttLoanMonthOfDay',this);
            } else {
                dataShow.financeRepay(detail,'detail/findMonthLoanDetail',this);
            }
            
        },
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.selectTp=' : '+val;
            }else{
                this.formSel.selectTp='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        financeRepay(result){
            this.data=[];
            if(result==null || JSON.stringify(result) == '{}'){
                return false;
            }
            if(result.details.length>0){
                this.data=result.details;
                var arr={};
                if(this.tabMsg=='tab1'){
                    arr={'payTime':'合计','payAmount':result.totalPay,'total':result.totalCount};
                }else{
                    arr={'payTime':'合计','loanAmount':result.totalLoanAmount,'total':result.totalCount,'payAmount':result.totalPay,'downpayAmount':result.totalDownpayAmount,'discountAmount':result.totalDiscountAmount};
                }
                this.data.push(arr);
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
        },orShowProduct(visible) {
          this.vs6 = visible;  
        },
        showMenuProduct(i) {
            if(i!='全部' && i >= 0){
                this.formSel.productName = '：' + this.productArray[i].productNm;
                this.formSel.tpCode = this.productArray[i].productNm;
            }else{
                this.formSel.productName = '';
                this.formSel.tpCode = '';
            }
            this.loadContent();
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

            this.loadContent();
        },
        showMenuCapital(i) {
            if(i!='全部' && i >= 0){
                this.formSel.moneyGv = '：' + this.capitalAarray[i].showNm;
                this.formSel.capitalCode = this.capitalAarray[i].code;
            }else{
                this.formSel.moneyGv = '';
                this.formSel.capitalCode = '';
            }
            this.loadContent();
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
            this.loadContent();
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
            this.loadContent();
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

            this.loadContent();
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
            this.loadContent();
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

            this.loadContent();
        },exportData(type) {
            var detail = {
                'status':1,
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
            if(this.tabMsg=='tab1') { //当月日放款明细
                window.open(resPath + '/export/downMonthOfDayLoan?' + joinStr.substring(0,joinStr.length));
            } else { //月放款统计
                window.open(resPath + '/export/downMonthLoan?' + joinStr.substring(0,joinStr.length));               
            }

        }
    }
}
</script>