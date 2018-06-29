<template>
  <div class="sections">
      <h1>月资金总览</h1>
      <div class="pl_body">
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
            <Table border :columns="columns2" :data="data2" ref="table"></Table>
            
        </div>
            
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
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        tabSize:'default',
        formSel:{
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
        columns2:[{
            title:'放款月份',
            key:'loanTm',
            width:104,
            fixed:'left'
        },{
            title:'放款总额',
            key:'principal'
        },{
            title:'到期本金',
            key:'expireAmount'
        },{
            title:'未到期本金',
            key:'unexpireAmount'
        },{
            title:'回款本金总额',
            key:'clearAmount'
        },{
            title:'放款本金余额',
            key:'balAmount'
        },{
            title:'逾期本金总额',
            key:'overdueAmount'
        },{
            title:'提前收回本金',
            key:'arpAmount'
        },{
            title:'利息总额',
            key:'planInt'
        },{
            title:'到期利息',
            key:'expireInt'
        },{
            title:'未到期利息',
            key:'unexpireInt'
        },{
            title:'已还利息',
            key:'clearInt'
        },{
            title:'利息余额',
            key:'balInt'
        },{
            title:'逾期利息总额',
            key:'overdueInt'
        },{
            title:'提前收回违约金',
            key:'dfltAmt'
        },{
            title:'服务费总额',
            key:'planSfe'
        },{
            title:'到期服务费',
            key:'expireSfe'
        },{
            title:'未到期服务费',
            key:'unexpireSfe'
        },{
            title:'已还服务费',
            key:'clearSfe'
        },{
            title:'服务费余额',
            key:'balSfe'
        },{
            title:'逾期服务费总额',
            key:'overdueSfe'
        }/*,{
            title:'提前收回服务费',
            key:'payjfMn'
        }*/],
        data2:[],
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
        this.loadContent();
        this.eachAge();
        this.loadProvince();
        this.loadPayChannel();
        this.loadProduct();
        this.loadChannel();
        var arr=this.columns2;
        for(var i=0;i<arr.length;i++){
            arr[i]['minWidth']=104;
        }
        this.columns2=arr;
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
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
            showData.financeRepay(detail,'detail/sttLoanOfMonth',this);
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
                    filename: '月总览统计',
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
        financeRepay(result){
            if(result==null){
                return false;
            }
            if(result.details.length>0){
                this.data2=result.details;
                if(result.totalDetail!=undefined){
                    var arr=result.totalDetail;
                    arr['loanTm']='合计';
                    this.data2.push(arr);
                }
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
                this.formSel.tpCode = this.productArray[i].productCode;
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
        }
    }
}
</script>
