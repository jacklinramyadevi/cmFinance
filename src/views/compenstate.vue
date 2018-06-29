<template>
<!-- 代偿处理 -->
  <div class="sections">
    <div class="pl_body">
      <Tabs v-model="tabPaneValue"
        @on-click="getPageTable">
        <TabPane label="信美代偿"
          name="xinmei">
          <Row class="form_row">
            <Col :sm="22"
              :xs="24">
            <Form :model="formSel"
              class="downMenu">
              <FormItem>
                <Input style="display:none;"></Input>
                <Input v-model="formSel.input"
                  icon="ios-search"
                  placeholder="借款编号/客户姓名/手机号"
                  @on-enter="search"></Input>
                <Button type="primary"
                  @click="search">查询</Button>
                <DatePicker :value="formSel.selectTm"
                  format="yyyy/MM/dd"
                  type="daterange"
                  placement="bottom-start"
                  placeholder="借款时间"
                  @on-change="dateChange"></DatePicker>
                <DatePicker :value="formSel.repayTm"
                  format="yyyy/MM/dd"
                  type="daterange"
                  placement="bottom-start"
                  placeholder="应还时间"
                  @on-change="dateChange1"></DatePicker>
                <Dropdown trigger="click"
                  class="showMn"
                  @on-click="showMenu2"
                  @on-visible-change="orShow2">
                  <Button type="ghost"
                    :class="{active:vs2,chk:formSel.typeBs!=''}">
                    业务类型
                    <span v-text="formSel.typeBsDes"></span>
                    <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="全部">全部</DropdownItem>
                    <DropdownItem name="现金贷">现金贷</DropdownItem>
                    <DropdownItem name="消费贷">消费贷</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click"
                  class="showMn"
                  @on-click="showMenu5"
                  @on-visible-change="orShow5">
                  <Button type="ghost"
                    :class="{active:vs5,chk:formSel.moneyGvDes!=''}">
                    资金提供方
                    <span v-text="formSel.moneyGvDes">{{formSel.moneyGvDes}}</span>
                    <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="全部">全部</DropdownItem>
                    <DropdownItem v-for="(item,index) in moneyApply" :key="index" :name="item.belongNm">{{item.belongNm}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button v-if="formSel.input!='' || formSel.selectTm!='' || formSel.repayTm!='' || formSel.typeBs!='' || formSel.moneyGv!=''"
                  @click="reset">重置</Button>
                <span>代偿总金额：¥
                  <span v-text="totalMoney"></span>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- <span>信美存管资金账户余额：
                  <span v-if="xinmeiAccount.length>0"
                    v-text="xinmeiAccount"></span>
                  <span v-if="xinmeiAccount.length==0"
                    style="cursor:pointer;color:#3950D4"
                    @click="searchAccount">查询</span>
                </span> -->
              </FormItem>
            </Form>
            </Col>
            <Col :sm="2"
              :xs="24">
            <div class="float_right">
              <Button type="success"
                :disabled="btnDisabled"
                @click="cps(true)"> 信美代偿</Button>
            </div>
            </Col>
          </Row>
          <div class="table_show">
            <Table border
              :columns="columns1"
              :data="data1"
              @on-selection-change="handleAllSelect"
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
        </TabPane>
        <TabPane label="代理商代偿"
          name="agent">
          <Form :model="formSel2"
            class="downMenu">
            <FormItem>
              <Input style="display:none;"></Input>
              <Input v-model="formSel2.input"
                icon="ios-search"
                placeholder="代理商名称/法人名称/手机号" @on-enter="search02"
                ></Input>
              <Button type="primary"
                @click="search02">查询</Button>
              <Button v-if="formSel2.input!=''"
                @click="reset2">重置</Button>
            </FormItem>
          </Form>
          <div class="table_show">
            <Table border
              :columns="columns2"
              :data="data2"
              ref="table"></Table>
          </div>
          <Row :gutter="16"
            v-if="pageWin>=768">
            <Col :sm="5"
              :xs="24">
            <div class="total">共{{total2}}页</div>
            </Col>
            <Col :sm="19"
              :xs="24"
              class="txt_right">
            <Page :total="totalRecords2"
              show-elevator :current="pageChk02"
              @on-change="changePage"></Page>
            </Col>
          </Row>
          <Page v-else
            :total="totalRecords2"
            simple :current="pageChk02"
            @on-change="changePage"></Page>
        </TabPane>
      </Tabs>

    </div>

    <!--代偿确认-->
    <Modal v-model="cpsModal"
      title="信美代偿确认"
      width="600">
      <div slot="footer">
        <Button type="text"
          size="large"
          @click="cpsModal=!cpsModal">取消</Button>
        <Button type="primary"
          size="large"
          @click="cpsConfirm">确定</Button>
      </div>
      <Form :label-width="80">
        <!-- <FormItem label="时间">
          <DatePicker :value="selectTm"
            format="yyyy-MM-dd"
            placement="bottom-start"
            @on-change="cpsTmChange"
            placeholder="偿还时间"></DatePicker>
        </FormItem> -->
        <FormItem label="偿还时间">
          <Input v-model="repayTime"
            placeholder="偿还时间"
            disabled></Input>
        </FormItem>
        <FormItem label="偿还金额">
          <Input v-model="totalMoney"
            placeholder="偿还金额"
            disabled></Input>
        </FormItem>
        <FormItem label="偿还流水号">
          <Input v-model="sn"
            placeholder="偿还流水号"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="cpsModal2" class="noFooter noHeight"
      title="代理商代偿">
      <Form :model="compenstateForm" ref="compenstateForm" :rules="rulesForm">
        <!-- <FormItem>
          <DatePicker type="month"
            :value="compenstateForm.selectTm"
            format="yyyy-MM"
            placement="bottom-start"
            @on-change="monthChange"
            placeholder="代偿月份"
            :options="options1"></DatePicker>
        </FormItem> -->
        <FormItem label="偿还时间">
          <Input v-model="compenstateForm.selectTm"
            placeholder="偿还时间"
            disabled></Input>
        </FormItem>
        <FormItem label="代偿金额" prop="money">
          <Input v-model="compenstateForm.money"
            placeholder="输入代偿金额">
          </Input>
        </FormItem>
        <FormItem label="偿还流水号" prop="sn">
          <Input v-model="compenstateForm.sn"
            placeholder="偿还流水号"></Input>
        </FormItem>
        <div class="float_right">
          <Button type="text"
            size="large"
            @click="cpsModal2=!cpsModal2">取消</Button>
          <Button type="primary"
            size="large"
            @click="agentConfirm('compenstateForm')">确定</Button>
        </div>
        <div class="clear"></div>
      </Form>
      <div slot="footer"></div>
    </Modal>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'sections',
  data () {
    const money = (rule,value,callback) => {
      if (value.length === 0) {
        callback(new Error('请输入代偿金额（保留两位小数点）'));
      } else {
          if (!(/^([1-9][0-9]*)$|^([1-9][0-9]*)+(\.[0-9]{1,2})$/.test(value))) {
            callback(new Error('请输入正确的金额'));
          } else {
            callback()
          }
      }
    };
    const sn = (rule,value,callback) => {
      if (value.length === 0) {
        callback(new Error('请输入偿还流水号'));
      } else {
        if (!(/^[A-Za-z0-9]*$/.test(value))) {
          callback(new Error('请输入正确的的流水号'));
        } else {
          callback()
        }
      }
    }; 
    return {
      tabPaneValue: 'xinmei',
      btnDisabled: true,
      totalMoney: 0,
      repayTime: '',
      xinmeiAccount: '',
      // agebtRepayTime: '',
      vs: false,
      vs2: false,
      vs3: false,
      vs4: false,
      vs5: false,
      cpsModal: false,
      cpsModal2: false,
      tbWidth: 100,
      total: 0,
      total1: 0,
      total2: 0,
      totalRecords: 0,
      totalRecords2: 0,
      pageStart: 0,
      pageSize: 10,
      pageChk:1,
      pageStart02: 0,
      pageSize02: 10,
      pageChk02:1,
      selectTm: '',
      sn: '',
      mn: '',
      allSelection: [], // 信美代偿所有的表格选择项
      allSelection02: {}, // 代理商代偿表格选择项
      tabVal: 'xinmei',
      formSel: {
        overdueVal: 1,
        overdueVal1: 1,
        input: '',
        overdue: '',
        selectTm: '',
        repayTm: '',
        typeBs: '',
        typeBsDes: '',
        channelBs: '',
        typePd: '',
        moneyGv: '',    //value
        moneyGvDes: '' //name
      },
      formSel2: {
        input: ''
      },
      money: '',
      compenstateForm: {
        selectTm: '',
        sn: '',
        money: ''
      },
      rulesForm: {
        sn: [
          {required:true,validator:sn,trigger:'blur'}
        ],
        money: [
          {required:true,validator:money,trigger:'blur'}
        ]
      },
      columns1: [{
        type: 'selection',
        width: 60,
        align: 'center',
        fixed: 'left'
      },
      {
        title: '借款编号',
        key: 'loanNo',
        width: 100,
        fixed: 'left',
        align: 'center',
      }, {
        title: '客户姓名',
        key: 'custName',
        width: 100,
        fixed: 'left',
        align: 'center',
      }, {
        title: '手机号',
        key: 'custMobile',
        width: 120,
        fixed: 'left',
        align: 'center',
      }, {
        title: '身份证号',
        key: 'idCard',
        width: 170,
        align: 'center'
      }, {
        title:'产品类型',
        key: 'bsType',
        width:120,
        align: 'center'
      }, {
        title:'产品名称',
        key: 'product',
        width:120,
        align: 'center'
      }, {
        title: '借款金额',
        key: 'loanAmount',
        width: 100,
        align: 'center'
      },{
        title: '借款时间',
        key: 'loanTime',
        width: 165,
        align: 'center'
      },
      {
        title: '省份',
        key: 'province',
        width: 100,
        align: 'center'
      },
      {
        title: '城市',
        key: 'city',
        width: 100,
        align: 'center'
      }, {
        title: '当前期数',
        key: 'planStage',
        width: 100,
        align: 'center'
      }, {
        title: '总期数',
        key: 'totalStage',
        width: 100,
        align: 'center'
      }, {
        title: '应还本金',
        key: 'planPrp',
        width: 100,
        align: 'center'
      }, {
        title: '应还服务费',
        key: 'planSfe',
        width: 100,
        align: 'center'
      }, {
        title: '应还利息',
        key: 'planInt',
        width: 100,
        align: 'center'
      }, {
        title: '应还罚息',
        key: 'planPin',
        width: 100,
        align: 'center'
      },  {
        title: '应还违约金',
        key: 'dfltAmount',
        width: 100,
        align: 'center'
      },
      {
        title: '应还总金额',
        key: 'planAmount',
        width: 100,
        align: 'center'
      },
      //  {
      //   title: '订单流水号',
      //   key: 'flowNo',
      //   width: 220,
      //   align: 'center'
      // },
       {
        title: '应还时间',
        key: 'planLtm',
        width: 165,
        align: 'center'
      }, {
        title: '逾期天数',
        key: 'exceedDay',
        width: 100,
        align: 'center'
      }, {
        title: '资金提供方',
        key: 'payPlat',
        width: 100,
        align: 'center'
      }, {
        title: '创建时间',
        key: 'createTime',
        width: 180,
        align: 'center'
      }, {
        title: '当前状态',
        key: 'cpsSt',
        width: 100,
        align: 'center'
      }],
      data1: [],
      columns2: [{
        title: '代理商名称',
        key: 'agentBusname',
         align: 'center'
      },
      {
        title: '法人姓名',
        key: 'agentName',
         align: 'center'
      },
      {
        title: '手机号',
        key: 'agentMobi',
         align: 'center'
      },
      {
        title: '省份',
        key: 'province',
         align: 'center'
      }, {
        title: '城市',
        key: 'city',
         align: 'center'
      }, {
        title: '操作',
        key: 'action',
        width: 80,
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
                  this.cpsModal2 = true;
                  this.allSelection02 = params.row
                }
              }
            }, '代偿')
          ])
        }
      }],
      data2: [],
      options1: {
        disabledDate (date) {
          var now = new Date();
          var current;
          if (now.getMonth() == 0) {
            current = new Date(now.getFullYear() - 1, 11, 1);
          } else {
            current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          }

          var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
          return date && date.valueOf() >= (new Date(current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + lastDay.getDate()) - 86400000);
          //return date && date.valueOf()>(new Date("2017-12-31"));
          //return date && date.valueOf()<(Date.now()-86400000);
        }
      },
      moneyApply: [] 
    }
  },
  created: function () {
    // var arr = this.columns1;
    // for(var i=0;i<arr.length;i++){
    //   if(arr[i].width==undefined){
    //     arr[i]['width']=this.tbWidth;
    //   }
    // }
    // this.columns1 = arr;
    this.xinmeiAccount = '';
    var now = new Date();
    var current;
    if (now.getMonth() == 0) {
      current = new Date(now.getFullYear() - 1, 11, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }
    // 获取资金提供方
    this.axios
          .get('/detail/queryPayChannelList?type=3')
            .then(res => {
                if (res.data.success) {
                  this.moneyApply = res.data.result
                }
            })
  },
  computed: {
    pageWin () {
      return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
    }
  },
  watch: {
    allSelection: function (arr) { //选择条数大于0，则代偿按钮可点
      this.btnDisabled = (arr.length > 0) ? false : true
    }
  },
  mounted () {
    this.pageChk=1;
    this.loadContent();
    let thisTime = new Date;
    // let thisDate = thisTime.getFullYear() + "-" + (thisTime.getMonth() + 1) + "-" + thisTime.getDate();
    this.repayTime = thisTime.getFullYear() + "-" + (thisTime.getMonth() + 1) + "-" + thisTime.getDate();
    this.compenstateForm.selectTm = thisTime.getFullYear() + "-" + (thisTime.getMonth() + 1);/*+ "-" + thisTime.getDate()*/
  },
  methods: {
    searchAccount () { //点击查询信美存管资金账户余额
      let that = this;
      that.axios.post('',
        {},
        { headers: { 'Content-Type': 'application/json' } })
        .then(function (resp) {
          if (resp.data.resCode === 1) {
            that.xinmeiAccount = "¥" + resp.data.account
          } else {
            that.$Message.warning(resp.data.msg);
          }
        })
        .catch(function (resp) {
          that.$Message.warning('系统异常');
        });
    },
    getPageTable () { //tebs切换时获取页面数据
      this.pageChk=1;
      this.pageChk02=1;
      if (this.tabPaneValue === 'xinmei') { //信美代偿
        return this.loadContent();
      } else { //代理商代偿
        return this.agentContent();
      }
    },
    handleAllSelect (selections) {
      this.allSelection = [];
      this.totalMoney = 0;
      for (let i = 0; i < selections.length; i++) {
        this.allSelection.push(selections[i].planId)
        this.totalMoney += selections[i].planAmount
      }
      this.totalMoney = this.totalMoney
    },
    cpsTmChange (cpsTm) {
      this.selectTm = cpsTm
    },
    monthChange (cpsTm) {
      this.compenstateForm.selectTm = cpsTm
    },
    cps (isShow) {
      // var cpsData = this.$refs.table.getSelection()
      // if (cpsData.length <= 0) {
      //   this.$Message.error('代偿计划不能为空')
      //   return
      // }

      this.cpsModal = isShow
    },
    cpsConfirm () {
      var self = this
      // var cpsData = this.$refs.table.getSelection();
      // if (cpsData.length <= 0) {
      //   this.$Message.error('代偿计划不能为空')
      //   return
      // }
      var planIds = []

      for (var i = 0; i < self.allSelection.length; i++) {
        // var item = self.allSelection[i];
        planIds.push(self.allSelection[i]);
      }


      if (self.sn == null || self.sn == '') {
        this.$Message.error('偿还流水号不能为空！')
        return
      }
      // if (this.selectTm == null || this.selectTm == '') {
      //   this.$Message.error('代偿时间为空')
      //   return
      // }
      //          if(this.mn == null || this.mn == ''){
      //            this.$Message.error('代偿金额不能为空')
      //            return
      //          }

      let cpsFormData = new FormData;
      cpsFormData.append("cpsTm", self.repayTime);
      cpsFormData.append("cpsAmt", self.totalMoney);
      cpsFormData.append("cpsSn", self.sn);
      cpsFormData.append("planIds", planIds);

      self.axios.post('/compensatory/cpsConfirm',
        // {cpsTm: self.repayTime,//待代偿
        // cpsAmt: self.totalMoney,
        // cpsSn: self.sn,
        // planIds: JSON.stringify(planIds)
        // planIds: planIds}
        cpsFormData
        ,
        // { headers: { 'Content-Type': 'application/json' } })
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (respon) {
          self.total1 = respon.count

          if (respon.data.resCode == 1) {
            self.$Message.success('操作成功')
            self.pageStart = 1;
            self.pageChk=1;
            self.loadContent(1)
            self.cpsModal = false
            self.sn = ''
            self.btnDisabled = true
          } else {
            self.$Message.warning(respon.data.msg)
          }
        }).catch(function (resp) {
          self.$Message.warning('系统异常');
        });

    },
    agentConfirm(name) {
       let that = this;
       this.$refs[name].validate((valid) => {
        if (valid) { 
            let agtFormData = new FormData;
            agtFormData.append('agentId', that.allSelection02.agentId);
            agtFormData.append('agentName', that.allSelection02.agentName);
            agtFormData.append('agentBusname', that.allSelection02.agentBusname);
            agtFormData.append('agentMobi', that.allSelection02.agentMobi);
            agtFormData.append('province', that.allSelection02.province);
            agtFormData.append('city', that.allSelection02.city);
            agtFormData.append('compenMonth', that.compenstateForm.selectTm);
            agtFormData.append('amount', that.compenstateForm.money);
            agtFormData.append('operNm', that.compenstateForm.sn);
            that.axios.post('/compensatory/insertAgentCPSRecord',
              agtFormData,
              { headers: { 'Content-Type': 'multipart/form-data' } })
              .then(function (respon) {
                that.total2 = respon.count

                if (respon.data.resCode == 1) {
                  that.$Message.success('操作成功')
                  that.pageStart02 = 1;
                  that.agentContent()
                  that.cpsModal2 = false
                  that.compenstateForm.money = ""
                  that.compenstateForm.sn = ""
                } else {
                  that.$Message.warning(respon.data.msg)
                }
              }).catch(function (resp) {
                that.$Message.warning('系统异常');
              });
         }
      })
      // let reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
      // if (that.compenstateForm.money === '') {
      //   this.$Message.error('偿还金额不能为空！')
      //   return
      // } else if (!reg.test(that.compenstateForm.money)) {
      //   this.$Message.error('请输入正确的偿还金额数！')
      //   return
      // }
      // if (that.compenstateForm.sn === '') {
      //   this.$Message.error('偿还流水号不能为空！')
      //   return
      // }
    },
    showMenu2 (val) {
      this.formSel.typeBsDes = val
      if (val === '全部') {
        this.formSel.typeBsDes = ''
        this.formSel.typeBs = ''
      } else if (val === '现金贷') {
        this.formSel.typeBs = '0'
      } else if (val === '消费贷') {
        this.formSel.typeBs = '1'
      }
      // if (val != '全部' && val != '') {
      //   this.formSel.typeBs = '：' + val;
      // } else {
      //   this.formSel.typeBs = '';
      // }
      this.pageChk=1;
      this.loadContent();
    },
    orShow2 (visible) {
      this.vs2 = visible;
    },
    /*showMenu3(val){
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
    },*/
    showMenu5 (val) {
      if (val != '全部' && val != '') {
          this.formSel.moneyGvDes = '：' + val;
          for (let index of this.moneyApply) {
             if (this.formSel.moneyGvDes.substring(1) === index.belongNm) {
               this.formSel.moneyGv = index.payCode
             }
          }
          // this.formSel.moneyGv = 
      } else {
          this.formSel.moneyGvDes = ''
          this.formSel.moneyGv = ''
      }
      this.pageChk=1;
      this.loadContent();
    },
    search(){
      this.pageChk=1;
      this.loadContent();
    },
    search02(){
      this.pageChk02=1;
      this.agentContent();
    },
    agentContent () { //代理商代偿列表查询
      let that = this;
      that.data2 = [];
      let agentFormData = new FormData();
      agentFormData.append('value', that.formSel2.input);
      agentFormData.append('pageStart', that.pageStart02);
      agentFormData.append('pageSize', that.pageSize02);
      that.axios.post('/compensatory/queryAgentCps', agentFormData,
        { headers: { 'Content-Type': 'application/json' } })
        .then(function (resp) {
          if (resp.data.resCode === 1) {
            that.total2 = Math.ceil((resp.data.count / that.pageSize02));
            that.totalRecords2 = resp.data.count;
            that.data2 = resp.data.result
          } else {
            that.$Message.warning(resp.data.msg);
          }
        })
        .catch(function (resp) {
          that.$Message.warning('系统异常');
        });
    },

    loadContent () { //信美代偿列表查询
      this.data1 = [];
      var that = this;

      axios.post('/compensatory/queryAllCompensatoryInfos', {
        cpsSt: 1,//待代偿
        loanInput: that.formSel.input,
        loanStartTime: that.formSel.selectTm ? that.formSel.selectTm[0] : '',
        loanEndTime: that.formSel.selectTm ? that.formSel.selectTm[1] : '',
        payPlat: that.formSel.moneyGv,
        bsType: that.formSel.typeBs,
        repStartTime: that.formSel.repayTm ? that.formSel.repayTm[0] : '',
        repEndTime: that.formSel.repayTm ? that.formSel.repayTm[1] : '',
        pageStart: that.pageStart,
        pageSize: that.pageSize
      },
        { headers: { 'Content-Type': 'application/json' } })
        .then(function (respon) {

          that.total = Math.ceil((respon.data.count / that.pageSize));
          that.totalRecords = respon.data.count;

          if (respon.data.resCode == 1) {
            //that.total = respon.data.count;
            respon.data.result.forEach(function (element) {
              if (element.cpsSt == 0) {
                element.cpsSt = '未到代偿日'
              } else if (element.cpsSt == 1) {
                element.cpsSt = '待代偿'
              } else if (element.status == 2) {
                element.cpsSt = '代偿成功'
              }
            }, this);
            that.data1 = respon.data.result;
          } else {
            that.$Message.warning(respon.data.msg);
          }
        }).catch(function (resp) {
          that.$Message.warning('系统异常');
        });
    },
    orShow5 (visible) {
      this.vs5 = visible;
    },
    dateChange (date) {
      this.formSel.selectTm = date;
      this.loadContent();
    },
    dateChange1 (date) {
      this.formSel.repayTm = date;
      this.loadContent();
    },
    overdueClick () {
      this.formSel.overdue = ' : ' + this.formSel.overdueVal + '-' + this.formSel.overdueVal1;
      this.vs = false;
    },
    exportData () {
      this.$Modal.confirm({
        title: '信美代偿',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.money,
              autofocus: true,
              placeholder: '输入代偿金额'
            },
            style: {
              marginTop: '20px'
            },
            on: {
              input: (val) => {
                this.money = val;
              }
            }
          })
        }
      })
    },
    changePage (pageNum) {

      this.pageChk=pageNum;
      this.pageChk02=pageNum;
      if (this.tabPaneValue === 'xinmei') {
        this.pageStart = (pageNum - 1) * this.pageSize;
        this.loadContent()
      } else {
        this.pageStart02 = (pageNum - 1) * this.pageSize02;
        this.agentContent()
      }
    },
    reset () {
      this.formSel = {
        overdueVal: 1,
        overdueVal1: 1,
        input: '',
        overdue: '',
        selectTm: '',
        repayTm: '',
        typeBs: '',
        channelBs: '',
        typePd: '',
        moneyGv: ''
      };
      this.pageChk=1;
      this.loadContent();
    },
    reset2 () {
      this.formSel2.input = '';
      this.pageChk02=1;
      this.agentContent();
    }
  }
}
</script>
