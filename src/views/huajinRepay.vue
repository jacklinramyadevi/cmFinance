
<template>
    <div class="sections">
        <h1>华金还款处理</h1>
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
                                placeholder="应还时间"
                                @on-change="dateChange"></DatePicker>
                            &nbsp;&nbsp;
                            <span>应还华金总金额：¥
                                <span v-text="totalMoney"></span>
                            </span>&nbsp;&nbsp;
                            <Button 
                            v-if="formSel.selectTm!=''"
                            @click="reset">重置</Button>
                            </Col>
                            <Col span="12">
                            <Button type="primary"
                                class="float_right"
                                :disabled="disabled"
                                @click="model1=!model1">立即偿还</Button>
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
        title="立即偿还"
        width="600"
        @on-click="">
            <div slot="footer">
                <Button type="text"
                    size="large"
                    @click="model1=!model1">取消</Button>
                <Button type="primary"
                    size="large"
                    @click="payConfirm">确定</Button>
            </div>
            <Form :model="formSel"
                :label-width="80">
                <FormItem label="偿还金额">
                    <Input v-model="totalMoney"
                    placeholder="偿还金额"
                    disabled></Input>
                </FormItem>
                <FormItem label="偿还时间">
                    <DatePicker :value="selectTm"
                        format="yyyy-MM-dd"
                        placement="bottom-start"
                        @on-change="dateChange1"></DatePicker>
                </FormItem>
                <!-- <FormItem label="偿还时间">
                    <Input v-model="repayTime"
                    placeholder='偿还时间'
                        disabled></Input> -->
                </FormItem>
                <FormItem label="还款流水号">
                    <Input v-model="sn"
                        placeholder="请输入还款流水号"></Input>
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
            disabled:true, // 立即偿还
            repayTime: '',   
            totalMoney: '',  // 偿还总金额
            rowMoney:'',
            tbWidth: 100,
            total: 0,
            total1: 0,
            totalRecords: 0,
            pageSize: 10,
            pageChk:1,
            model1: false,
            formSel: {
                selectTm: ''
            },
            sn: '',
            mn: '',
            selectTm:new Date(),
            // countMn: 0,
            columns1: [
                {
                    title: '借款编号',
                    key:'loanNo',
                    width:200,
                    fixed: 'left',
                    align: 'center'
                },
                {
                    title: '客户姓名',
                    key: 'custName',
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
                // {
                //     title: '订单流水号',
                //     key: 'flowNo',
                //     width: 270,
                //     align: 'center'
                // },
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
                    title: '当前状态',
                    key: 'status',
                    fixed: 'right',
                    width: 90,
                    align: 'center'
                }//,
                //        {
                //            title: '放款时间',
                //            key: 'payTm',
                //            width:104
                //        }
            ],
            data1: []
        }
    },
    created: function () {
        var arr = this.columns1;
        // for (var i = 0; i < arr.length - 1; i++) {
        //     if (arr[i].width == undefined) {
        //         arr[i]['width'] = this.tbWidth;
        //     }
        // }
        this.columns1 = arr;
    },
    mounted () {
        this.loadContent(1)
        let thisTime = new Date;
        let thisDate = thisTime.getFullYear() + "-" + (thisTime.getMonth() + 1) + "-" + thisTime.getDate();
        this.repayTime = thisDate;
    },
    computed: {
        pageWin () {
            return Math.max(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth);
        }
    },
    methods: {
        dateChange (date) {
            this.formSel.selectTm = date;
            this.loadContent(1);
            this.disabled = false
        },
        dateChange1 (date) {
            this.selectTm = date;
        },
        changePage (page) {
            this.loadContent(page);
        },
        chkDate () {

        },
        // 立即偿还
        payConfirm () {

            // var tm = this.selectTm
            // var mn = this.mn
            var sn = this.sn

            // if (tm == null || tm == '') {
            //     this.$Message.error('偿还时间不能为空')
            //     return
            // }

            // if (mn == null || mn == '') {
            //     this.$Message.error('偿还金额不能为空')
            //     return
            // }

            if (sn == null || sn == '') {
                this.$Message.error('偿还流水号不能为空')
                return
            }

            /*
             queryTime : tm,
             repaySn :sn,
             amount :mn
             */
            let that = this;
            let formData = new FormData();
            formData.append('queryTime',that.formSel.selectTm)
            formData.append('repayTime', that.selectTm);
            formData.append('repaySn', sn);
            // formData.append('cpsSt', 1);
            formData.append('amount', that.totalMoney);

            that.axios
                .post('/hj/hjCompensatory', formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (respon) {
                    // that.total1 = respon.data.count.count;
                    that.totalMoney = respon.data.count.repTotalAmt || 0;

                    if (respon.data.resCode == 1) {
                        that.$Message.error('操作成功')
                    } else {
                        that.$Message.error('操作失败')
                    }
                })
                .catch(function (resp) {
                    that.$Message.warning('系统异常');
                });
            that.model1 = !that.model1;
            that.loadContent(1);
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
        // 还款处理详情
        loadContent (page) {
            var firstResult = (parseInt(page) - 1) * this.pageSize;
            var pageSize = this.pageSize;
            this.pageChk=page;
            var that = this;
            that.totalMoney = '0';

            let formData = new FormData();
            formData.append('queryTime', that.formSel.selectTm ? that.formSel.selectTm : '');
            formData.append('pageStart', firstResult);
            formData.append('pageSize', pageSize);

            this.axios
                .post('/hj/queryHjRepayPlans', formData,
                { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (respon) {

                    that.totalMoney = respon.data.count.repTotalAmt || 0;

                    if (respon.data.resCode == 1) {
                        that.total = Math.ceil((respon.data.count.count / that.pageSize));
                        that.totalRecords = respon.data.count.count;
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
                })
                .catch(function (resp) {
                    this.$Message.warning('系统异常');
                });
        },
        reset () {
            this.formSel.selectTm = '';
            this.totalMoney = '0';
            this.loadContent(1);
        }
    }
}
</script>

