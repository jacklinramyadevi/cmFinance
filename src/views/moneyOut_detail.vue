<template>
  <div class="sections">
    <h1>扣款记录</h1>
    <div class="pl_body">
        <Row class="form_row">
            <Col :sm="22" :xs="24">
                <Form :model="formSel" class="downMenu">
                    <FormItem>
                        <Input style="display:none;"></Input>
                        <Input v-model="formSel.input" icon="ios-search" width="120" placeholder="借款编号/客户姓名/手机号" @on-enter=""></Input>
                        <Button type="primary" @click="">查询</Button>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                            <Button type="ghost" :class="{active:vs,chk:formSel.moneyWho!=''}">
                                资金提供方<span v-text="formSel.moneyWho"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.moneyWho=='全部'">全部</DropdownItem>
                                <DropdownItem name="华金" :selected="formSel.moneyWho=='华金'">华金</DropdownItem>
                                <DropdownItem name="中科诺" :selected="formSel.moneyWho=='中科诺'">中科诺</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown trigger="click" class="showMn" @on-click="showMenu1" @on-visible-change="orShow1">
                            <Button type="ghost" :class="{active:vs1,chk:formSel.selectTp!=''}">
                                扣款状态<span v-text="formSel.selectTp"></span>
                                <Icon type="arrow-down-b"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="全部" :selected="formSel.selectTp=='全部'">全部</DropdownItem>
                                <DropdownItem name="处理中" :selected="formSel.selectTp=='1'">处理中</DropdownItem>
                                <DropdownItem name="成功" :selected="formSel.selectTp=='2'">成功</DropdownItem>
                                <DropdownItem name="失败" :selected="formSel.selectTp=='3'">失败</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                         <Button v-if="formSel.input!='' || formSel.moneyWho!='' || formSel.selectTp!=''" @click="reset">重置</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col :sm="2" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
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

  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        vs:false,
        vs1:false,
        formSel:{
            input:'',
            moneyWho:'',
            selectTp:''
        },
        columns1: [
        {
            title: '客户姓名',
            key: 'name'
        },
        {
            title: '手机号码',
            key: 'userPh'
        },
        {
            title: '借款编号',
            key: 'userId'
        },
        {
            title: '借款时间',
            key: 'payTm',
            width:104
        },
        {
            title: '借款金额',
            key: 'moneyOd'
        },
        {
            title: '实际放款金额',
            key: 'moneyTu'
        },
        {
            title: '业务类型',
            key: 'bankTp'
        },
        {
            title: '商户法人',
            key: 'bankNm'
        },
        {
            title: '商户名称',
            key: 'nameBs'
        },
        {
            title: '资金提供方',
            key: 'moneyWho'
        },
        {
            title: '扣款金额',
            key: 'moneyOut'
        },
        {
            title: '扣款原因',
            key: 'outWhy'
        },
        {
            title: '扣款流水',
            key: 'outNo'
        },
        {
            title: '扣款时间',
            key: 'outTm',
            width:104
        },
        {
            title: '扣款平台',
            key: 'outPl'
        },
        {
            title: '平台流水号',
            key: 'comNo'
        },
        {
            title: '扣款状态',
            key: 'outStatus'
        },
        {
            title: '备注',
            key: 'outDesc'
        },],
        data1: []
        }
    },
    created:function(){
        if($(window).width()<768){
            var arr=this.columns1;
            for(var i=0;i<arr.length;i++){
                arr[i]['width']=this.tbWidth;
            }
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
                this.formSel.moneyWho=' : '+val;
            }else{
                this.formSel.moneyWho='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        showMenu1(val){
            if(val!='全部' && val!=''){
                this.formSel.selectTp=' : '+val;
            }else{
                this.formSel.selectTp='';
            }
        },
        orShow1(visible){
            this.vs1=visible;
        },
        exportData () {
            /*if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } else if (type === 3) {
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
        countOk(name){
            /*this.$refs[name].validate((valid) => {
                if(valid){

                }else{
                    this.$Message.error('表单验证失败!');
                }
            })*/
        },
        reset(){
            this.formSel={
                input:'',
                moneyWho:'',
                selectTp:''
            }
        }
    }
}
</script>
