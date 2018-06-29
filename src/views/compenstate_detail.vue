<template>
  <div class="sections">
    <h1>代偿记录</h1>
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
              placeholder="借款编号/客户姓名/手机号"
              @on-enter="loadContent"></Input>
            <Button type="primary"
              @click="loadContent">查询</Button>
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
                  @on-click="showMenu6"
                  @on-visible-change="orShow6">
                  <Button type="ghost"
                    :class="{active:vs3,chk:formSel.moneyGv!=''}">
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
        :total="totalRecords"
        simple :current="pageChk"
        @on-change="changePage"></Page>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
      tbWidth: 100,
      total: 0,
      totalRecords: 0,
      pageStart: 0,
      pageSize: 10,
      pageChk:1,
      vs2:false,
      vs3:false,
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
      columns1: [
        {
          title: '借款编号',
          key: 'loanNo',
          width: 120,
          fixed: 'left',
          align: 'center'
        }, {
          title: '客户姓名',
          key: 'custName',
          width: 90,
          fixed: 'left',
          align: 'center'
        }, {
          title: '手机号',
          key: 'custMobile',
          width: 120,
          fixed: 'left',
          align: 'center'
        }, {
          title: '身份证号',
          key: 'idCard',
          width: 180,
          align: 'center'
        }, {
          title: '产品类型',
          key: 'bsType',
          width: 100,
          align: 'center'
        }, {
          title: '产品名称',
          key: 'product',
          width: 100,
          align: 'center'
        },
        {
          title: '借款金额',
          key: 'loanAmount',
          width: 100,
          align: 'center'
        },
        // {
        //   title: '首付金额',
        //   key: 'downpayAmount'
        // },
        {
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
        },
          {
          title: '当前期数',
          key: 'planStage',
          width: 100,
          align: 'center'
        },
        {
          title: '总期数',
          key: 'totalStage',
          width: 100,
          align: 'center'
        },
        {
          title: '应还本金',
          key: 'planPrp',
          width: 100,
          align: 'center'
        },
        {
          title: '应还服务费',
          key: 'planSfe',
          width: 100,
          align: 'center'
        },
        {
          title: '应还利息',
          key: 'planInt',
          width: 100,
          align: 'center'
        },
        {
          title: '应还罚息',
          key: 'planPin',
          width: 100,
          align: 'center'
        },
        {
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
        },{
          title: '还款流水号',
          key: 'flowNo',
          width: 180,
          align: 'center'
        },
        {
          title: '应还时间',
          key: 'planLtm',
          width: 165,
          align: 'center'
        },
        {
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
          width: 100,
          align: 'center'
        }, {
          title: '还款时间',
          key: 'cpsTime',
          width: 120,
          align: 'center'
        }, {
          title: '操作人',
          key: 'operator',
          width: 100,
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'cpsSt',
          width: 100,
          align: 'center'
        }],
      data1: [],
      moneyApply:[]
    }
  },
  created: function () {
    // var arr = this.columns1;
    // for (var i = 0; i < arr.length; i++) {
    //   if (arr[i].width == undefined) {
    //     arr[i]['width'] = this.tbWidth;
    //   }
    // }
    // this.columns1 = arr;
    this.pageChk=1;
    this.loadContent();
    // 获取资金方
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
  mounted () {
  },
  methods: {
    exportData () {
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
      window.open(this.$store.getters.httpUrl + '/export/compensatoryInfosDown?loanInput=' + this.formSel.input);
    },
    loadContent () {
      var firstResult = this.pageStart;
      var pageSize = this.pageSize;
      var that = this;

      this.axios.post('/compensatory/queryAllCompensatoryInfos', {
        cpsSt: 2,//待代偿
        loanInput: this.formSel.input,
        pageStart: firstResult,
        pageSize: pageSize,
        loanStartTime: that.formSel.selectTm ? that.formSel.selectTm[0] : '',
        loanEndTime: that.formSel.selectTm ? that.formSel.selectTm[1] : '',
        payPlat: that.formSel.moneyGv,
        bsType: that.formSel.typeBs,
        repStartTime: that.formSel.repayTm ? that.formSel.repayTm[0] : '',
        repEndTime: that.formSel.repayTm ? that.formSel.repayTm[1] : '',
      },
        {          headers: { 'Content-Type': 'application/json' }
        }).then(function (respon) {
          that.total = Math.ceil((respon.data.count / that.pageSize));
          that.totalRecords = respon.data.count;

          if (respon.data.resCode == 1) {
            respon.data.result.forEach(function (element) {
              if (element.cpsSt == 0) {
                element.cpsSt = '未到代偿日'
              } else if (element.cpsSt == 1) {
                element.cpsSt = '待代偿'
              } else if (element.cpsSt == 2) {
                element.cpsSt = '代偿成功'
              }
            }, this);
            that.data1 = respon.data.result;
          }
        }).catch(function (resp) {
          that.$Message.warning('系统异常');
        });
    },
    changePage (pageNum) {
      this.pageChk=pageNum;
      this.pageStart = (pageNum - 1) * this.pageSize;
      this.loadContent();
    },
    reset () {
      this.formSel.input = '';
      this.formSel.selectTm=''; 
      this.formSel.repayTm='';
      this.formSel.typeBs='';
      this.formSel.moneyGvDes='';
      this.formSel.moneyGv='';
      this.pageChk=1;
      this.loadContent();
    },
    dateChange (date) {
      this.formSel.selectTm = date;
      this.pageChk=1;
      this.loadContent();
    },
    dateChange1 (date) {
      this.formSel.repayTm = date;
      this.pageChk=1;
      this.loadContent();
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
    showMenu6 (val) {
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
    orShow6 (visible) {
      this.vs3 = visible;
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
  }
}
</script>
