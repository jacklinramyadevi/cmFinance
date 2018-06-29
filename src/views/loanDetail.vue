<template>
    <div class="sections">
        <h1>贷款结算查询</h1>
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
                            placeholder="借款编号/手机号/收款户名"
                            @on-enter="loadContent(1)"></Input>
                        <Button type="primary"
                            @click="loadContent(1)">查询</Button>
                        <DatePicker :value="formSel.selectTm"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placement="bottom-start"
                            placeholder="借款时间"
                            @on-change="dateChange"></DatePicker>
                        <DatePicker :value="formSel.payTm"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placement="bottom-start"
                            placeholder="结算时间"
                            @on-change="dateChange1"></DatePicker>
                        <Dropdown trigger="click"
                            class="showMn"
                            @on-click="showMenu"
                            @on-visible-change="orShow">
                            <Button type="ghost"
                                :class="{active:vs,chk:formSel.selectTp!=''}">
                                结算状态
                                <span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部"
                                    :selected="formSel.selectTp==''">全部</DropdownItem>
                                <DropdownItem name="0:等待放款"
                                    :selected="formSel.selectTpValue=='0'">等待放款</DropdownItem>
                                <DropdownItem name="1:放款成功"
                                    :selected="formSel.selectTpValue=='1'">放款成功</DropdownItem>
								<DropdownItem name="2:放款失败"
                                    :selected="formSel.selectTpValue=='2'">放款失败</DropdownItem>
								<DropdownItem name="3:合同取消"
                                    :selected="formSel.selectTpValue=='3'">合同取消</DropdownItem>
								<DropdownItem name="4:合同结清"
                                    :selected="formSel.selectTpValue=='4'">合同结清</DropdownItem>
								<DropdownItem name="5:放款处理中"
                                    :selected="formSel.selectTpValue=='5'">放款处理中</DropdownItem>
								<DropdownItem name="6:发标中"
                                    :selected="formSel.selectTpValue=='6'">发标中</DropdownItem>
                                <DropdownItem name="7:发标成功"
                                    :selected="formSel.selectTpValue=='7'">发标成功</DropdownItem>
								<DropdownItem name="8:发标失败"
                                    :selected="formSel.selectTpValue=='8'">发标失败</DropdownItem>
								<DropdownItem name="9:满标"
                                    :selected="formSel.selectTpValue=='9'">满标</DropdownItem>
								<DropdownItem name="10:未放款撤单"
                                    :selected="formSel.selectTpValue=='10'">未放款撤单</DropdownItem>
								<DropdownItem name="11:测试订单"
                                    :selected="formSel.selectTpValue=='11'">测试订单</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown trigger="click"
                            class="showMn"
                            @on-click="showMenu1"
                            @on-visible-change="orShow1">
                            <Button type="ghost"
                                :class="{active:vs1,chk:formSel.selectCm!=''}">
                                资金提供方
                                <span v-text="formSel.selectCm">{{formSel.selectCm}}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部"
                                    :selected="formSel.selectCm==''">全部</DropdownItem>
                                <DropdownItem v-for="(s,index) in moneyApply"
                                    :name="index"
                                    :key="index"
                                    :selected="formSel.selectCmValue==s.code">{{s.value}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!='' || formSel.selectTm.length>0 || formSel.payTm.length>0 || formSel.selectTp!='' || formSel.selectCm!=''"
                            @click="reset">重置</Button>

                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2"
                    :xs="24">
                <div class="float_right">
                    <Button type="success"
                        @click="exportData">
                        <Icon type="ios-download-outline"></Icon>导出EXCEL
                    </Button>
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
        <Modal v-model="model1"
            class="historyDesc noFooter"
            title="备注"
            width="900">
            <dl class="history_list">
                <dd>历史备注</dd>

                <dt v-for="item in remarks"
                    :key="item.id">
                    <p>{{item.remark}}</p>
                    <span>{{item.createTime}}</span>
                </dt>
            </dl>
            <Form ref="descForm"
                :model="descForm"
                :rules="descRules">
                <FormItem v-model="descForm"
                    prop="desc">
                    <Input v-model="descForm.desc"
                        type="textarea"
                        :autosize="{minRows: 5,maxRows:8}"
                        placeholder="输入备注内容"
                        @on-keyup="countDesc('descForm')"></Input>
                    <div class="submitDesc">
                        <span v-text="descForm.descCount"></span>
                        <Button type="primary"
                            @click="addRemark()">提交</Button>
                    </div>
                    <div style="clear:both;"></div>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'sections',
    data () {
        return {
            model1: false,
            tbWidth: 100,
            total: 0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            vs: false,
            vs1: false,
            formSel: {
                input: '',
                selectTp: '',
                selectTpValue: '',
                selectCm: '',
                selectCmValue: '',
                selectTm: [],
                payTm: [],
                loanTimeStart: '',
                loanTimeEnd: '',
                payTimeStart: '',
                payTimeEnd: ''
            },
            // moneyApply: [{
            //     code: '110205',
            //     value: '中科诺'
            // }, {
            //     code: '110408',
            //     value: '华金'
            // }],
            remarks: [],
            loanNo: '',
            loanId: 0,
            descForm: {
                txtFr: '',
                descCount: '',
                descNm: 0
            },
            descRules: {
                descLength: 200,
                desc: [
                    { require: true, type: 'string', max: this.descLength, message: '备注最多为200字', trigger: 'blur' }
                ]
            },
            columns1: [
                {
                    title: '借款编号',
                    width: 155,
                    key: 'loanNo',
                    fixed: 'left'
                },
                {
                    title: '客户姓名',
                    width: 100,
                    key: 'custName',
                    fixed: 'left'
                },
                {
                    title: '手机号',
                    width: 120,
                    key: 'custMobile',
                    fixed: 'left'
                },
                {
                    title: '产品类型',
                    width: 90,
                    key: 'loanType'
                },
                {
                    title: '产品名称',
                    width: 150,
                    key: 'product'
                },
                {
                    title: '收款户名',
                    width: 100,
                    key: 'userName'
                },
                {
                    title: '收款账号',
                    width: 200,
                    key: 'cardNo'
                },
                {
                    title: '收款银行',
                    width: 200,
                    key: 'bankName'
                },
                {
                    title: '账户类型',
                    width: 100,
                    key: 'personal'
                },
                {
                    title: '借款时间',
                    key: 'loanTime',
                    width: 160
                },
                /*{
                    title: '贴息金额',
                    width:100,
                    key: 'discountAmount'
                },*/
                {
                    title: '结算金额',
                    width: 100,
                    key: 'payAmount'
                },
                {
                    title: '结算状态',
                    width: 100,
                    key: 'status'
                },
                {
                    title: '结算平台',
                    width: 150,
                    key: 'payPlat'
                },
                {
                    title: '结算流水号',
                    width: 210,
                    key: 'tradeNo'
                },
                {
                    title: '结算时间',
                    key: 'payTime',
                    width: 160
                },
                {
                    title: '资金提供方',
                    width: 100,
                    key: 'payPlat'
                },
                {
                    title: '备注',
                    key: 'action',
                    fixed: 'right',
                    width: 100,
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
                                        this.show(params.row);
                                    }
                                }
                            }, '备注')
                        ]);
                    }
                }],
            data1: [],
            moneyApply: [
				{
					code: 'HJZR',
					value: '华金'
				},
				{
					code: 'ZKN',
					value: '中科诺'
				}
			]
        }
    },
    created: function () {
        this.loadContent(1);
    },
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        }
    },
    methods: {
        showMenu (val) {
            if (val != '全部' && val != '') {
                this.formSel.selectTp = '：' + val.split(":")[1];
                this.formSel.selectTpValue = val.split(":")[0];
            } else {
                this.formSel.selectTp = '';
                this.formSel.selectTpValue = '';
            }
            this.loadContent(1);
        },
        orShow (visible) {
            this.vs = visible;
        },
        showMenu1 (i) {
            if (i != '全部' && i >= 0) {
                this.formSel.selectCm = '：' + this.moneyApply[i].value;
                this.formSel.selectCmValue = this.moneyApply[i].code;
            } else {
                this.formSel.selectCm = '';
                this.formSel.selectCmValue = '';
            }
            this.loadContent(1);
        },
        orShow1 (visible) {
            this.vs1 = visible;
        },
        dateChange (date) {
            this.formSel.selectTm = date;
            this.formSel.loanTimeStart = date[0];
            this.formSel.loanTimeEnd = date[1] == undefined ? '' : date[1];
            this.loadContent(1);
        },
        dateChange1 (date) {
            this.formSel.payTm = date;
            this.formSel.payTimeStart = date[0];
            this.formSel.payTimeEnd = date[1] == undefined ? '' : date[1];
            this.loadContent(1);
        },
        exportData () {
            var that = this;

            window.open(this.$store.getters.httpUrl + "/export/loanDetailDown?value=" + that.formSel.input + "&loanTimeStart=" +
                that.formSel.loanTimeStart + "&loanTimeEnd=" + that.formSel.loanTimeEnd +
                "&payTimeStart=" + that.formSel.payTimeStart + "&payTimeEnd=" + that.formSel.payTimeEnd +
                "&status=" + that.formSel.selectTpValue +
                "&payPlat=" + that.formSel.selectCmValue);
        },
        changePage (page) {
            /*this.data1=this.*/
            this.loadContent(page);
        },
        show (row) {
            this.descForm.desc = '';
            this.model1 = true;
            this.descForm.descCount = this.descForm.descNm + '/' + this.descRules.descLength;
            this.selectRemark(row.loanNo);
            this.loanNo = row.loanNo;
            this.loanId = row.loanId;
        },
        chkDate () {

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
            var that = this;
            this.data1 = [];
            this.pageChk=page;
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            var maxResults = this.pageSize;

            /*
             value:that.formSel.input,
             loanTimeStart:that.formSel.selectTm[0],
             loanTimeEnd:that.formSel.selectTm[1],
             payTimeStart:that.formSel.payTm[0],
             payTimeEnd:that.formSel.payTm[1],
             status:that.formSel.selectTpValue,
             payPlat:that.formSel.selectCmValue,
             firstResult :firstResult,
             maxResults :maxResults
             */

            let formData = new FormData();
            formData.append('value', that.formSel.input);
            formData.append('loanTimeStart', that.formSel.selectTm[0] ? that.formSel.selectTm[0] : '');
            formData.append('loanTimeEnd', that.formSel.selectTm[1] ? that.formSel.selectTm[1] : '');
            formData.append('payTimeStart', that.formSel.payTm[0] ? that.formSel.payTm[0] : '');
            formData.append('payTimeEnd', that.formSel.payTm[1] ? that.formSel.payTm[1] : '');
            formData.append('status', that.formSel.selectTpValue ? that.formSel.selectTpValue : '');
            formData.append('payPlat', that.formSel.selectCmValue ? that.formSel.selectCmValue : '');
            formData.append('firstResult', firstResult);
            formData.append('maxResults', maxResults);

            this.axios
                .post('/detail/selectLoanDetail',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (respon) {
                    if (respon.data.resCode == 1) {
                        that.total = Math.ceil((respon.data.count / that.pageSize));
                        that.totalRecords = respon.data.count;
                        respon.data.result.forEach(function (element) {
                            if (element.payPlat == '110205') {
                                element.payPlat = '中科诺'
                            } else if (element.payPlat == '110408') {
                                element.payPlat = '华金'
                            } else {
                                element.payPlat = ''
                            }

                            if (element.loanType == 0) {
                                element.loanType = "消费贷";
                            } else if (element.loanType == 1) {
                                element.loanType = "现金贷";
                            }
                            if (element.personal == 0) {
                                element.personal = "个人";
                            } else if (element.personal == 1) {
                                element.personal = "对公";
                            }
                            //0-等待放款，1-放款成功，2-放款失败，3-合同取消，4-合同结清 5-放款处理中
                            if (element.status == 0) {
                                element.status = "等待放款";
                            } else if (element.status == 1) {
                                element.status = "放款成功";
                            } else if (element.status == 2) {
                                element.status = "放款失败";
                            } else if (element.status == 3) {
                                element.status = "合同取消";
                            } else if (element.status == 4) {
                                element.status = "合同结清";
                            } else if (element.status == 5) {
                                element.status = "放款处理中";
                            } else if (element.status == 6) {
                                element.status = "发标中";
                            } else if (element.status == 7) {
                                element.status = "发标成功";
                            } else if (element.status == 8) {
                                element.status = "发标失败";
                            } else if (element.status == 9) {
                                element.status = "满标";
                            } else if (element.status == 10) {
                                element.status = "未放款撤单";
                            } else if (element.status == 11) {
                                element.status = "测试订单";
                            }
                        }, this);
                        that.data1 = respon.data.result;
                    } else {
                        alert(respon.data.msg);
                    }
                })
                .catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        selectRemark (loanNo) {

            var that = this;

            let formData = new FormData();
            formData.append('loanNo', loanNo)

            this.axios
                .post('/detail/selectRemark',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (respon) {
                    if (respon.data.resCode == 1) {
                        that.remarks = respon.data.result;
                    } else {
                        alert(respon.data.msg);
                    }
                }).catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        addRemark () {
            var that = this;

            let formData = new FormData();
            formData.append('loanNo', that.loanNo)
            formData.append('loanId', that.loanId)
            formData.append('remark', that.descForm.desc)

            that.axios
                .post('/detail/addRemark',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (respon) {
                    if (respon.data.resCode == 1) {
                        that.$Message.success('提交成功！');
                        that.model1 = false;
                    } else {
                        that.$Message.warning(respon.data.msg);
                    }
                }).catch(function (resp) {
                    that.$Message.warning('系统异常');
                });
        },
        reset () {
            //this.$refs[name].resetFields();
            this.formSel = {
                input: '',
                selectTp: '',
                selectTpValue: '',
                selectCm: '',
                selectCmValue: '',
                selectTm: [],
                payTm: [],
                loanTimeStart: '',
                loanTimeEnd: '',
                payTimeStart: '',
                payTimeEnd: ''
            }

            this.loadContent(1);
        }
    }
}
</script>

