
<template>
  <div class="sections">
    <h1>华金还款明细</h1>
    <div class="pl_body">
      <Row class="form_row">
        <Col :sm="24"
          :xs="24">
        <Form :model="formSel"
          class="downMenu">
          <FormItem>
            <Row>
              <Col span="12">
              <DatePicker :value="formSel.selectTm"
                format="yyyy-MM-dd"
                placeholder="还款时间"
                @on-change="dateChange"></DatePicker>
              &nbsp;&nbsp;
              <span>已还华金总金额：¥
                <span v-text="countMn"></span>
              </span>&nbsp;&nbsp;
              <Button v-if="formSel.selectTm!=''"
                @click="reset">重置</Button>
              </Col>
              <Col span="12">
              <Button type="primary"
                class="float_right"
                @click="exportData">导出EXCEL</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        </Col>
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
      pageSize: 10,
      pageChk:1,
      formSel: {
        selectTm: ''
      },
      selectTm: '',
      countMn: '0',
      columns1: [
        {
          title: '借款编号',
          key: 'loanNo',
          width: 200,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'hjUname',
          //  key: 'custName',
          fixed: 'left',
          width: 100,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'custMobile',
          fixed: 'left',
          width: 120,
          align: 'center'
        },
        {
          title: '身份证号',
          key: 'idcard',
          width: 180,
          align: 'center'
        },
        {
          title: '华金产品ID',
          key: 'pdid',
          width: 100,
          align: 'center'
        },
        {
          title: '放款总金额',
          key: 'amount',
          width: 100,
          align: 'center'
        },
        {
          title: '当前期数',
          key: 'stage',
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
          title: '应还利息',
          key: 'planInt',
          width: 100,
          align: 'center'
        },
        {
          title: '应还总金额',
          key: 'planTotalAmt',
          width: 100,
          align: 'center'
        },
        {
          title: '还款流水号',
          key: 'flowNo',
          width: 270,
          align: 'center'
        },
        {
          title: '应还时间',
          key: 'planLtm',
          width: 165,
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'crtTm',
          width: 165,
          align: 'center'
        },
        {
          title: '还款时间',
          key: 'cpsTime',
          width: 165,
          align: 'center'
        },
        {
          title: '操作人',
          key: 'operator',
          width:100,
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'status',
          fixed: 'right',
          width: 90,
          align: 'center'
        }],
      data1: []
    }
  },
  created: function () {
    var arr = this.columns1;
    // for (var i = 0; i < arr.length - 1; i++) {
    //   if (arr[i].width == undefined) {
    //     arr[i]['width'] = this.tbWidth;
    //   }
    // }
    this.columns1 = arr;
  },
  computed: {
    pageWin () {
      return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
    }
  },
  mounted () {
    this.loadContent(1)
  },
  methods: {
    dateChange (date) {
      this.formSel.selectTm = date;
      this.loadContent(1);
    },
    dateChange1 (date) {
      this.selectTm = date;
    },
    changePage (page) {
      /*this.data1=this.*/
      this.loadContent(page)
    },
    chkDate () {

    },
    exportData () {
      window.open(this.$store.getters.httpUrl + '/export/queryHjRepayPlansDown?queryTime=' + this.formSel.selectTm);
    },
    handleSubmit (name) {
      /*this.$refs[name].validate((valid) => {
          if(valid){

          }else{
              this.$Message.error('表单验证失败!');
          }
      })*/
    },
    countDesc (name) {
      var desc = this.descForm.desc;
      this.descForm.descNm = desc.length;
      this.descForm.descCount = this.descForm.descNm + '/' + this.descRules.descLength;
      this.$refs[name].validate((valid) => {
        if (valid) {

        } else {
          this.$Message.error('表单验证失败!');
        }
      });

    },
    loadContent (page) {
      var firstResult = (parseInt(page) - 1) * 10;
      var pageSize = 10;
      this.pageChk=page;
      this.countMn = '0';
      var that = this;

      let formData = new FormData();
      formData.append('queryTime', that.formSel.selectTm ? that.formSel.selectTm : '');
      // formData.append('cpsSt', 2);
      formData.append('pageStart', firstResult);
      formData.append('pageSize', pageSize);

      this.axios
        .post('/hj/queryHjRepayDetail', formData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (respon) {

          if (respon.data.resCode == 1) {
            that.total = Math.ceil((respon.data.count.count / that.pageSize));
            that.totalRecords = respon.data.count.count;
            if (respon.data.result.length > 0) {
              that.countMn = respon.data.count.repTotalAmt;
              respon.data.result.forEach(function (element) {
                if (element.status == 0) {
                  element.status = '待偿还'
                } else if (element.status == 1) {
                  element.status = '处理中'
                } else if (element.status == 2) {
                  element.status = '偿还成功'
                }
              }, this);
              that.data1 = respon.data.result;
            }
          }
        })
        .catch(function (resp) {
          this.$Message.warning('系统异常');
        });
    },
    reset () {
      this.formSel.selectTm = '';
      this.countMn = '0';
      this.loadContent(1);
    }
  }
}
</script>

