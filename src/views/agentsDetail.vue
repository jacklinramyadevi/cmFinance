<template>
  <div class="sections">
    <h1>商户代理商查询</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="提现时间" @on-change="dateChange"></DatePicker>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.selectTp!=''}">
                                提现状态<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="打款成功" :selected="formSel.selectTp=='打款成功'">打款成功</DropdownItem>
                                <DropdownItem name="打款失败" :selected="formSel.selectTp=='打款失败'">打款失败</DropdownItem>
                                <DropdownItem name="打款处理中" :selected="formSel.selectTp=='打款处理中'">打款处理中</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
        <div class="table_show">
        <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="totalRecords" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="totalRecords" simple :current="pageChk" @on-change="changePage"></Page>
    </div>
    <Modal v-model="model1" title="详情" class="noFooter userInfo" width="900">
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form>
                        <FormItem label="名称"><span>泰安市泰山区高盛通讯器材销售中心</span></FormItem>
                        <FormItem label="申请人姓名"><span>刘会莹</span></FormItem>
                        <FormItem label="申请人手机号"><span>13555555555</span></FormItem>
                        <FormItem label="申请人身份证号码"><span>222333198808085655</span></FormItem>
                        <FormItem label="公司账户"><span>6555222255555555</span></FormItem>
                        <FormItem label="法人姓名"><span>刘会莹</span></FormItem>
                        <FormItem label="地址"><span>山东省泰安市泰山区泰前街道岱道庵路159号</span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form>
                        <FormItem label="营业执照编号"><span>51213215132113213212</span></FormItem>
                        <FormItem label="员工人数"><span>50</span></FormItem>
                        <FormItem label="联系人"><span>刘会莹</span></FormItem>
                        <FormItem label="联系电话"><span>13555555555</span></FormItem>
                        <FormItem label="当前产品"><span>无</span></FormItem>
                        <FormItem label="审核人"><span>张三</span></FormItem>
                        <FormItem label="审核备注"><span></span></FormItem>
                    </Form>
                </div>
            </Col>
         </Row>
        <Row :gutter="16" class="photoShow">
            <Col :sm="6" :xs="12">
                <p>身份证正面</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>身份证反面</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>营业执照证</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>组织机构代码证</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>税务登记证</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>银行开户许可证</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
            <Col :sm="6" :xs="12">
                <p>新证</p>
                <img src="../assets/userImg.jpg"/>
            </Col>
        </Row>
         <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        model1:false,
        model2:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        vs:false,
        formSel:{
            input:'',
            selectTp:'',
            selectTm:'',
        },
        columns1: [
        {
            title: '商户名称',
            key: 'nameBs'
        },
        {
            title: '所属行业',
            key: 'typeBs'
        },
        {
            title: '申请人姓名',
            key: 'applyNm'
        },
        {
            title: '申请人手机号',
            key: 'applyPh'
        },
        {
            title: '法人姓名',
            key: 'name'
        },
        {
            title: '类型',
            key: 'type'
        },
        {
            title: '归属',
            key: 'addressCt'
        },
        {
            title: '地址',
            key: 'address'
        },
        {
            title: '营业执照编号',
            key: 'licenseNo'
        },
        {
            title: '状态',
            key: 'status'
        },
        {
            title: '审核人',
            key: 'nameOp'
        },
        {
            title: '审核时间',
            key: 'timeOp',
            width:104
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
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
                                this.show(params.index);
                            }
                        }
                    }, '详情')
                ]);
            }
        }],
        data1: [{
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河',
                type:'rrgg',
                addressCt: '深圳市轻工科技有限公司',
                address: '176730972074     ',
                licenseNo: '中国银行',
                status: '对公',
                nameOp: '3562',
                timeOp: 0
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=70;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.selectTp=' : '+val;
            }else{
                this.formSel.selectTp='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
            /*if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                });
            } else*/ if (type === 2) {
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
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            this.model1=true;
        },
        handleSubmit(name){
            /*this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })*/
        }    
    }
}
</script>
