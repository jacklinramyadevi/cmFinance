<template>
  <div class="sections">
    <div class="pl_body">
      <Tabs :size="tabSize">
        <TabPane label="日汇总表"
          name="tab1">
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
                  placeholder="借款时间"
                  @on-change="dateChange"></DatePicker>
                <!-- <Button type="primary" @click="queryLoanStatDay">查询</Button> -->

                <Dropdown trigger="click"
                  class="showMn"
                  @on-click="showMenu"
                  @on-visible-change="orShow">
                  <Button type="ghost"
                    :class="{active:vs,chk:formSel.typeStr!=''}">
                    产品类型
                    <span v-text="formSel.typeStr"></span>
                    <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="全部">全部</DropdownItem>
                    <DropdownItem name="0:消费贷"
                      :selected="formSel.typePd==0">消费贷</DropdownItem>
                    <DropdownItem name="1:现金贷"
                      :selected="formSel.typePd==1">现金贷</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button v-if="formSel.typeStr!='' || formSel.selectTm.length>0"
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
          <!-- <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" show-elevator @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" simple @on-change="changePage"></Page> -->
        </TabPane>
        <TabPane label="月汇总表"
          name="tab2">
          <Row class="form_row">
            <Col :sm="22"
              :xs="24">
            <Form :model="formSel2"
              class="downMenu">
              <FormItem>
                <DatePicker type="month"
                  class="datesel"
                  :value="formSel2.selectTm"
                  format="yyyy-MM"
                  placement="bottom-start"
                  placeholder="借款日期"
                  @on-change="dateChange2"></DatePicker>
                <!-- <Button type="primary" @click="queryLoanStatMonth(1)">查询</Button> -->

                <Dropdown trigger="click"
                  class="showMn"
                  @on-click="showMenu4"
                  @on-visible-change="orShow4">
                  <Button type="ghost"
                    :class="{active:vs4,chk:formSel2.typeStr!=''}">
                    产品类型
                    <span v-text="formSel2.typeStr"></span>
                    <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="全部">全部</DropdownItem>
                    <DropdownItem name="0:消费贷"
                      :selected="formSel2.typePd==0">消费贷</DropdownItem>
                    <DropdownItem name="1:现金贷"
                      :selected="formSel2.typePd==1">现金贷</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button v-if="formSel2.typeStr!='' || formSel2.selectTm!=''"
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
              :columns="columns2"
              :data="data2"
              ref="table"></Table>
          </div>
          <Row :gutter="16"
            v-if="pageWin>=768">
            <Col :sm="5"
              :xs="24">
            <div class="total1">共{{total}}页</div>
            </Col>
            <Col :sm="19"
              :xs="24"
              class="txt_right">
            <Page :total="totalRecords1" :current="pageChk"
              show-elevator
              @on-change="changePage"></Page>
            </Col>
          </Row>
          <Page v-else
            :total="totalRecords1" :current="pageChk1"
            simple
            @on-change="changePage"></Page>
        </TabPane>
      </Tabs>
    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'sections',
  data () {
    return {
      vs: false,
      vs2: false,
      vs3: false,
      vs4: false,
      tabSize: 'default',
      tbWidth: 100,
      total: 0,
      totalRecords: 0,
      pageChk:1,
      total1: 0,
      totalRecords1: 0,
      pageChk1:1,
      pageSize: 10,
      formSel: {
        selectTm: [],
        typePd: -1,
        typeStr: ''
      },
      formSel2: {
        selectTm: '',
        typePd: -1,
        typeStr: ''
      },
      columns1: [
        {
          title: '日期',
          key: 'statTm',
          fixed: 'left',
          width: 160
        },
        {
          title: '业务类型',
          key: 'type',
          width: 100
        },
        {
          title: '借款笔数',
          key: 'loanCount',
          width: 100
        },
        {
          title: '借款金额',
          key: 'loanAmt',
          width: 140
        },
        {
          title: '放款金额',
          key: 'payAmt',
          width: 100
        },
        {
          title: '已结算金额',
          key: 'settledAmt',
          width: 140
        },
        {
          title: '贴息（服务费）',
          key: 'discountSfe',
          width: 130
        },
        {
          title: '贴息（利息）',
          key: 'discountInt',
          width: 120
        },
        {
          title: '贴息合计',
          key: 'discount',
          width: 100
        },
        {
          title: '中科诺放款资金',
          key: 'zknAmt',
          width: 130
        },
        {
          title: '华金放款资金',
          key: 'hjAmt',
          width: 130
        },
        {
          title: '日借款合计',
          key: 'loanAmt',
          width: 100,
          fixed: 'right'
        }],
      data1: [],
      columns2: [
        {
          title: '日期',
          key: 'statTm',
          fixed: 'left',
          width: 160
        },
        {
          title: '业务类型',
          key: 'type',
          width: 100
        },
        {
          title: '借款笔数',
          key: 'loanCount',
          width: 100
        },
        {
          title: '借款金额',
          key: 'loanAmt',
          width: 100
        },
        {
          title: '放款金额',
          key: 'payAmt',
          width: 140
        },
        {
          title: '已结算金额',
          key: 'settledAmt',
          width: 140
        },
        {
          title: '贴息（服务费）',
          key: 'discountSfe',
          width: 130
        },
        {
          title: '贴息（利息）',
          key: 'discountInt',
          width: 120
        },
        {
          title: '贴息合计',
          key: 'discount',
          width: 100
        },
        {
          title: '中科诺放款资金',
          key: 'zknAmt',
          width: 130
        },
        {
          title: '华金放款资金',
          key: 'hjAmt',
          width: 130
        },
        {
          title: '月借款合计',
          key: 'loanAmt',
          width: 100,
          fixed: 'right'
        }],
      data2: []
    }
  },
  created: function () {
    if ($(window).width() < 768) {
      this.tabSize = 'small';
    }

    if ($(window).width() < 1400) {
      var arr = this.columns1;
      // for (var i = 0; i < arr.length; i++) {
      //   if (arr[i].width == undefined) {
      //     arr[i]['width'] = this.tbWidth;
      //   }
      // }
      this.columns1 = arr;

      var arr2 = this.columns2;
      // for (var i = 0; i < arr2.length; i++) {
      //   if (arr2[i].width == undefined) {
      //     arr2[i]['width'] = this.tbWidth;
      //   }
      // }
      this.columns2 = arr2;
    }
  },
  computed: {
    pageWin () {
      return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
    }
  },
  methods: {
    showMenu (val) {
      if (val != '全部' && val != '') {
        this.formSel.typeStr = '：' + val.split(":")[1];
        this.formSel.typePd = val.split(":")[0];
      } else {
        this.formSel.typeStr = '';
        this.formSel.typePd = -1;
      }
      this.queryLoanStatDay();
    },
    orShow (visible) {
      this.vs = visible;
    },
    showMenu4 (val) {
      if (val != '全部' && val != '') {
        this.formSel2.typeStr = '：' + val.split(":")[1];
        this.formSel2.typePd = val.split(":")[0];
      } else {
        this.formSel2.typeStr = '';
        this.formSel2.typePd = -1;
      }
      this.queryLoanStatMonth(1);
    },
    orShow4 (visible) {
      this.vs4 = visible;
    },
    dateChange (date) {
      this.formSel.selectTm = date;
      if (date.length > 0)
        this.queryLoanStatDay();
    },
    dateChange2 (date) {
      this.formSel2.selectTm = date;
      if (date != '')
        this.queryLoanStatMonth(1);
    },
    queryLoanStatMonth (page) {
      this.pageChk=page;
      var self = this
      var statDay = []
      if (this.formSel2.selectTm) {
        statDay[0] = this.formSel2.selectTm
      }
      var loanType = this.formSel2.typePd

      var param = {
        firstResult: page,
        pageSize: this.pageSize,
        statTm: statDay,
        loanType: loanType
      }

      axios
        .post('/stat/selectLoanStatByMonth', param,
        {          headers: { 'Content-Type': 'application/json' }
        })
        .then(function (respon) {
          if (respon.data.resCode == 1) {
            self.total1 = Math.ceil(respon.data.count / self.pageSize);
            self.totalRecords1 = respon.data.count;
            respon.data.result.forEach(function (element) {
              if (element.discount == null || element.discount == '') {
                element.discount = 0
              }

              if (element.type == 0) {
                element.type = '消费贷'
              } else if (element.type == 1) {
                element.type = '现金贷'
              }

              element.loanAmt = element.loanAmt / 100;
              element.payAmt = element.payAmt / 100;
              element.zknAmt = element.zknAmt / 100;
              element.hjAmt = element.hjAmt / 100;
              element.settledAmt = element.settledAmt / 100;
              element.discountSfe = element.discountSfe / 100;
              element.discountInt = element.discountInt / 100;
              element.discount = element.discount / 100;
            }, this);
            self.data2 = respon.data.result;
          } else {
            self.$Message.warning(respon.data.msg);
          }
        })
        .catch(function (resp) {
          self.$Message.warning('系统异常');
        });
    },
    queryLoanStatDay () {
      var self = this
      var statDay = []
      if (this.formSel.selectTm) {
        statDay = this.formSel.selectTm
      }
      var loanType = this.formSel.typePd

      var param = {
        statTm: statDay,
        loanType: loanType
      }

      axios
        .post('/stat/selectLoanStatByDay', param,
        {          headers: { 'Content-Type': 'application/json' }
        })
        .then(function (respon) {
          if (respon.data.resCode == 1) {
            respon.data.result.forEach(function (element) {
              if (element.discount == null || element.discount == '') {
                element.discount = 0
              }

              if (element.type == 0) {
                element.type = '消费贷'
              } else if (element.type == 1) {
                element.type = '现金贷'
              }

              element.loanAmt = element.loanAmt / 100;
              element.payAmt = element.payAmt / 100;
              element.zknAmt = element.zknAmt / 100;
              element.hjAmt = element.hjAmt / 100;
              element.settledAmt = element.settledAmt / 100;
              element.discountSfe = element.discountSfe / 100;
              element.discountInt = element.discountInt / 100;
              element.discount = element.discount / 100;
            }, this);
            self.data1 = respon.data.result

            self.total = Math.ceil((respon.data.count / self.pageSize));
            self.totalRecords = respon.data.count;
          } else {
            self.$Message.warning(respon.data.msg)
          }
        })
        .catch(function (resp) {
          self.$Message.warning('系统异常');
        });
    },
    exportData (type) {
      /*if (type === 1) {
          this.$refs.table.exportCsv({
              filename: '原始数据'
          });
      } else if (type === 2) {
          this.$refs.table.exportCsv({
              filename: '排序和过滤后的数据',
              original: false
          });
      } else if (type === 3) {
          this.$refs.table.exportCsv({
              filename: '自定义数据',
              columns: this.columns8.filter((col, index) => index < 4),
              data: this.data7.filter((data, index) => index < 4)
          });
      }*/
    },
    changePage (page) {
      var num = (page - 1) * this.pageSize;
      this.queryLoanStatMonth(num);
    },
    reset () {
      this.formSel.selectTm = [];
      this.formSel.typePd = -1;
      this.formSel.typeStr = '';
      this.formSel2.selectTm = '';
      this.formSel2.typePd = -1;
      this.formSel2.typeStr = '';
      this.data1 = [];
      this.data2 = [];
    }
  }
}
</script>
