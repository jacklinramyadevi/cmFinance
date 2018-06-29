<template>
  <div class="sections">
    <h1>用户账单</h1>
    <div class="pl_body" style="text-align: center;font-size: 24px;font-weight: bold;"  v-show="!showresult">找不到结果！！！！</div>
    <div class="pl_body"  v-show="showresult">
      <Row class="form_row">
        <Col :sm="24"
             :xs="24">
        <Form
              class="downMenu"
              onsubmit="return false;">
          <FormItem>
            <Row  class="userDetailRow">
              <Col span="6" class="userDetailOdd">
                  <div class="userDetailBillHeader">客户姓名</div>
              </Col>
              <Col span="6" class="userDetailEven">
                  <div class="" >{{resultVal.custName}}</div>
              </Col>
              <Col span="6" class="userDetailOdd">
                  <div class="userDetailBillHeader">身份证号</div>
              </Col>
              <Col span="6" class="userDetailEven">
                  <div class="">{{resultVal.idCardNo}}</div>
              </Col>
            </Row>
          </FormItem>
        </Form>
        </Col>

      </Row>
      <div class="table_show">
        <Table border
               :columns="columns1"
               :data="data1"
               ref="table"></Table>
      </div>
      <div style=" margin-top: 50px; border: 1px solid;" v-for="(loan,i) in loanDetails" :key="i"  >
        <Row class="form_row">
          <Col :sm="24"
               :xs="24">
          <Row type="flex" class="billdetailRow hideBottomBorder">
            <Col style="height: 30px"  span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">借款编号</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.loanNum}}</div>
            </Col>
            <Col span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">产品名称</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.product}}</div>
            </Col>
          </Row>
          </Col>

          <Col :sm="24"
               :xs="24">
          <Row type="flex" class="billdetailRow hideBottomBorder">
            <Col style="height: 30px"  span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">借款金额</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.loanAmount}}</div>
            </Col>
            <Col span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">总期数</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.periods}}</div>
            </Col>
          </Row>
          </Col>


          <Col :sm="24"
               :xs="24">
          <Row type="flex" class="billdetailRow hideBottomBorder">
            <Col style="height: 30px"  span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">放款金额</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.paidAmount}}</div>
            </Col>
            <Col span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">借款时间</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.loanTime}}</div>
            </Col>
          </Row>
          </Col>

          <Col :sm="24"
               :xs="24">
          <Row type="flex" class="billdetailRow ">
            <Col style="height: 30px"  span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">首付金额</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class=""  style="    margin-top: 5px;">{{loan.downAmount}}</div>
            </Col>
            <Col span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">放款时间</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;">{{loan.paidTime}}</div>
            </Col>
          </Row>
          </Col>

          <Col :sm="24"
               :xs="24">
          <Row type="flex" class="billdetailRow ">
            <Col style="height: 30px"  span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;">打款平台</div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class=""  style="    margin-top: 5px;">{{loan.platform}}</div>
            </Col>
            <Col span="6" class="userDetailOdd">
            <div class="userDetailBillHeader" style="    margin-top: 5px;"></div>
            </Col>
            <Col span="6" class="userDetailEven">
            <div class="" style="    margin-top: 5px;"></div>
            </Col>
          </Row>
          </Col>
        </Row>
        <div style="margin-top: 20px;font-weight: bold;">
          <p style="margin-left: 15px;">还款计划</p>
        </div>
        <div class="table_show">
          <Table border
                 :columns="columns2"
                 :data="loan.repayPlans"
                 ref="table2"></Table>
        </div>
      </div>





    </div>


  </div>
</template>
<style>
  .demo-grandtotal{
    font-weight: bold;
    text-align: center;
  }
</style>
<script>
  import cookie from '../router/cookie.js'
  export default {
    name: 'sections',
    data () {
      return {
        resultVal:{},
        showresult: false,
        loanDetails: [],
        columns1: [
          {
            title: '总计',
            key: 'grandtotal',
            className: 'demo-grandtotal'
          },
          {
            title: '本金',
            key: 'principal',
          },
          {
            title: '利息',
            key: 'interest',
          },
          {
            title: '服务费',
            key: 'serviceCharge',
          },
          {
            title: '罚息',
            key: 'fine',
          },
          {
            title: '违约金',
            key: 'penalty',
          },
          {
            title: '合计',
            key: 'total',
          }],
        data1: [],
        columns2: [
          {
            title: '期数',
            key: 'stage',
          },
          {
            title: '应还时间',
            key: 'planLtm',
          },
          {
            title: '实还金额',
            key: 'theoryTotal',
          },
          {
            title: '应还本金',
            key: 'theoryPrincipal',
          },
          {
            title: '应还利息',
            key: 'theoryInterest',
          },
          {
            title: '应还服务费',
            key: 'theoryServiceCharge',
          },
          {
            title: '应还罚息',
            key: 'theoryOverdueCharge',
          },
          {
            title: '应还违约金',
            key: 'theoryDefaultCharge',
          },
          {
            title: '实际还款时间',
            key: 'realTime',
          },
          /*{
            title: '实际还款总额',
            key: 'totalRepayments',
          },*/
          {
            title: '实还金额',
            key: 'receiveAmount',
          },
          {
            title: '实还本金',
            key: 'receivePrincipal',
          },
          {
            title: '实还利息',
            key: 'receiveInterest',
          },
          {
            title: '实还服务费',
            key: 'receiveServiceCharge',
          },
          {
            title: '实还罚息',
            key: 'receiveOverdueCharge',
          },
          {
            title: '实还违约金',
            key: 'receiveDefaultCharge',
          },
          {
            title: '还款渠道',
            key: 'channel',
          },
          {
            title: '还款平台',
            key: 'platform',
          },
          {
            title: '平台流水号',
            key: 'tradeNo',
          },
          {
            title: '状态',
            key: 'status',
          }
          ],
        data2: []
      }
    },
    created: function () {
      this.data1.push({
        grandtotal:'应收',
        principal:'',
        interest:'',
        serviceCharge:'',
        fine:'',
        penalty:'',
        total:'',
      });
      this.data1.push({
        grandtotal:'实收',
        principal:'',
        interest:'',
        serviceCharge:'',
        fine:'',
        penalty:'',
        total:'',
      });
      this.data1.push({
        grandtotal:'未还',
        principal:'',
        interest:'',
        serviceCharge:'',
        fine:'',
        penalty:'',
        total:'',
      });

  /*//this.data1.length = 3;*/
  this.loanContent();

   if ($(window).width() < 768) {
     var arr = this.columns1;
     for (var i = 0; i < arr.length; i++) {
       arr[i]['width'] = this.tbWidth;
     }
     arr[arr.length - 1]['fixed'] = 'right';
     this.columns1 = arr;
   }
},
computed: {
  pageWin () {
    return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
  }
},
mounted () {
  this.pageStart=0;

},
methods: {

  loanContent () {
    let self = this;
    var idCard = cookie.getCookie('idCard');
    self.resultVal = {};
    this.axios
      .post(
        //'http://192.168.100.43:19002/finance/detail/'+idCard,
        '/detail/'+idCard,
        {
          headers: { 'Content-Type': 'application/json' }
        })
      .then(function (respon) {
        //console.log('resultVal resultVal');
        //console.log(self.data1)
        if (respon.data.resCode.toString() == "1") {
          self.showresult = true;
          self.resultVal = respon.data.result;
          self.loanDetails = self.resultVal['loanDetails'];
          self.data1[0]['grandtotal'] = '应收'
          self.data1[0]['principal'] = self.resultVal['theoryPrincipal'];
          self.data1[0]['interest'] =  self.resultVal['theoryInterest'];
          self.data1[0]['serviceCharge'] = self.resultVal['theoryServiceCharge'];
          self.data1[0]['fine'] = self.resultVal['theoryOverdueCharge'];
          self.data1[0]['penalty'] = self.resultVal['theoryDefaultCharge'];
          self.data1[0]['total'] = self.resultVal['theoryTotal'];

          self.data1[1]['grandtotal'] = '应收'
          self.data1[1]['principal'] = self.resultVal['receivePrincipal'];
          self.data1[1]['interest'] =  self.resultVal['receiveInterest'];
          self.data1[1]['serviceCharge'] = self.resultVal['receiveServiceCharge'];
          self.data1[1]['fine'] = self.resultVal['receiveOverdueCharge'];
          self.data1[1]['penalty'] = self.resultVal['receiveDefaultCharge'];
          self.data1[1]['total'] = self.resultVal['receiveTotal'];

          self.data1[2]['grandtotal'] = '应收'
          self.data1[2]['principal'] = self.resultVal['balancePrincipal'];
          self.data1[2]['interest'] =  self.resultVal['balanceInterest'];
          self.data1[2]['serviceCharge'] = self.resultVal['balanceServiceCharge'];
          self.data1[2]['fine'] = self.resultVal['balanceOverdueCharge'];
          self.data1[2]['penalty'] = self.resultVal['balanceDefaultCharge'];
          self.data1[2]['total'] = self.resultVal['balanceTotal'];

        }else{
         // console.log("*******")
            self.showresult = false;
            self.$Message.warning(respon.data.msg);
        }

      })
      .catch(function (resp) {
        self.showresult = false;
        self.$Message.warning('系统异常');
      });
  }
}
}
</script>
