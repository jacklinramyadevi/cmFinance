<template>
    <div class="sections">
        <Row class="titleShow">
            <Col :sm="6" :xs="24">
                <h1>财务总览</h1>
            </Col>
            <Col :sm="18" :xs="24">
            </Col>
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
            <!-- </Col> -->
        </Row>
        <div class="financeDetail">
            <div class="repayDetail">
                <Row :gutter="16">
                    <Col :sm="8" :xs="24">
                        <div class="first">
                            <h1>{{amount.planPrp}}</h1>
                            <p>本金总额</p>
                        </div>
                    </Col>
                    <Col :sm="8" :xs="24">
                        <div class="second">
                            <h1>{{amount.planInt}}</h1>
                            <p>利息总额</p>
                        </div>
                    </Col>
                    <Col :sm="8" :xs="24">
                        <div class="third">
                            <h1>{{amount.planSfe}}</h1>
                            <p>服务费总额</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="moneyShow">
                <Row :gutter="16" class="repayCount">
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>到期资金</h3>
                            <Row>
                                <Col span="8" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.expireAmount}}</h1>
                                </Col>
                                <Col span="8" class="second">
                                    <p>利息</p>
                                    <h1>{{amount.expireInt}}</h1>
                                </Col>
                                <Col span="8" class="third">
                                    <p>服务费</p>
                                    <h1>{{amount.expireSfe}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>未到期资金</h3>
                            <Row>
                                <Col span="8" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.unexpireAmount}}</h1>
                                </Col>
                                <Col span="8" class="second">
                                    <p>利息</p>
                                    <h1>{{amount.unexpireInt}}</h1>
                                </Col>
                                <Col span="8" class="third">
                                    <p>服务费</p>
                                    <h1>{{amount.unexpireSfe}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row :gutter="16" class="repayCount">
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>已还资金</h3>
                            <Row>
                                <Col span="8" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.clearAmount}}</h1>
                                </Col>
                                <Col span="8" class="second">
                                    <p>利息</p>
                                    <h1>{{amount.clearInt}}</h1>
                                </Col>
                                <Col span="8" class="third">
                                    <p>服务费</p>
                                    <h1>{{amount.clearSfe}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>资金余额</h3>
                            <Row>
                                <Col span="8" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.balAmount}}</h1>
                                </Col>
                                <Col span="8" class="second">
                                    <p>利息</p>
                                    <h1>{{amount.balInt}}</h1>
                                </Col>
                                <Col span="8" class="third">
                                    <p>服务费</p>
                                    <h1>{{amount.balSfe}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row :gutter="16" class="repayCount">
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>逾期资金</h3>
                            <Row>
                                <Col span="8" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.overdueAmount}}</h1>
                                </Col>
                                <Col span="8" class="second">
                                    <p>到期利息</p>
                                    <h1>{{amount.overdueInt}}</h1>
                                </Col>
                                <Col span="8" class="third">
                                    <p>到期服务费</p>
                                    <h1>{{amount.overdueSfe}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col :sm="12" :xs="24">
                        <div>
                            <h3>提前收回</h3>
                            <Row>
                                <Col span="12" class="first">
                                    <p>本金</p>
                                    <h1>{{amount.arpAmount}}</h1>
                                </Col>
                                <Col span="12" class="third">
                                    <p>违约金</p>
                                    <h1>{{amount.dfltAmt}}</h1>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
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
        amount:{
            planPrp:0,
            expireAmount:0,
            unexpireAmount:0,
            clearAmount:0,
            balAmount:0,
            overdueAmount:0,
            arpAmount:0,
            planInt:0,
            expireInt:0,
            unexpireInt:0,
            clearInt:0,
            balInt:0,
            overdueInt:0,
            dfltAmt:0,
            planSfe:0,
            expireSfe:0,
            unexpireSfe:0,
            clearSfe:0,
            balSfe:0,
            overdueSfe:0
        },
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
    },
    computed :{
    },
    methods: {
        financeRepay(result){
            if(result !=null && result.hasOwnProperty('planPrp')){
                this.amount = result;
            } else {
                this.amount.planPrp = 0;
                this.amount.expireAmount = 0;
                this.amount.unexpireAmount = 0;
                this.amount.clearAmount = 0;
                this.amount.balAmount = 0;
                this.amount.overdueAmount = 0;
                this.amount.arpAmount = 0;
                this.amount.planInt = 0;
                this.amount.expireInt = 0;
                this.amount.unexpireInt = 0;
                this.amount.clearInt = 0;
                this.amount.balInt = 0;
                this.amount.overdueInt = 0;
                this.amount.dfltAmt = 0;
                this.amount.planSfe = 0;
                this.amount.expireSfe = 0;
                this.amount.unexpireSfe = 0;
                this.amount.clearSfe = 0;
                this.amount.balSfe = 0;
                this.amount.overdueSfe = 0;
            }
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
        },
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
            showData.financeRepay(detail,'detail/sttLoanDetail',this);
        },
        eachAge() {
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
        },
        loadChannel(){
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
        },reset() {
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
