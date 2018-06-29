<template>
  <div class="sections">
    <h1>扣回放款</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu" onsubmit="return false;">
                    <FormItem>
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号" @on-enter="search"></Input>
                        <Button type="primary" @click="search">查询</Button>

                        <DatePicker :value="formSel.payTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange1"></DatePicker>
                        <!--<Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                产品类型<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="未结算" :selected="formSel.selectTp=='未结算'">未结算</DropdownItem>
                                <DropdownItem name="已结算" :selected="formSel.selectTp=='已结算'">已结算</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>-->

                        <Dropdown trigger="click" class="showMn" @on-click="showMenu1" @on-visible-change="orShow1">
                            <Button type="ghost" :class="{active:vs1,chk:formSel.selectCm!=''}">
                                资金提供方<span v-text="formSel.selectCm"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectCm==''">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.selectCm.indexOf('华金')>=0">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.selectCm.indexOf('中科诺')>=0">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                         <Button v-if="formSel.input!='' || formSel.selectCm!='' || formSel.payTm.length>0" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :page-size="pageSize" :total="totalRecords" :current="pageChk" show-elevator @on-change="changePage"></Page>
            </Col>
        </Row>
          <Page v-else :page-size="pageSize" :current="pageChk" :total="totalRecords" simple @on-change="changePage"></Page>
    </div>
    <Modal v-model="model1" title="扣回放款" @on-ok="countOk" class="userInfo" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="110">
                        <FormItem label="订单号"><span>{{backDetail.loanNo}}</span></FormItem>
                        <FormItem label="客户姓名"><span>{{backDetail.custName}}</span></FormItem>
                        <FormItem label="手机号码"><span>{{backDetail.custMobile}}</span></FormItem>
                        <FormItem label="产品类型"><span>{{backDetail.product}}</span></FormItem>
                        <FormItem label="订单金额"><span>{{backDetail.loanAmount}}</span></FormItem>
                        <FormItem label="贴息金额"><span>{{backDetail.discountAmount}}</span></FormItem>
                        <FormItem label="实际放款金额"><span>{{backDetail.payAmount}}</span></FormItem>
                        <FormItem label="资金提供方"><span>{{backDetail.payPlat}}</span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="110">
                        <FormItem label="收款方类型"><span>{{backDetail.personal}}</span></FormItem>
                        <FormItem label="收款方姓名"><span>{{backDetail.recvName}}</span></FormItem>
                        <FormItem label="收款方手机号"><span>{{backDetail.recvMobile}}</span></FormItem>
                        <!--<FormItem label="收款方身份证"><span>{{backDetail.loanNo}}</span></FormItem>-->
                        <FormItem label="收款方银行卡号"><span>{{backDetail.recvBankCard}}</span></FormItem>
                        <FormItem label="所属银行"><span>{{backDetail.recvBankName}}</span></FormItem>
                        <FormItem label="借款时间"><span>{{backDetail.loanTime}}</span></FormItem>
                        <FormItem label="扣款金额"><span>{{backDetail.money}}</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>

        <Form name="formCount" class="formBd" :model="formCount" :rules="ruleCount">
            <FormItem><h2>扣款服务</h2></FormItem>
            <FormItem prop="why">
                <Select v-model="formCount.why" placeholder="选择扣款原因">
                    <Option value="打款重复">打款重复</Option>
                    <Option value="取消订单">取消订单</Option>
                    <Option value="暂停结款">暂停结款</Option>
                </Select>
            </FormItem>
            <FormItem prop="money">
              <Icon type="social-yen"></Icon><InputNumber :min="0" v-model="formCount.money" class="moneyIpt" placeholder="扣款金额(元)"></InputNumber>
            </FormItem>
            <FormItem prop="desc">
                <Input type="textarea" v-model="formCount.desc" :autosize="{minRows:4,maxRow:4}" placeholder="输入备注信息"></Input>
            </FormItem>
        </Form>

    </Modal>

  </div>
</template>

<script>

export default {
  name: 'sections',
  data () {
    return {
        visible: false,
        vs: false,
        vs1: false,
        btnSelct:'全部',
        model1:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        pageStart:0,
        pageSize:3,
        merchant:'',
        acctId:'',
        loanId:'',
        operatorId:0,
        formSel:{
            input:'',
            selectTp:'',
            selectCm:'',
            payTm:[]
        },
        backDetail:{},
        formCount:{
            why:'',
            money:0.00,
            desc:''
        },
        ruleCount:{
            why:[
                {require:true,type:'string',message:'请选择扣款原因',trigger:'blur'}
            ],
            money:[
              {require:true,type:'string',message:'请选择扣款金额',trigger:'blur'}
            ],
            desc:[
                {require:true,type:'string',message:'备注不能为空',trigger:'blur'}
            ]
        },
        columns1: [
        {
            title: '借款编号',
            key: 'loanNo'
        },
        {
            title: '客户姓名',
            key: 'custName'
        },
        {
            title: '手机号',
            key: 'custMobile'
        },
        {
            title: '产品类型',
            key: 'product'
        },
        {
            title: '订单金额',
            key: 'loanAmount'
        },
        {
            title: '贴息金额',
            key: 'discountAmount',
            width:92
        },
        {
            title: '实际放款金额',
            key: 'payAmount'
        },
        {
            title: '收款方类型',
            key: 'personal'
        },
        {
            title: '收款方姓名',
            key: 'recvName'
        },
        {
            title: '收款方手机号',
            key: 'recvMobile'
        },
        {
            title: '收款方银行卡号',
            key: 'recvBankCard',
            width:124
        },
        {
            title: '所属银行',
            key: 'recvBankName'
        },
        {
            title: '借款时间',
            key: 'loanTime',
            width:104
        },
        {
            title: '资金提供方',
            key: 'payPlat'
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            fixed:'right',
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
                    }, '扣回放款')
                ]);
            }
        }],
        data1: [],
        }
    },
    created:function(){
        this.pageChk=1;
        this.loadContent();

        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
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
                this.formSel.selectTp=' : '+val;
            }else{
                this.formSel.selectTp='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu1(val){
            if(val!='全部' && val!=''){
                this.formSel.selectCm=' : '+val;
            }else{
                this.formSel.selectCm='';
            }
            this.pageChk=1;
            this.loadContent();
        },
        orShow1(visible){
            this.vs1=visible;
        },
        dateChange1(date){
            this.formSel.payTm=date;
            this.pageChk=1;
            this.loadContent();
        },
        exportData () {
          var that = this;
          that.data1=[];
          var detail = {};
          detail['loanInput']=that.formSel.input;
          detail['beginDate']=that.formSel.payTm[0];
          detail['endDate']=that.formSel.payTm[1];
          detail['selectCm']=that.formSel.selectCm;
        },
        /*changePage(){
            /!*this.data1=this.*!/
        },*/
        show(index){
            var that = this;
            var result = this.data1[index];
            that.backDetail['loanNo']=result.loanNo;
            that.backDetail['custName']=result.custName;
            that.backDetail['custMobile']=result.custMobile;
            that.backDetail['product']=result.product;
            that.backDetail['loanAmount']=result.loanAmount;
            that.backDetail['discountAmount']=result.discountAmount;
            that.backDetail['payAmount']=result.payAmount;
            that.backDetail['personal']=result.personal;
            that.backDetail['recvName']=result.recvName;
            that.backDetail['recvMobile']=result.recvMobile;
            that.backDetail['recvBankCard']=result.recvBankCard;
            that.backDetail['recvBankName']=result.recvBankName;
            that.backDetail['loanTime']=result.loanTime;
            that.backDetail['payPlat']=result.payPlat;
            that.acctId='';
            that.acctId=result.acctId;
            that.loanId='';
            that.loanId=result.loanId;
            this.formCount.why='';
            this.formCount.desc='';
            this.model1=true;
        },
        countOk(){
          var detail={};
          var that = this;
          if(that.formCount.money == ''){
              alert("扣款金额不能为空");
              return false;
          }
          /*this.formCount.$valid((valid) => {
            if(valid){

            }else{
              this.$Message.error(valid.message);
            }
          });*/
          detail['loanNo']=that.backDetail.loanNo;
          detail['custName']=that.backDetail.custMobile;
          detail['custMobile']=that.backDetail.loanNo;
          detail['product']=that.backDetail.product;
          detail['loanAmount']=that.backDetail.loanAmount;
          detail['discountAmount']=that.backDetail.discountAmount;
          detail['payAmount']=that.backDetail.payAmount;
          detail['personal']=that.backDetail.personal;
          detail['recvName']=that.backDetail.recvName;
          detail['recvMobile']=that.backDetail.recvMobile;
          detail['recvBankCard']=that.backDetail.recvBankCard;
          detail['recvBankName']=that.backDetail.recvBankName;
          detail['loanTime']=that.backDetail.loanTime;
          detail['payPlat']=that.backDetail.payPlat;
          detail['merchant']=that.merchant;
          var num = new Number(that.formCount.money*100);
          detail['money']=num.toFixed(0);
          detail['why']=that.formCount.why;
          detail['desc']=that.formCount.desc;
          detail['acctId']=that.acctId;
          detail['loanId']=that.loanId;
          detail['operatorId']=that.operatorId;
          this.axios.post('/cancel/backMoney',JSON.stringify(detail),
            {headers:{'Content-Type':'application/json'}
            }).then(function(respon){
            if(respon.data.resCode == 1){
              alert("扣款操作成功,请随后查询扣款结果");
              this.pageChk=1;
              loadContent();
            }

          }).catch(function(resp){
            that.$Message.warning('系统异常');
          });
        },
        search(){
            this.pageChk=1;
            loadContent();
        },
      loadContent(){
        var that = this;
        that.data1=[];
        var detail = {};
        detail['loanInput']=that.formSel.input;
        detail['beginDate']=that.formSel.payTm[0];
        detail['endDate']=that.formSel.payTm[1];
        detail['selectCm']=that.formSel.selectCm;
        detail['pageStart']=that.pageStart;
        detail['pageSize']=that.pageSize;
        this.axios.post('/cancel/queryAlreadyLoans',JSON.stringify(detail),
          {headers:{'Content-Type':'application/json'}
          }).then(function(respon){
              if(respon.data.resCode == 1){
                that.total=Math.ceil((respon.data.count/that.pageSize));
                that.totalRecords = that.total;
                respon.data.result.forEach(function (element) {

                  if(element.personal == 0){
                    element.personal = '对私';
                  }else if(element.personal == 1){
                    element.personal = '对公';
                  }
                  //that.data1.push(element);
                },this);

                that.data1 = respon.data.result;
              }

            }).catch(function(resp){
            that.$Message.warning('系统异常');
          });
      },

      changePage(pageNum){
        this.pageChk=pageNum;
        this.pageStart = (pageNum - 1) * this.pageSize;
        this.loadContent();
      },
      reset(){
        this.formSel={
            input:'',
            selectCm:'',
            payTm:[]
        }
        this.pageChk=1;
        this.loadContent();
      }

    }
}
</script>
