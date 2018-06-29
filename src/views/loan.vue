<template>
    <div class="sections">
        <h1>贷款结算</h1>
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
                                <DropdownItem name="全部"
                                    :selected="formSel.selectTp==''">全部</DropdownItem>
                                <DropdownItem name="0:消费贷"
                                    :selected="formSel.selectTpValue=='0'">消费贷</DropdownItem>
                                <DropdownItem name="1:现金贷"
                                    :selected="formSel.selectTpValue=='1'">现金贷</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!='' || formSel.selectTp!='' || formSel.selectTm!=''"
                            @click="reset">重置</Button>
                    </FormItem>
                </Form>
                </Col>
                <Col :sm="2"
                    :xs="24">
                <!-- <div class="float_right">
                <Button type="success" @click="exportData">批量放款</Button>
            </div> -->
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
            :model="detail"
            title="请选择查询条件"
            width="600"
            @on-ok="handleSubmit('dataRdo')">
            <Form :model="dataRdo"
                class="dataRdo">
                <FormItem>
                    <label class="lbl">结算账户</label><br/>
                    <RadioGroup v-model="dataRdo.bankType">
                        <Radio label="person">个人账户
                            <span v-text="dataRdo.bankNm">{6228 5666 5555 6666}（中国农业银行南昌昌北支行营业部）</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <label class="lbl">支付方式</label><br/>
                    <RadioGroup v-model="dataRdo.pay">
                        <Radio label="0">宝付</Radio>

                    </RadioGroup>
                </FormItem>
                <FormItem prop="money">
                    <label class="lbl">结算金额</label><br/>
                    <Icon type="social-yen"></Icon>
                    <Input type="text"
                        disabled
                        v-model="dataRdo.money"
                        placeholder="0.00"
                        class="moneyIpt"
                        number></Input>
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
            model1: false,
            tbWidth: 100,
            total: 0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            vs: false,
            formSel: {
                selectBs: '选择查询类型',
                input: '',
                selectTp: '',
                selectTpValue: '',
                selectTm: '',
            },
            orderShow: [],
            detail: '',
            dataRdo: {
                bankType: '',
                bankNm: '',
                pay: '',
                money: '',
                loanNo: ''
            },
            columns1: [
        /*{
            type:'selection',
            width:60,
            align:'center'
        },*/{
                    title: '借款编号',
                    width: 155,
                    key: 'loanNo',
                    // fixed: 'left'
                },
                {
                    title: '客户姓名',
                    width: 100,
                    key: 'custName',
                    // fixed: 'left'
                },
                {
                    title: '手机号码',
                    width: 140,
                    key: 'custMobile',
                    // fixed: 'left'
                },
                {
                    title: '产品类型',
                    width: 120,
                    key: 'loanType'
                },
                {
                    title: '产品名称',
                    width: 150,
                    key: 'product'
                },
                {
                    title: '收款户名',
                    width: 140,
                    key: 'userName'
                },
                {
                    title: '结算金额',
                    width: 100,
                    key: 'payAmount'
                },
                /*{
                    title: '贴息金额',
                    width:100,
                    key: 'discountAmount'
                },*/
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
                    width: 120,
                    key: 'personal'
                },
                {
                    title: '借款时间',
                    key: 'loanTime',
                    width: 160
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    // fixed: 'right',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                class: this.orderShow[params.index],
                                on: {
                                    click: () => {
                                        this.show(params.row);
                                    }
                                }
                            }, '贷款结算')
                        ]);
                    }
                }],
            data1: [],
            selTab: []
        }
    },
    created: function () {
        // if ($(window).width() < 768) {
        //     var arr = this.columns1;
        //     for (var i = 0; i < arr.length - 1; i++) {
        //         arr[i]['width'] = this.tbWidth;
        //     }
        //     arr[arr.length - 1]['width'] = 110;
        //     arr[arr.length - 1]['fixed'] = 'right';
        //     this.columns1 = arr;
        // }
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
        dateChange (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
        },
        /*exportData () {
            if(this.selTab.length>0){
                this.model1=true;
            }else{
                this.$Message.warning('请选择放款行');
            }
        },*/
        changePage (page) {
            /*this.data1=this.*/
            this.loadContent(page);
        },
        show (row) {
            this.model1 = true;
            this.dataRdo.bankNm = row.cardNo + "(" + row.bankName + ")";
            this.dataRdo.money = row.payAmount;
            this.dataRdo.loanNo = row.loanNo;
        },
        handleSubmit (name) {
            var that = this;

            let formData = new FormData();
            formData.append('loanNo', this.dataRdo.loanNo);

            this.axios.post('/detail/sendDidding', formData,
                {                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (respon) {
                    if (respon.data.resCode == 1) {
                        that.model1 = false;
                        that.loadContent(1);
                    } else {
                        alert(data.msg);
                    }
                }).catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        loadContent (page) {
            this.data1 = [];
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            var maxResults = this.pageSize;
            this.pageChk=page;
            var that = this;

            let formData = new FormData();
            formData.append('value', this.formSel.input ? this.formSel.input : '');
            formData.append('loanTimeStart', this.formSel.selectTm[0] ? this.formSel.selectTm[0] : '');
            formData.append('loanTimeEnd', this.formSel.selectTm[1] ? this.formSel.selectTm[1] : '');
            formData.append('productType', this.formSel.selectTpValue ? this.formSel.selectTpValue : '');
            formData.append('firstResult', firstResult);
            formData.append('maxResults', maxResults);

            this.axios.post('/detail/selectLoan', formData,
                {                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (respon) {
                    if (respon.data.resCode == 1) {
                        that.total = Math.ceil((respon.data.count / that.pageSize));
                        that.totalRecords = respon.data.count;
                        respon.data.result.forEach(function (element) {
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
                            if (element.type != 2) {
                                that.orderShow.push('orderShow');
                                element._disabled = true;
                            } else {
                                that.orderShow.push('');
                            }
                        }, this);
                        that.data1 = respon.data.result;

                    } else {
                        alert(respon.data.msg);
                    }
                }).catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        reset () {
            this.formSel = {
                selectBs: '选择查询类型',
                input: '',
                selectTp: '',
                selectTm: '',
            }
            this.loadContent(1);
        }
    }
}
</script>
<style>
.orderShow {
  display: none;
}
</style>
