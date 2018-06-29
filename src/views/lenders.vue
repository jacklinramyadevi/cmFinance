<template>
    <div class="sections">
        <h1>放贷明细表</h1>
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
                            placeholder="借款编号/客户姓名/手机号码"
                            @on-enter="loadContent(1)"></Input>
                        <Button type="primary"
                            @click="loadContent(1)">查询</Button>
                        <DatePicker :value="formSel.selectTm"
                            format="yyyy-MM-dd"
                            type="daterange"
                            placement="bottom-start"
                            placeholder="借款时间"
                            @on-change="dateChange"></DatePicker>
                        <!--<Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">-->
                        <!--<Button type="ghost" :class="{active:vs3,chk:formSel.channelBs!=''}">-->
                        <!--业务渠道<span v-text="formSel.channelBs"></span>-->
                        <!--<Icon type="arrow-down-b"></Icon>-->
                        <!--</Button>-->
                        <!--<DropdownMenu slot="list">-->
                        <!--<DropdownItem name="全部" :selected="formSel.channelBs=='全部'">全部</DropdownItem>-->
                        <!--<DropdownItem name="普通" :selected="formSel.channelBs=='普通'">普通</DropdownItem>-->
                        <!--<DropdownItem name="安利" :selected="formSel.channelBs=='安利'">安利</DropdownItem>-->
                        <!--<DropdownItem name="华人" :selected="formSel.channelBs=='华人'">华人</DropdownItem>-->
                        <!--<DropdownItem name="国美" :selected="formSel.channelBs=='国美'">国美</DropdownItem>-->
                        <!--</DropdownMenu>-->
                        <!--</Dropdown>-->
                        <!--<Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">-->
                        <!--<Button type="ghost" :class="{active:vs,chk:formSel.typeWd!=''}">-->
                        <!--所属行业<span v-text="formSel.typeWd"></span>-->
                        <!--<Icon type="arrow-down-b"></Icon>-->
                        <!--</Button>-->
                        <!--<DropdownMenu slot="list">-->
                        <!--<DropdownItem name="全部" :selected="formSel.typeWd=='全部'">全部</DropdownItem>-->
                        <!--<DropdownItem name="数码3C" :selected="formSel.typeWd=='数码3C'">数码3C</DropdownItem>-->
                        <!--<DropdownItem name="美容" :selected="formSel.typeWd=='美容'">美容</DropdownItem>-->
                        <!--<DropdownItem name="建筑" :selected="formSel.typeWd=='建筑'">建筑</DropdownItem>-->
                        <!--<DropdownItem name="旅游" :selected="formSel.typeWd=='旅游'">旅游</DropdownItem>-->
                        <!--</DropdownMenu>-->
                        <!--</Dropdown>-->
                        <Dropdown trigger="click"
                            class="showMn"
                            @on-click="showMenu2"
                            @on-visible-change="orShow2">
                            <Button type="ghost"
                                :class="{active:vs2,chk:formSel.typeBs!=''}">
                                业务类型
                                <span v-text="formSel.typeBs"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <!-- 0 消费贷 1 现金贷 -->
                                <DropdownItem name="全部"
                                    :selected="formSel.typeBs=='全部'">全部</DropdownItem>
                                <DropdownItem name="0:消费贷"
                                    :selected="formSel.typeBs=='消费贷'">消费贷</DropdownItem>
                                <DropdownItem name="1:现金贷"
                                    :selected="formSel.typeBs=='现金贷'">现金贷</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click"
                            class="showMn"
                            @on-click="showMenu5"
                            @on-visible-change="orShow5">
                            <Button type="ghost"
                                :class="{active:vs5,chk:formSel.statusLd!=''}">
                                订单状态
                                <span v-text="formSel.statusLd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <!--0-等待放款，1-放款成功，2-放款失败，3-合同取消，4-合同结清 5-放款处理中   -->
                                <DropdownItem name="全部"
                                    :selected="formSel.statusLd=='全部'">全部</DropdownItem>
                                <DropdownItem name="0:等待放款"
                                    :selected="formSel.statusLd=='等待放款'">等待放款</DropdownItem>
                                <DropdownItem name="1:放款成功"
                                    :selected="formSel.statusLd=='放款成功'">放款成功</DropdownItem>
                                <DropdownItem name="2:放款失败"
                                    :selected="formSel.statusLd=='放款失败'">放款失败</DropdownItem>
                                <DropdownItem name="3:合同取消"
                                    :selected="formSel.statusLd=='合同取消'">合同取消</DropdownItem>
                                <DropdownItem name="4:合同结清"
                                    :selected="formSel.statusLd=='合同结清'">合同结清</DropdownItem>
                                <DropdownItem name="5:放款处理中"
                                    :selected="formSel.statusLd=='放款处理中'">放款处理中</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown trigger="click"
                            class="showMn"
                            @on-click="showMenu4"
                            @on-visible-change="orShow4">
                            <Button type="ghost"
                                :class="{active:vs4,chk:formSel.typePd!=''}">
                                资金提供方
                                <span v-text="formSel.typePd"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部"
                                    :selected="formSel.typePd=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金"
                                    :selected="formSel.typePd=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺"
                                    :selected="formSel.typePd=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button v-if="formSel.input!='' || formSel.selectTm!='' || formSel.typeBs!='' || formSel.statusLd!='' || formSel.typePd!=''"
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
            title="详情"
            class="userInfo noFooter"
            width="1200">
            <Table border
                :columns="columns2"
                :data="data2"></Table>
            <div slot="footer"></div>

        </Modal>

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
            vs5: false,
            model1: false,
            tbWidth: 100,
            total: 0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            formSel: {
                input: '',
                channelBs: '',
                typeWd: '',
                typePd: '',
                typeBs: '',
                statusLd: '',
                selectTm: '',
                loanTimeStart: '',
                loanTimeEnd: '',
                typeBsValue: '',
                channelBsValue: '',
                statusLdValue: '',
                typePdValue: ''
            },
            columns1: [
                {
                    title: '借款编号',
                    width: 180,
                    fixed: 'left',
                    key: 'loanNo'
                },
                {
                    title: '客户姓名',
                    width: 100,
                    fixed: 'left',
                    key: 'custName'
                },
                {
                    title: '性别',
                    width: 70,
                    key: 'sex'
                },
                {
                    title: '身份证号码',
                    width: 180,
                    key: 'idcard'
                },
                {
                    title: '年龄',
                    width: 70,
                    key: 'age'
                },
                {
                    title: '手机号码',
                    width: 120,
                    key: 'custMobile'
                },
                {
                    title: '省份',
                    width: 70,
                    key: 'province'
                },
                {
                    title: '城市',
                    width: 70,
                    key: 'city'
                },
                {
                    title: '借款金额',
                    width: 100,
                    key: 'loanAmount'
                },
                {
                    title: '借款时间',
                    key: 'loanTime',
                    width: 160
                },
                {
                    title: '首付金额',
                    width: 100,
                    key: 'downpayAmount'
                },
                {
                    title: '分期期数',
                    width: 100,
                    key: 'periodNum'
                },
                {
                    title: '年化利率',
                    width: 100,
                    key: 'loanRate'
                },
                {
                    title: '贴息率',
                    width: 100,
                    key: 'discountRate'
                },
                {
                    title: '放款金额',
                    width: 100,
                    key: 'payAmount'
                },
                //        {
                //            title: '产品名称',
                //            width:150,
                //            key: 'product'
                //        },
                //        {
                //            title: '所属行业',
                //            width:100,
                //            key: 'repayWd'
                //        },
                {
                    title: '产品类型',
                    width: 150,
                    key: 'loanType'
                },
                //        {
                //            title: '业务渠道',
                //            width:150,
                //            key: 'bsChannel'
                //        },
                //        {
                //            title: '结算名称',
                //            width:100,
                //            key: 'payNm'
                //        },
                {
                    title: '结算平台',
                    width: 150,
                    key: 'payPlat'
                },
                {
                    title: '结算时间',
                    width: 160,
                    key: 'payTime'
                },
                {
                    title: '结算流水号',
                    width: 200,
                    key: 'tradeNo'
                },
                {
                    title: '资金提供方',
                    width: 150,
                    key: 'payPlat'
                },
                {
                    title: '订单状态',
                    width: 100,
                    key: 'status'
                },
                {
                    title: '备注',
                    width: 150,
                    key: 'remark'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    fixed: 'right',
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
                                        this.show(params.row.loanNo);
                                    }
                                }
                            }, '还款计划')
                        ]);
                    }
                }],
            data1: [],
            columns2: [{
                title: '期数',
                width: 50,
                fixed: 'left',
                key: 'planStage'
            }, {
                title: '应还时间',
                key: 'planLtm',
                width: 160
            }, {
                title: '应还总额',
                width: 90,
                key: 'planTotal'
            }, {
                title: '应还本金',
                width: 90,
                key: 'planPrp'
            }, {
                title: '应还利息',
                width: 90,
                key: 'planInt'
            }, {
                title: '应还服务费',
                width: 90,
                key: 'planSfe'
            }, {
                title: '应还罚息',
                width: 90,
                key: 'planPin'
            }, {
                title: '应还违约金',
                width: 90,
                key: 'dfltAmount'
            }, {
                title: '实还时间',
                width: 160,
                key: 'realTime'
            }, {
                title: '实还总额',
                width: 90,
                key: 'repAmount'
            }, {
                title: '实还本金',
                width: 90,
                key: 'realPrp'
            }, {
                title: '实还利息',
                width: 90,
                key: 'realInt'
            }, {
                title: '实还服务费',
                width: 90,
                key: 'realSfe'
            }, {
                title: '实还罚息',
                width: 90,
                key: 'realPin'
            }, {
                title: '实还违约金',
                width: 90,
                key: 'dfltAmount'
            }, {
                title: '状态',
                width: 100,
                key: 'status'
            }],
            data2: []
        }
    },
    created: function () {
        if ($(window).width() < 768) {
            var arr = this.columns1;
            for (var i = 0; i < arr.length - 1; i++) {
                arr[i]['width'] = this.tbWidth;
            }
            arr[arr.length - 1]['width'] = 70;
            arr[arr.length - 1]['fixed'] = 'right';
            this.columns1 = arr;
        }
        this.loadContent(1);
    },
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        }
    },
    methods: {
        /*showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typeWd='：'+val;
            }else{
                this.formSel.typeWd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },*/
        showMenu2 (val) {
            if (val != '全部' && val != '') {
                this.formSel.typeBs = '：' + val.split(":")[1];
                this.formSel.typeBsValue = val.split(":")[0];
            } else {
                this.formSel.typeBs = '';
                this.formSel.typeBsValue = '';
            }
            this.loadContent(1);
        },
        orShow2 (visible) {
            this.vs2 = visible;
        },
        showMenu3 (val) {
            if (val != '全部' && val != '') {
                this.formSel.channelBs = '：' + val;
                this.formSel.channelBsValue = val;
            } else {
                this.formSel.channelBs = '';
                this.formSel.channelBsValue = '';
            }
            this.loadContent(1);
        },
        orShow3 (visible) {
            this.vs3 = visible;
        },
        showMenu4 (val) {
            if (val != '全部' && val != '') {
                this.formSel.typePd = '：' + val;
                this.formSel.typePdValue = val;
            } else {
                this.formSel.typePd = '';
                this.formSel.typePdValue = '';
            }
            this.loadContent(1);
        },
        orShow4 (visible) {
            this.vs4 = visible;
        },
        showMenu5 (val) {
            if (val != '全部' && val != '') {
                this.formSel.statusLd = '：' + val.split(":")[1];
                this.formSel.statusLdValue = val.split(":")[0];
            } else {
                this.formSel.statusLd = '';
                this.formSel.statusLdValue = '';
            }
            this.loadContent(1);
        },
        orShow5 (visible) {
            this.vs5 = visible;
        },
        dateChange (date) {
            this.formSel.selectTm = date;
            this.formSel.loanTimeStart = date[0];
            this.formSel.loanTimeEnd = date[1] == undefined ? '' : date[1];
            this.loadContent(1);
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
            } /*else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: '自定义数据',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }*/
            var that = this;
            window.open(this.$store.getters.httpUrl + "/export/repayDown?value=" + that.formSel.input + "&loanTimeStart=" +
                that.formSel.loanTimeStart + "&loanTimeEnd=" + that.formSel.loanTimeEnd +
                "&bsType=" + that.formSel.typeBsValue + "&bsChannel=" + that.formSel.channelBsValue +
                "&status=" + that.formSel.statusLdValue +
                "&payPlat=" + that.formSel.typePdValue);
        },
        changePage (page) {
            /*this.data1=this.*/
            this.loadContent(page);
        },
        show (loanNo) {
            this.model1 = true;
            this.findRepayPlan(loanNo);
        },
        loadContent (page) {
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            var maxResults = this.pageSize;
            this.pageChk=page;
            this.data1 = [];
            var that = this;
            var data = {
                value: that.formSel.input,
                loanTimeStart: that.formSel.selectTm[0],
                loanTimeEnd: that.formSel.selectTm[1],
                bsType: that.formSel.typeBsValue,
                bsChannel: that.formSel.channelBsValue,
                status: that.formSel.statusLdValue,
                payPlat: that.formSel.typePdValue,
                firstResult: firstResult,
                maxResults: maxResults
            };
            axios.post('/stat/repay', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }).then(function (resp) {
                if (resp.data.resCode == 1) {
                    that.total = Math.ceil((resp.data.count / that.pageSize));
                    that.totalRecords = resp.data.count;
                    resp.data.result.forEach(function (element) {
                        if (element.loanType == 0) {
                            element.loanType = "消费贷";
                        } else if (element.loanType == 1) {
                            element.loanType = "现金贷";
                        }

                        if (element.sex == 0) {
                            element.sex = '女'
                        } else {
                            element.sex = '男'
                        }

                        ////0-等待放款，1-放款成功，2-放款失败，3-合同取消，4-合同结清 5-放款处理中
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
                        }

                        if (element.payPlat == '110205') {
                            element.payPlat = '中科诺'
                        } else if (element.payPlat == '110408') {
                            element.payPlat = '华金'
                        } else {
                            element.payPlat = ''
                        }


                        var periodType = element.periodType;
                        if (periodType == 0) {
                            element.periodNum = element.periodNum + "个月";
                        } else if (periodType == 1) {
                            element.periodNum = element.periodNum + "天";
                        } else if (periodType == 2) {
                            element.periodNum = element.periodNum + "周";
                        } else if (periodType == 3) {
                            element.periodNum = element.periodNum + "年";
                        }
                    }, this);
                    that.data1 = resp.data.result;
                }
            }).catch(function (resp) {
                that.$Message.warning('放贷明细列表获取异常');
            });
        },
        findRepayPlan (loanNo) {
            this.data2 = [];
            var that = this;

            $.ajax({
                url: "/stat/findRepayPlan",
                type: "post",
                cache: false,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    value: loanNo
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",

                success: function (data) {
                    if (data.resCode == 1) {
                        data.result.forEach(function (element) {
                            if (element.status == 0) {
                                element.status = "计划未开始";
                            } else if (element.status == 1) {
                                element.status = "未到期";
                            } else if (element.status == 2) {
                                element.status = "本期待还";
                            } else if (element.status == 3) {
                                element.status = "逾期待还";
                            } else if (element.status == 4) {
                                element.status = "还款中";
                            } else if (element.status == 5) {
                                element.status = "已还清";
                            } else if (element.status == 6) {
                                element.status = "合同取消";
                            }
                        }, this);
                        that.data2 = data.result;
                    }
                }
            });
        },
        reset () {
            this.formSel = {
                input: '',
                channelBs: '',
                typeWd: '',
                typePd: '',
                typeBs: '',
                statusLd: '',
                selectTm: '',
                loanTimeStart: '',
                loanTimeEnd: '',
                typeBsValue: '',
                channelBsValue: '',
                statusLdValue: '',
                typePdValue: ''
            }
            this.loadContent(1);
        }
    }
}
</script>
