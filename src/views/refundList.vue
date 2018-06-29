<template>
  <div class="sections">
    <h1>退单明细表</h1>
    <div class="pl_body">
      <Row class="form_row">
        <Col :sm="22"
             :xs="24">
        <Form :model="formSel"
              class="downMenu"
              onsubmit="return false;">
          <FormItem>
            <Input style="display:none;"></Input>
            <Input v-model="formSel.input"
                   placeholder="借款编号/手机号/客户姓名/身份证"
                   @on-enter="search"></Input>
            <Dropdown trigger="click"
                      class="showMn"
                      @on-click="showMenu"
                      @on-visible-change="orShow">
              <Button type="ghost"
                      :class="{active:vs,chk:formSel.selectTp!=''}">
                产品类型
                <span v-text="formSel.selectTp"></span>
                <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="资金方"
                              :selected="formSel.selectTp==''">资金方</DropdownItem>
                <DropdownItem name="0:华金"
                              :selected="formSel.selectTpValue=='0'">华金</DropdownItem>
                <DropdownItem name="1:中科诺"
                              :selected="formSel.selectTpValue=='1'">中科诺</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="primary"
                    @click="search">查询</Button>
            <Button v-if="formSel.input!=''"
                    @click="reset">重置</Button>
          </FormItem>
        </Form>
        </Col>
        <Col :sm="2"
             :xs="24">
        <div class="float_right">
          <Button type="success"
                  @click="exportData()">
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
      <Row :gutter="16" v-if="pageWin>=768">
        <Col :sm="5" :xs="24">
        <div class="total">共{{total}}页</div>
        </Col>
        <Col :sm="19" :xs="24" class="txt_right">
        <Page :page-size="pageSize" :current="pageChk" :total="totalRecords" show-elevator @on-change="changePage"></Page>
        </Col>
      </Row>
      <Page v-else :page-size="pageSize" :current="pageChk" :total="totalRecords" simple @on-change="changePage"></Page>
    </div>

    <Modal v-model="refundModel"
           title="退款处理"
           width="600">
      <div slot="footer">
        <Button type="text"
                size="large"
                @click="refundModel=!refundModel">取消</Button>
        <Button type="primary"
                size="large"
                @click="refundProcess('formRefund')">确定</Button>
      </div>
      <Form ref="formRefund"
            :model="formRefund"
            :rules="ruleRefund"
            :label-width="90">
        <FormItem label="退款渠道"
                  prop="payChannel">
          <Select v-model="formRefund.payChannel"
                  placeholder="请选择">
            <Option value="110304">宝付原形</Option>
            <Option value="001301">支付宝（益倍嘉）原形</Option>
          </Select>
        </FormItem>
        <FormItem label="退款金额">
          <Input v-model="formRefund.refundAmt"
                 placeholder="退款金额"></Input>
        </FormItem>
        <FormItem label="退款原因"
                  prop="remark">
          <Input v-model="formRefund.remark"
                 placeholder="退款原因"></Input>
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
        formRefund: {
          refundAmt: 0,
          remark: '',
          payChannel: '',
          flowNo: '',
          acctId: ''
        },
        ruleRefund: {
          payChannel: { require: true, type: 'string', message: '请选择退款渠道', trigger: 'blur' },
          remark: { require: true, type: 'string', message: '请输入退款原因', trigger: 'blur' }
        },
        refundModel: false,
        visible: false,
        vs: false,
        vs1: false,
        btnSelct: '全部',
        model1: false,
        tbWidth: 100,
        total: 0,
        totalRecords: 0,
        pageStart: 0,
        pageSize: 10,
        pageChk:1,
        merchant: '',
        acctId: '',
        loanId: '',
        operatorId: 0,
        formSel: {
          input: ''
          /*name:'',
          loanNo:'',
          mobile:''*/
        },
        columns1: [
          {
            title: '借款编号',
            key: 'loanNo',
            fixed: 'left',
            width: 210
          },
          {
            title: '客户姓名',
            key: 'acctName',
            minWidth: 120
          },
          {
            title: '手机号',
            key: 'acctMobi',
            width: 160
          },
          {
            title: '身份证',
            key: 'acctIdNo',
            width: 170
          },
          {
            title: '性别',
            key: 'sex',
            minWidth: 90
          },
          {
            title: '年龄',
            key: 'age',
            minWidth: 90
          },
          {
            title: '借款金额',
            key: 'amount',
            width: 210
          },
          {
            title: '首付金额',
            key: 'prePayAmt',
            width: 100
          },
          {
            title: '贴息率',
            key: 'discountRate',
            width: 140
          },
          {
            title: '贴息金额',
            key: 'discount',
            width: 110
          },
          {
            title: '放款总金额',
            key: 'principal',
            width: 110
          },
          {
            title: '借款时间',
            key: 'crtTm',
            width: 110
          },
          {
            title: '结算平台',
            key: 'merchant',
            width: 110
          },
          {
            title: '结算时间',
            key: 'payTime',
            width: 110
          },
          {
            title: '结算流水号',
            key: 'erFlowNo',
            width: 110
          },
          {
            title: '扣款平台',
            key: 'bmAmount',
            width: 110
          },
          {
            title: '扣款时间',
            key: 'bmMerchant',
            width: 110
          },
          {
            title: '扣款流水号',
            key: 'bmCrtTm',
            width: 110
          },
          {
            title: '资金方',
            key: 'bmFlowNo',
            width: 110
          }
         ],
        data1: []
      }
    },
    created: function () {

      //this.loanContent();

      // if ($(window).width() < 768) {
      //   var arr = this.columns1;
      //   for (var i = 0; i < arr.length; i++) {
      //     arr[i]['width'] = this.tbWidth;
      //   }
      //   arr[arr.length - 1]['fixed'] = 'right';
      //   this.columns1 = arr;
      // }
    },
    computed: {
      pageWin () {
        return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
      }
    },
    mounted () {
      this.pageStart=0;
      this.loanContent()
    },
    methods: {
      showMenu (val) {
        if (val != '全部' && val != '') {
          this.formSel.selectTp = ' : ' + val;
        } else {
          this.formSel.selectTp = '';
        }
      },
      orShow (visible) {
        this.vs = visible;
      },
      showMenu1 (val) {
        if (val != '全部' && val != '') {
          this.formSel.selectCm = ' : ' + val;
        } else {
          this.formSel.selectCm = '';
        }
      },
      orShow1 (visible) {
        this.vs1 = visible;
      },
      dateChange1 (date) {
        this.formSel.payTm = date;
      },
      exportData () {
        var that = this;
        // that.data1 = [];
        // var detail = {};
        // detail['loanInput'] = that.formSel.input;
        // detail['beginDate'] = that.formSel.payTm[0];
        // detail['endDate'] = that.formSel.payTm[1];
        // detail['selectCm'] = that.formSel.selectCm;

        window.open(this.$store.getters.httpUrl + '/export/chargeQueryDown?value=' + that.formSel.input);
        // this.axios.get('/export/chargeQueryDown?value=' + that.formSel.input,
        //   { headers: { 'Content-Type': 'application/vnd.ms-excel' } })
        //   .then(function (resp) {
        //     debugger;
        //     // if(resp.code)
        //   }).catch(function (error) {
        //     alert(error);
        //   });

      },
      changePage(page){
        this.pageChk=page;
        this.pageStart = (page-1) * this.pageSize;
        this.loanContent();
      },
      show (index) {
        let self = this
        self.formRefund.refundAmt = self.data1[index].chargeAmount
        self.formRefund.flowNo = self.data1[index].flowNo
        self.formRefund.acctId = self.data1[index].acctId

        self.refundModel = true
      },
      refundProcess (name) {
        let self = this

        this.$refs[name].validate((valid) => {
          if (valid) {
            let refundAmt = self.formRefund.refundAmt;
            let remark = self.formRefund.remark;
            let payChannel = self.formRefund.payChannel;
            let flowNo = self.formRefund.flowNo;
            let acctId = self.formRefund.acctId;

            let params = {
              refundAmt: refundAmt,
              remark: remark,
              refundChannel: payChannel,
              flowNo: flowNo,
              acctId: acctId
            }

            this.axios
              .post(
                '/refund/chargeRefund',
                params,
                {
                  headers: { 'Content-Type': 'application/json' }
                })
              .then(function (resp) {
                if (resp.data.resCode == 1) {
                  self.$Message.warning("退款成功");
                  self.refundModel = false;
                  self.pageStart=0;
                  self.pageChk=1;
                  self.loanContent();
                }
              })
              .catch(function (resp) {
                self.$Message.warning('系统异常');
              });
          } else {
            this.$Message.error(valid.message);
          }
        })

      },
      countOk () {

      },
      search(){
        this.pageStart=0;
        this.pageChk=1;
        this.loanContent();
      },
      loanContent () {
        let self = this;
        // if (this.formSel.input == '') {
        //   this.$Message.warning('输入不能为空');
        //   return false;
        // }

        /*var name = this.formSel.name
        var mobile = this.formSel.mobile
        var loanNo = this.formSel.loanNo*/
        self.data1=[];
        console.log('/detail/findCancelLoanDetail?value=' + this.formSel.input + '&startNum='+this.pageStart+'&pageRowSize='+this.pageSize+'&capProCode=""')
        this.axios
          .post(
            '/detail/findCancelLoanDetail',
            {
              value: this.formSel.input,
              startNum:this.pageStart,
              pageRowSize:this.pageSize,
              capProCode:""
            },
            {
              headers: { 'Content-Type': 'application/json' }
            })
          .then(function (respon) {
            if (respon.data.resCode == 1) {
              self.total = Math.ceil(respon.data.result.count / self.pageSize);
              self.totalRecords = respon.data.result.count;
              console.log(respon.data.result)
              respon.data.result.content.forEach(function (element) {
                element.chargeAmount = element.chargeAmount / 100;
                element.sex = element.gender == 0 ? '女' : '男';
                let d = new Date(element.crtTm)
                element.crtTm = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate());
                var t = new Date(element.payTime);
                element.payTime = (t.getFullYear()) + "-" + (t.getMonth() + 1) + "-" + (t.getDate());
                t = new Date(element.bmCrtTm);
                element.bmCrtTm = (t.getFullYear()) + "-" + (t.getMonth() + 1) + "-" + (t.getDate());
              }, this);

              self.data1 = respon.data.result.content;
            }

          })
          .catch(function (resp) {
            self.$Message.warning('系统异常');
          });
      },
      reset () {
        this.formSel = {
          input: '',
          name: '',
          loanNo: '',
          mobile: ''
        }
        this.pageStart=0;
        this.pageChk=1;
        this.loanContent();
      }
    }
  }
</script>
