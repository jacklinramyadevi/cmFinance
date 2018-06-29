<template>
  <div class="sections">
    <h1>风控确认书</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input v-model="formSel.input" icon="ios-search" placeholder="风控确认书ID"></Input>
                        <Button type="primary" @click="">查询</Button>
                        <DatePicker :value="formSel.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择开始时间 — 结束时间" @on-change="dateChange"></DatePicker>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="show(1)"> 导入风控确认书</Button>
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

    <Modal v-model="model1" title="上传风控确定书" okText="确定上传" class="" width="600">
         <Form :model="formFr" :label-width="80">
            <FormItem>
                <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/" >
                    <Button type="ghost" icon="android-add">选择文件</Button>
                </Upload>
            </FormItem>
            <FormItem label="选择日期">
                <Date-picker :value="formFr.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择开始时间 — 结束时间" @on-change="dateChange"></Date-picker>
            </FormItem>
            <FormItem label="借款期限">
                <Select v-model="formFr.selectBs">
                    <Option value="1个月">1个月</Option>
                    <Option value="3个月">3个月</Option>
                    <Option value="6个月">6个月</Option>
                    <Option value="9个月">9个月</Option>
                    <Option value="12个月">12个月</Option>
                    <Option value="18个月">18个月</Option>
                    <Option value="24个月">24个月</Option>
                </Select>
            </FormItem>
         </Form>
    </Modal>
    <Modal v-model="model2" title="上传风控确定书" okText="确定修改" class="" width="600">
         <Form :model="formWind" :label-width="90">
            <FormItem label="风控确定书ID">
                <span>499310</span>
            </FormItem>
            <FormItem label="选择日期">
                <Date-picker :value="formWind.selectTm" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="选择开始时间 — 结束时间" @on-change="dateChange"></Date-picker>
            </FormItem>
            <FormItem label="借款期限">
                <Select v-model="formWind.selectBs">
                    <Option value="1个月">1个月</Option>
                    <Option value="3个月">3个月</Option>
                    <Option value="6个月">6个月</Option>
                    <Option value="9个月">9个月</Option>
                    <Option value="12个月">12个月</Option>
                    <Option value="18个月">18个月</Option>
                    <Option value="24个月">24个月</Option>
                </Select>
            </FormItem>
            <FormItem label="是否有效">
                <Select v-model="formWind.selectTr">
                    <Option value="有效">有效</Option>
                    <Option value="无效">无效</Option>
                </Select>
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
        model1:false,
        model2:false,
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        formSel:{
            input:'',
            selectTm:''
        },
        formFr:{
            file:'',
            selectTm:'',
            selectBs:'1个月'
        },
        formWind:{
            selectTm:'',
            selectBs:'1个月',
            selectTr:'有效'
        },
        columns1: [{
            title: '风控确认书ID',
            key: 'userId'
        },
        {
            title: '开始时间',
            key: 'name',
            width:104
        },
        {
            title: '结束时间',
            key: 'phone',
            width:104
        },
        {
            title: '借款期限',
            key: 'moneyIn'
        },
        {
            title: '是否有效',
            key: 'moneyFirst'
        },
        {
            title: '上传人',
            key: 'moneyNo'
        },
        {
            title: '上传时间',
            key: 'typeBs',
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
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.show(2,params.index);
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            size: 'small',
                            type:'primary'
                        },
                        style: {
                            marginLeft:'4px'
                        },
                        on: {
                            click: () => {
                                
                            }
                        }
                    }, '下载')
                ]);
            }
        }],
        data1: [{
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            },
            {
                userId: '319668',
                name: '1352666548',
                phone: '商户',
                moneyIn: '2699',
                moneyFirst:233,
                moneyNo:333,
                typeBs: '商户'
            }]
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length-1;i++){
                arr[i]['width']=this.tbWidth;
            }
            arr[arr.length-1]['width']=110;
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
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData () {

        },
        changePage(page){
            this.pageChk=page;
            /*this.data1=this.*/
        },
        show(id,index){
            if(id==1){
                this.formFr.file='';
                this.formFr.selectTm='';
                this.formFr.selectBs='1个月';
                this.model1=true;
            }else{
                this.formFr.selectTm='';
                this.formFr.selectBs='1个月';
                this.formFr.selectTr='有效';
                this.model2=true;
            }
        },
        handleUpload(file){
            this.formFr.file=file;
            return false;
        },
        handleSubmit(name){
            /*this.$refs[name].validate((valid) => {
                if(valid){
                    
                }else{
                    this.$Message.error('表单验证失败!');
                }
            })*/
        },
        handleColse(name){
            /*this.$refs[name].resetFields();*/
        }   
    }
}
</script>
