<style scoped>
    @import '../css/viewer.min.css'
</style>
<template>
  <div class="sections">
    <h1>审核记录</h1>
    <div class="pl_body">
        <Form :model="formSel" class="downMenu">
            <FormItem>
                <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                <Button type="success" @click="">查询</Button>

                <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                    <Button type="ghost" :class="{active:vs,chk:formSel.typePd!=''}">
                        产品类型<span v-text="formSel.typePd"></span>
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="全部" :selected="formSel.typePd=='全部'">全部</DropdownItem>
                        <DropdownItem name="消费贷" :selected="formSel.typePd=='消费贷'">消费贷</DropdownItem>
                        <DropdownItem name="现金贷" :selected="formSel.typePd=='现金贷'">现金贷</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" class="showMn" @on-click="showMenu2" @on-visible-change="orShow2">
                    <Button type="ghost" :class="{active:vs2,chk:formSel.typeAd!=''}">
                        归属<span v-text="formSel.typeAd"></span>
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="全部" :selected="formSel.typeAd=='全部'">全部</DropdownItem>
                        <DropdownItem name="新乡市宝奇" :selected="formSel.typeAd=='新乡市宝奇'">新乡市宝奇</DropdownItem>
                        <DropdownItem name="小小数码店" :selected="formSel.typeAd=='小小数码店'">小小数码店</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" class="showMn" @on-click="showMenu3" @on-visible-change="orShow3">
                    <Button type="ghost" :class="{active:vs3,chk:formSel.typePs!=''}">
                        审核人员<span v-text="formSel.typePs"></span>
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="全部" :selected="formSel.typePs=='全部'">全部</DropdownItem>
                        <DropdownItem name="张三" :selected="formSel.typePs=='张三'">张三</DropdownItem>
                        <DropdownItem name="李四" :selected="formSel.typePs=='李四'">李四</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
                <DatePicker class="datesel" :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="借款时间" @on-change="dateChange"></DatePicker>
            </FormItem>
        </Form>
        <div class="table_show">
            <Table border :columns="columns1" :data="data1" ref="table"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="total" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="total" simple :current="pageChk" @on-change="changePage"></Page>
    </div>

    <Modal v-model="model1" title="订单详情" class="userInfo noFooter agentsDetail" width="900">
        <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核人员"><span>张三</span></FormItem>
                        <FormItem label="审核状态"><span>未通过 <span class="colorRed">(资料有问题)</span>  /   通过  /   重签合同   /   再次合影   /  已冻结订单</span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="审核时间"><span>2017-08-08 12:12:21</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>
         <Row :gutter="16">
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="借款编号"><span>XY562323231321</span></FormItem>
                        <FormItem label="客户姓名"><span>张一河</span></FormItem>
                        <FormItem label="手机号码"><span>13566665555</span></FormItem>
                        <FormItem label="年龄"><span>26</span></FormItem>
                        <FormItem label="单位"><span>深圳市小海有限公司</span></FormItem>
                        <FormItem label="所属省市"><span>广东省深圳市</span></FormItem>
                        <FormItem label="推荐人"><span>13566665555（张海月）</span></FormItem>
                    </Form>
                </div>
            </Col>
            <Col :sm="12" :xs="24">
                <div>
                    <Form :label-width="96">
                        <FormItem label="产品名称"><span>乐薪分期</span></FormItem>
                        <FormItem label="所属代理商"><span>深圳市天天数码有限公司</span></FormItem>
                        <FormItem label="所属商户"><span>深圳数码商户</span></FormItem>
                        <FormItem label="借款金额"><span>￥5000.00</span></FormItem>
                        <FormItem label="贴息金额"><span>￥0.00</span></FormItem>
                        <FormItem label="分期期数"><span>12个月</span></FormItem>
                        <FormItem label="借款时间"><span>2017-05-05 12:23:34</span></FormItem>
                    </Form>
                </div>
            </Col>
        </Row>

        <Row :gutter="16" class="photoShow txt_center" style="margin-bottom:30px;margin-top:0;border:none;">
            <Col :sm="6" :xs="12">
                <h3>合同协议</h3>
                <img src="../assets/userImg.jpg"/>
                <p>借款合同</p>
            </Col>
            <Row class="docs-pictures">
                <Col :sm="6" :xs="12">
                    <h3>合影照片</h3>
                    <img src="../assets/userImg.jpg"/>
                    <p>客户身份证正面照</p>
                </Col>
                <Col :sm="6" :xs="12" class="contract">
                    <img src="../assets/userImg.jpg"/>
                    <p>业务员身份证正面照</p>
                </Col>
                <Col :sm="6" :xs="12" class="contract">
                    <img src="../assets/userImg.jpg"/>
                    <p>客户与业务员合影</p>
                </Col>
            </Row>
        </Row>
        <div slot="footer"></div>

    </Modal>
  </div>
</template>

<script>
import '../router/jquery-1.11.3.min.js'
import viewer from '../router/viewer.min.js'
export default {
  name: 'sections',
    /*components:{ viewer },*/
  data () {
    return {
        model1:false,
        model2:false,
        model3:false,
        vs:false,
        vs2:false,
        vs3:false,
        titleMdl:'审核拒绝',
        txtVal:'输入审核拒绝的理由',
        tbWidth:100,
        total:0,
        pageChk:1,
        formSel:{
            input:'',
            typePd:'',
            typeAd:'',
            typePs:'',
            selectTm:''
        },
        columns1: [
        {
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '手机号',
            key: 'agent'
        },
        {
            title: '归属',
            key: 'createdMn'
        },{
            title: '产品类型',
            key: 'upsetName'
        },
        {
            title: '审核状态',
            key: 'status'
        },{
            title: '审核人员',
            key: 'creditPs'
        },
        {
            title: '借款时间',
            key: 'createdTm',
            width:104
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'success',
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
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            },
            {
                userId: '13622225555',
                name: '崔一凡',
                agent:'17682151555(安徽者鸣商务服务有限公司)',
                createdMn: '145',
                upsetName:'业务员（张一河）',
                status:'通过',
                creditPs:'张一河',
                createdTm: '2017-07-12 12:12:11'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=60;
            arr[arr.length-1]['fixed']='right';
            this.columns1=arr;
        }
    },
    mounted(){
        this.$nextTick(function(){
            $('.docs-pictures').viewer("data-original");
        });
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
        showMenu(val){
            if(val!='全部' && val!=''){
                this.formSel.typePd=' : '+val;
            }else{
                this.formSel.typePd='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu2(val){
            if(val!='全部' && val!=''){
                this.formSel.typeAd=' : '+val;
            }else{
                this.formSel.typeAd='';
            }
        },
        orShow2(visible){
            this.vs2=visible;
        },
        showMenu3(val){
            if(val!='全部' && val!=''){
                this.formSel.typePs=' : '+val;
            }else{
                this.formSel.typePs='';
            }
        },
        orShow3(visible){
            this.vs3=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData (type) {
        },
        changePage(){
            /*this.data1=this.*/
        },
        show(index){
            this.model1=true;
        }
    }
}
</script>
