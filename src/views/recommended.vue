<template>
  <div class="sections">
    <h1>推荐奖励审批</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="借款编号/客户姓名/手机号"></Input>
                        <Button type="primary" @click="">查询</Button>
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
    <Modal v-model="model1" title="审批" @on-ok="countOk('commendMn')" class="" width="900">
         <div class="table_show"><Table border :columns="columns2" :data="data2"></Table></div>
        <Row :gutter="16" v-if="pageWin>=768">
            <Col :sm="5" :xs="24">
                <div class="total">共{{total}}页</div>
            </Col>
            <Col :sm="19" :xs="24" class="txt_right">
                <Page :total="totalRecords" show-elevator :current="pageChk" @on-change="changePage"></Page>
            </Col>
        </Row>
        <Page v-else :total="totalRecords" simple :current="pageChk" @on-change="changePage"></Page>
        <Form class="formBd" :model="commendMn" ref="commendMn" :rules="commendRl" :label-width="80">
            <FormItem label="客户姓名：">
                <span>张三</span>
            </FormItem>
            <FormItem label="可用余额：">
                <span>￥50.00</span>
            </FormItem>
            <FormItem label="审批金额：" prop="money">
            <Row>
                <Col :sm="20" :xs="16">
                    <Input v-model="commendMn.money" placeholder="0.00"></Input><span class="icon_right">元</span>
                </Col>
                <Col :sm="4" :xs="8" style="padding-left:6px;"><CheckboxGroup v-model="commendMn.checkbox">
                    <Checkbox label="老数据"></Checkbox>
                </CheckboxGroup>
                </Col>
            </Row>
            </FormItem>
        </Form>

    </Modal>

  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    const validateNum=(rule,value,callback) => {
        if(!value){
            callback(new Error('输入不能为空'));
        }else if(!Number.isInteger(value)){
            callback(new Error('请输入数字'));
        }else{
            callback();
        }
    };
    return {
        model1:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        formSel:{
            selectBs:'选择查询类型',
            input:''
        },
        commendMn:{
            commendMn:'',
            checkbox:[]
        },
        commendRl:{
            money:[{validator:validateNum,trigger:'blur'}]
        },
        columns1: [
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '客户手机号',
            key: 'userPh'
        },
        {
            title: '银行名称',
            key: 'bank'
        },
        {
            title: '银行卡号',
            key: 'bankNo'
        },
        {
            title: '可用余额',
            key: 'money'
        },
        {
            title: '冻结金额',
            key: 'freezeMn'
        },
        {
            title: '奖励金额',
            key: 'bonus'
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
                    }, '审批')
                ]);
            }
        }],
        data1: [{
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            },
            {
                name: '商户',
                userPh: '1552599999',
                bank:'中国银行',
                bankNo:'6228480928192456574',
                money: 122,
                freezeMn:0,
                bonus:122
            }],
            columns2: [
            {
                type:'selection',
                width:60,
                align:'center'
            },
            {
                title: '订单流水号',
                key: 'orderId'
            },
            {
                title: '客户姓名',
                key: 'name'
            },
            {
                title: '客户手机号',
                key: 'userPh'
            },
            {
                title: '订单金额',
                key: 'moneyOd'
            },
            {
                title: '下单时间',
                key: 'orderTm'
            },
            {
                title: '推荐奖金',
                key: 'recommendMn'
            },
            {
                title: '推荐层级',
                key: 'recommend'
            },
            {
                title: '推荐奖总期数',
                key: 'recommendCt'
            },
            {
                title: '推荐奖当前期数',
                key: 'recommendDt'
            },
            {
                title: '状态',
                key: 'status'
            }],
            data2: [{
                orderId: '319668',
                name: '商户',
                userPh: '1552599999',
                moneyOd: 1767,
                orderTm: '2017-02-05 12:12:21',
                recommendMn:222,
                recommend:1,
                recommendCt: '2',
                recommendDt: '1',
                status:''
            },{
                orderId: '319668',
                name: '商户',
                userPh: '1552599999',
                moneyOd: 1767,
                orderTm: '2017-02-05 12:12:21',
                recommendMn:222,
                recommend:1,
                recommendCt: '2',
                recommendDt: '1',
                status:''
            },{
                orderId: '319668',
                name: '商户',
                userPh: '1552599999',
                moneyOd: 1767,
                orderTm: '2017-02-05 12:12:21',
                recommendMn:222,
                recommend:1,
                recommendCt: '2',
                recommendDt: '1',
                status:''
            },{
                orderId: '319668',
                name: '商户',
                userPh: '1552599999',
                moneyOd: 1767,
                orderTm: '2017-02-05 12:12:21',
                recommendMn:222,
                recommend:1,
                recommendCt: '2',
                recommendDt: '1',
                status:''
            },{
                orderId: '319668',
                name: '商户',
                userPh: '1552599999',
                moneyOd: 1767,
                orderTm: '2017-02-05 12:12:21',
                recommendMn:222,
                recommend:1,
                recommendCt: '2',
                recommendDt: '1',
                status:''
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

            var arr2=this.columns2;
            for(var i=0;i<arr2.length;i++){
                arr2[i]['width']=this.tbWidth;
            }
            this.columns2=arr2;
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
    methods: {
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
        changePage(page){
            this.pageChk=page;
            /*this.data1=this.*/
        },
        show(index){
            this.commendMn.commendMn='';
            this.commendMn.checkbox=[];
            this.model1=true;
        },
        countOk(name){
            this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                    return
                }
            })
        }    
    }
}
</script>
