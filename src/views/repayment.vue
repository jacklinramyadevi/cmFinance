<style>
  @import "../css/swiper.min.css";
</style>
<template>
    <div class="sections">
        <h1>还款处理</h1>
        <div class="pl_body"
            style="text-align:center;margin:0 auto;">
            <Form :model="formSel"
                class="downMenu blackChk"
                onsubmit="return false;">
                <FormItem style="text-align:center">
                    <span>待处理事项：{{untreated}}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <a href="javacript:"
                        @click="model3=!model3">立即处理</a>
                </FormItem>
                <FormItem>
                    <Input style="display:none;"></Input>
                    <Input v-model="formSel.input"
                        icon="ios-search"
                        @keyup.enter.native="chkClick"
                        placeholder="借款编号/手机号/姓名"></Input>
                    <Button id="queryButton"
                        type="success"
                        @click="chkClick">查询</Button>
                </FormItem>

            </Form>
            <div v-if="vs==true"
                style="margin-bottom:80px"
                v-for="(item,idx) in items"
                :key="idx">
                <!-- :model="loanDetail" -->
                <div class="table_show"
                    :model="item.loanDetail">
                    <table class="headerTb smallTb"
                        border="0"
                        cellpadding="0"
                        cellspacing="0">
                        <tr>
                            <td class="txt_center">借款编号</td>
                            <td> {{item.loanDetail.loanNo}}</td>
                            <td class="txt_center">手机号</td>
                            <td>{{item.loanDetail.custMobile}}</td>
                        </tr>
                        <tr>
                            <td class="txt_center">客户姓名</td>
                            <td>{{item.loanDetail.custName}}</td>
                            <td class="txt_center">产品名称</td>
                            <td>{{item.loanDetail.product}}</td>
                        </tr>
                        <tr>
                            <td class="txt_center">借款金额</td>
                            <td>￥{{item.loanDetail.loanAmount}}</td>
                            <td class="txt_center"></td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <div class="table_show">
                    <Row style="margin-bottom:10px">
                        <Col span="12">
                        <h3 class="txt_left">还款计划</h3>
                        </Col>
                        <!-- <Col span="12">
                        <div class="float_right">
                            <Button type="primary"
                                @click="preRepayShow">提前结清</Button>
                        </div>
                        </Col> -->
                    </Row>
                    <Table border
                        :columns="columns1"
                        :data="item.repayDetail"></Table>
                </div>
            </div>
        </div>
        <!-- <Modal v-model="model1"
            title="还款处理"
            width="600"
            @on-ok="currentRepay">
            <Form :model="updateData"
                :label-width="90">
                <FormItem label="还款时间">
                    <DatePicker :value="updateData.time"
                        format="yyyy-MM-dd"
                        placement="bottom-start"
                        placeholder="还款时间"
                        @on-change="dateChange"></DatePicker>
                </FormItem>
                <FormItem label="还款金额">
                    <Icon type="social-yen"></Icon>
                    <InputNumber :min="0"
                        v-model="updateData.money"
                        class="moneyIpt"
                        placeholder="还款金额"></InputNumber>
                </FormItem>
                <FormItem label="线下还款渠道">
                    <Select v-model="updateData.orget"
                        placeholder="请选择">
                        <Option value="001">上海银行</Option>
                        <Option value="002">建设银行</Option>
                        <Option value="003">微信</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal> -->

        <!-- <Modal v-model="model2"
            title="提前结清"
            width="600"
            @on-ok="preRepaySquare">
            <Form :model="formRepay"
                :label-width="90">
                <FormItem label="结清时间">
                    <span>
                        <DatePicker :value="formRepay.time"
                            format="yyyy-MM-dd"
                            placement="bottom-start"
                            placeholder="还款时间"
                            @on-change="datePreChange"></DatePicker>
                    </span>
                </FormItem>
                <FormItem label="结清金额">
                    <Icon type="social-yen"></Icon>
                    <Input disabled
                        v-model="formRepay.money"
                        class="moneyIpt"
                        placeholder="结清金额"></Input>
                </FormItem>
                <FormItem label="线下还款渠道">
                    <Select v-model="formRepay.orget"
                        placeholder="请选择">
                        <Option value="001">上海银行</Option>
                        <Option value="002">建设银行</Option>
                        <Option value="003">微信</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal> -->

        <Modal v-model="model3"
            title="待处理事项"
            class="noFooter"
            width="800">
            <div class="table_show">
                <Table border
                    :columns="columns2"
                    :data="data2"></Table>
            </div>
            <div slot="footer"></div>
        </Modal>

        <Modal v-model="model4"
            title="线下还款"
            class="noFooter"
            width="600">
            <Form :label-width="70">
                <FormItem label="还款时间">
                    <span>{{underLineData.createTime}}</span>
                </FormItem>
                <FormItem label="结清处理">
                    <span>{{underLineData.clrType}}</span>
                </FormItem>
                <FormItem label="还款金额">
                    <span>￥{{underLineData.repayAmount}}</span>
                </FormItem>
                <FormItem label="减免金额">
                    <span>￥{{underLineData.derateAmount}}</span>
                </FormItem>
                <FormItem label="还款平台">
                    <span>{{underLineData.platNo}}</span>
                </FormItem>
                <FormItem label="附件">
                    <Button type="ghost"
                        @click="showPic" >查看</Button>
                </FormItem>
                <Button type="primary"
                    @click="underRepay('pass')">通过</Button>
                <Button type="ghost"
                    @click="fail">拒绝</Button>
                <Button type="ghost"
                    @click="model4=!model4">取消</Button>
            </Form>
            <div slot="footer"></div>
        </Modal>

        <Modal v-model="model5"
            title="拒绝"
            width="600">
            <Form ref="formDesc"
                :model="formDesc"
                :rules="ruleDesc">
                <FormItem prop="desc">
                    <Input type="textarea"
                        v-model="formDesc.desc"
                        :rows="6"
                        :maxlength="200"
                        placeholder="输入拒绝理由"
                        @on-keyup="txtKeyup"></Input>
                    <div class="submitDesc">
                        <span v-text="formDesc.descCount"></span>
                    </div>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost"
                    @click="model5=!model5">取消
                </Button>
                <Button type="primary"
                    @click="underRepay('refuse')">确认
                </Button>
            </div>
        </Modal>
        <!-- 附件展示 -->
        <Modal v-model="model6"
            class="noFooter"
            width="900">
            <div class="photoShow"><img :src="modelImg"/></div>
            <!-- <swiper :options="swiperOption"
                ref="mySwiper"
                class="photoShow">
                <swiperSlide v-for="(s,i) in swiperImg"
                    :key="i">
                <swiperSlide v-for="(s,i) in imgObj"
                    :key="i">
                    <h3 v-text="s.docNm"></h3>
                    <img :src="s" />
                    <video v-else
                        :src="s.src"></video>
                </swiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper> -->
            <div slot="footer"></div>
        </Modal>
    </div>
    </div>
</template>

<script>

import axios from 'axios';
import { swiper, swiperSlide } from "vue-awesome-swiper";

var validateLen = function (rule, value, callback) {
    if (!value) {
        return callback(new Error('拒绝理由不能为空'));
    } else if (value.length > 200) {
        return callback(new Error('至多输入200字'));
    } else {
        callback();
    }
}

export default {
    name: 'sections',
    components: { swiper, swiperSlide },
    data () {
        return {
            untreated: 0,
            model1: false,
            model2: false,
            model3: false,
            model4: false,
            model5: false,
            model6: false,
            modelImg:'',
            formSel: {
                input: ''
            },
            vs: false,
            operatorPersonId: 0,
            totalMoney: 0,
            prePlanStage: "",
            planStatus: "",
            channelCode: "",
            acctId: "",
            flowNo: "",
            formPay: {
                time: [],
                money: 0,
                orget: '0',
                orgot: '0'
            },
            updateData: {
                loanNo: '', // 修改的还款计划数据 loanNo
                time: [],
                money: 0,
                orget: '0',
                orgot: '0'
            },
            items: {},
            loanDetail: {},
            formRepay: {
                time: [],
                money: '300.00',
                moneyLose: '',
                orget: '0'
            },
            columns1: [{
                title: '期数',
                width: 80,
                fixed: 'left',
                key: 'planStage'
            }, {
                title: '应还时间',
                key: 'planLtm',
                width: 160
            }, {
                title: '应还总额',
                width: 100,
                key: 'planTotal'
            }, {
                title: '应还本金',
                width: 100,
                key: 'planPrp'
            }, {
                title: '应还利息',
                width: 100,
                key: 'planInt'
            }, {
                title: '应还服务费',
                width: 100,
                key: 'planSfe'
            }, {
                title: '应还罚息',
                width: 100,
                key: 'planPin'
            }, {
                title: '应还违约金',
                width: 100,
                key: 'dfltAmount'
            }, {
                title: '实还时间',
                key: 'realTime',
                width: 160
            }, {
                title: '实还总额',
                width: 100,
                key: 'repAmount'
            }, {
                title: '实还本金',
                width: 100,
                key: 'realPrp'
            }, {
                title: '实还利息',
                width: 100,
                key: 'realInt'
            }, {
                title: '实还服务费',
                width: 100,
                key: 'realSfe'
            }, {
                title: '实还罚息',
                width: 100,
                key: 'realPin'
            }, {
                title: '实还违约金',
                width: 100,
                key: 'dfltAmount'
            }, {
                title: '状态',
                width: 100,
                key: 'status'
            }
                // ,{
                //     title: '操作',
                //     key: 'action',
                //     fixed: 'right',
                //     width: 150,
                //     align: 'center',
                //     render: (h, params) => {
                //         console.log(params)
                //         if (params.row.status != "已还清" && params.row.status != "合同取消") {
                //             return h('div', [
                //                 h('Button', {
                //                     props: {
                //                         type: 'primary',
                //                         size: 'small'
                //                     },
                //                     on: {
                //                         click: () => {
                //                             // console.log(params);
                //                             this.show(params);
                //                         }
                //                     }
                //                 }, '还款处理')
                //             ])
                //         }
                //     }
                // }
            ],
            data1: [],
            columns2: [{
                title: '借款编号',
                key: 'loanNo',
                // fixed: 'left',
                width: 150
            }, {
                title: '用户账号',
                key: 'custMobile',
                width: 120
            }, {
                title: '还款金额',
                key: 'repayAmount',
                width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('span', {}, '¥' + params.row.repayAmount)
                    ])
                }
            }, {
                title: '提交人员',
                key: 'operator',
                width: 120
            }, {
                title: '提交时间',
                key: 'createTime',
                width: 160
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                // fixed: 'right',
                // width: 100,
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.model4 = true;
                                    if (params.row.clrType === 0) { //正常还款
                                        params.row.clrType = "否"
                                    }
                                    if (params.row.clrType === 1) { //提前还款（结清）
                                        params.row.clrType = "是"
                                    }
                                    this.underLineData = params.row;
                                    this.imgObj.src = this.esDownDocInfoNew+this.underLineData.objId
                                }
                            }
                        }, '详情')
                    ])
                }
            }],
            data2: [],
            underLineData: {},
            imgObj:{},
            swiperOption: {
                notNextTick: true,
                effect: 'coverflow',
                grabCursor: true,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                observeParents: true,
                debugger: true
            },
            formDesc: {
                desc: '',
                descCount: '',
                descNm: 0,
            },
            ruleDesc: {
                descLength: 200,
                desc: [
                    { validator: validateLen, trigger: 'blur' }
                ]
            },
            swiperImg: [],
            esDownDocInfoNew:'/manage/file/esDownDocInfoNew?objId='
        }
    },
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        },
        swiper() {
           return this.$refs.mySwiper.swiper
        }
    },
    mounted () {
        let that = this;
        that.axios.post('/detail/getRepayProcessCount')//查询待处理事项记录条数
            .then(function (resp) {
                if (resp.data.resCode === 1) {
                    that.untreated = resp.data.count
                } else {
                    that.$Message.error(resp.data.msg);
                }
            }).catch(function (resp) {
                that.$Message.warning('系统异常');
            });
        that.getUntreatedTable()
    },
    methods: {
        chkClick () {
            if (this.formSel.input != '') {
                this.findPlan();
            } else {
                this.$Message.warning('输入不能为空')
            }
        },
        getUntreatedTable () {
            var that = this;
            that.axios.post('/detail/getRepayProcessList')//查询待处理事项列表
                .then(function (resp) {
                    if (resp.data.resCode === 1) {
                        that.data2 = resp.data.result
                    } else {
                        that.$Message.error(resp.data.msg);
                    }
                }).catch(function (resp) {
                    that.$Message.warning('系统异常');
                });
        },
        dateChange (date) {
            this.formPay.time = date;
        },
        datePreChange (date) {
            this.formRepay.time = date;
        },
        showPic(){
            if(this.underLineData.objId>0){
                var that=this;
                axios.get('/manage/file/esDownDocInfoNew?objId='+this.underLineData.objId,{
                    responseType:'arraybuffer'
                }).then(response => {
                    return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data,byte) => data + String.fromCharCode(byte),''));
                }).then(data =>{
                    that.modelImg=data;
                }).catch(function (resp) {
                    that.$Message.warning('系统异常');
                });
                this.model6=true;
            }
            else
                this.$Message.warning("暂未上传附件");
        },
        show (params) {
            if (params.row.status === "还款中") {
                this.$Message.warning("有还款正在处理中,不能还款");
                return;
            }
            if (params.row.planStage != params.row.prePlanStage) {
                this.$Message.warning("请选择正确的还款期数,不能还本期");
                return;
            }
            var myDate = new Date();
            //          this.formPay.time = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
            this.model1 = true;
            this.updateData.loanNo = params.row.loanNo
            this.updateData.time = params.row.planLtm
            this.updateData.money = params.row.planTotal
            this.updateData.orget = params.row.loanNo
            this.updateData.orgot = params.row.loanNo
        },
        findPlan () {
            var that = this;
            that.operatorPersonId = 0;
            that.totalMoney = 0;
            that.prePlanStage = "";
            that.planStatus = "";
            that.channelCode = "";
            that.acctId = "";
            that.flowNo = "";
            var detail = { "value": that.formSel.input };
            //http://localhost:8081/cm-loan-finance  ,'Access-Control-Allow-Origin':'*'   withCredentials: true,
            that.axios
                .post('/detail/findRepayDetailFromCore',
                JSON.stringify(detail),
                { headers: { 'Content-Type': 'application/json' } })
                .then(function (respon) {
                    if (respon.data.resCode == 1) {
                        var amountTotal = 0;
                        if (respon.data.result.length > 0) {
                            that.vs = true;
                            for (let i = 0; i < respon.data.result.length; i++) {
                                respon.data.result[i].repayDetail.forEach(function (element) {
                                    var amount = 0;
                                    if (element.status == 0) {
                                        element.status = "计划未开始";
                                        //amount = element.planPrp+element.dfltAmount - element.repAmount;
                                    } else if (element.status == 1) {
                                        // if (that.prePlanStage == '') {
                                        //     that.prePlanStage = element.planStage;
                                        // }
                                        element.prePlanStage = element.planStage;
                                        element.status = "未到期";
                                        amount = element.planPrp + element.dfltAmount - element.repAmount;
                                    } else if (element.status == 2) {
                                        // if (that.prePlanStage == '') {
                                        //     that.prePlanStage = element.planStage;
                                        // }
                                        element.prePlanStage = element.planStage;
                                        element.status = "本期待还";
                                        amount = element.planPrp + element.planInt + element.planPin + element.planSfe - element.repAmount;
                                    } else if (element.status == 3) {
                                        // if (that.prePlanStage == '') {
                                        //     that.prePlanStage = element.planStage;
                                        // }
                                        element.prePlanStage = element.planStage;
                                        element.status = "逾期待还";
                                        amount = element.planPrp + element.planInt + element.planPin + element.planSfe - element.repAmount;
                                    } else if (element.status == 4) {
                                        that.planStatus = 4;
                                        element.status = "还款中";
                                        amount = element.planPrp + element.planInt + element.planPin + element.planSfe - element.repAmount;
                                    } else if (element.status == 5) {
                                        element.status = "已还清";
                                    } else if (element.status == 6) {
                                        element.status = "合同取消";
                                    }
                                    amountTotal += amount;
                                }, that);
                            }

                            that.items = respon.data.result;

                            // that.totalMoney = amountTotal;
                            // that.data1 = respon.data.result.repayDetail;
                            // that.loanDetail = respon.data.result.loanDetail;
                            // that.acctId = respon.data.result.loanDetail.acctId;
                            // that.channelCode = respon.data.result.loanDetail.channelCode;
                            // that.flowNo = respon.data.result.loanDetail.flowNo;
                        } else {
                            that.vs = false;
                            that.$Message.warning('无此信息')
                        }
                    } else {
                        that.$Message.warning(respon.data.msg)
                    }
                })
                .catch(function (resp) {
                    that.$Message.warning('系统异常')
                });

        },
        check () {
            if (this.custId == "") {
                alert("数据有误,请联系我们");
                return false;
            }
            if (this.prePlanStage == "") {
                alert("期数数据有误,请联系我们");
                return false;
            }
            if (this.formPay.orget == "0") {
                alert("请选择线下还款渠道");
                return false;
                //this.$Message.warning('请选择线下还款渠道');
            }
        },
        currentRepay () {
            //var channel = "";
            //var flowNo = "";
            if (this.custId == "") {
                alert("数据有误,请联系我们");
                return false;
            }
            if (this.prePlanStage == "") {
                alert("期数数据有误,请联系我们");
                return false;
            }
            if (this.formPay.orget == "0") {
                alert("请选择线下还款渠道");
                return false;
                //this.$Message.warning('请选择线下还款渠道');
            }
            var acctId = this.acctId;
            var num = new Number(this.formPay.money * 100);
            var amount = num.toFixed(0);
            var planStage = this.prePlanStage;
            var date = this.formPay.time;
            var operatorPersonId = this.operatorPersonId;
            var flowNo = this.flowNo;
            var detail = {};
            detail['acctId'] = acctId;
            detail['amount'] = amount;
            detail['planStage'] = planStage;
            detail['repayDate'] = date;
            detail['operator'] = operatorPersonId;
            detail['flowNo'] = flowNo;
            detail['platNo'] = this.formPay.orget;
            detail['channel'] = this.channelCode;
            detail['type'] = 0;
            detail['remark'] = "";
            //this.$emit('chkClick');
            //this.chkClick();
            //$("#queryButton").click();
            this.axios.post('/detail/offlineRepay',
                JSON.stringify(detail),
                { headers: { 'Content-Type': 'application/json' } })
                .then(function (respon) {
                    if (respon.data.resCode == 1) {
                        alert("线下还款成功");
                        //window.location.href = "/repayment";
                        //this.chkClick();
                        $("#queryButton").click();
                        this.model1 = false;
                    } else {
                        alert("线下还款失败,失败原因是:" + respon.data.message);
                        this.model1 = false;
                    }
                }).catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        /*repayShow(){
          this.show(1);
        },*/
        preRepayShow () {
            var that = this;
            if (this.planStatus == 4) {
                alert("有还款正在处理中,不能还款");
                return false;
            }
            if (that.totalMoney == 1) {
                alert("数据有问题,请联系我们");
                return false;
            }
            this.formRepay.money = that.totalMoney;
            var myDate = new Date();
            // this.formRepay.time = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
            this.model2 = true;

        },

        preRepaySquare () {
            if (this.custId == "") {
                alert("数据有误,请联系我们");
                return false;
            }
            if (this.prePlanStage == "") {
                alert("期数数据有误,请联系我们");
                return false;
            }
            if (this.formRepay.orget == "0") {
                alert("请选择线下还款渠道");
                return false;
            }
            var acctId = this.acctId;
            //var num = new Number(this.totalMoney*100);
            var num = new Number(this.formRepay.money * 100);
            var amount = num.toFixed(0);
            var planStage = this.prePlanStage;
            var date = this.formRepay.time;
            var operatorPersonId = this.operatorPersonId;
            var flowNo = this.flowNo;
            var detail = {};
            detail['acctId'] = acctId;
            detail['amount'] = amount;
            detail['planStage'] = planStage;
            detail['repayDate'] = date;
            detail['operator'] = operatorPersonId;
            detail['flowNo'] = flowNo;
            detail['platNo'] = this.formRepay.orget;
            detail['channel'] = this.channelCode;
            detail['type'] = 0;
            detail['remark'] = "";
            this.axios.post('/detail/offlinePreRepay', JSON.stringify(detail),
                {                    headers: { 'Content-Type': 'application/json' }
                }).then(function (respon) {
                    if (respon.data.resCode == 1) {
                        alert("线下提前还清成功");
                        //window.location.href = "/repayment";
                        //this.chkClick();
                        $("#queryButton").click();
                        this.model1 = false;
                    } else {
                        alert("线下提前还清失败,失败原因是:" + respon.data.message);
                        this.model1 = false;
                    }
                }).catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        fail () {
            this.formDesc.descCount = this.formDesc.descNm + '/' + this.ruleDesc.descLength;
            this.model5 = true;
        },
        txtKeyup () {
            var val = this.formDesc.desc;
            this.formDesc.descNm = val.length;
            this.formDesc.descCount = this.formDesc.descNm + '/' + this.ruleDesc.descLength;
        },
        underRepay (name) {
            let that = this;
            let thisFormData = new FormData;
            thisFormData.append('id', that.underLineData.id);

            if (name === 'pass') { //通过
                thisFormData.append('resultType', 1)
            }
            if (name === 'refuse') { //拒绝
                thisFormData.append('resultType', -1);
                thisFormData.append('rejectReason', that.formDesc.desc);
                if (that.formDesc.descNm == 0) {
                    that.$Message.warning("拒绝理由不能为空")
                    return
                }
            }
            that.axios.post('/detail/processLineRepay',
                thisFormData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (resp) {
                    if (resp.data.resCode == 1) {
                        that.$Message.success('操作成功！')
                        that.model4 = false;
                        that.model5 = false;
                        that.getUntreatedTable();
                    } else {
                        that.$Message.warning(resp.data.msg)
                    }
                })
                .catch(function (resp) {
                    that.$Message.warning('系统异常');
                })
        }

    }
}
</script>

