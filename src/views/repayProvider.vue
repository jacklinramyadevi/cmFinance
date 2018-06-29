<template>
  <div class="sections">
    <div class="pl_body">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="当日月还款统计" name="tab1">
                <Row class="form_row">
                    <Col :sm="22" :xs="24">
                        <Form :model="formSel" class="downMenu">
                            <FormItem>
                                <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                                    <Button type="ghost" :class="{active:vs,chk:formSel.moneyGv!=''}">
                                        资金提供方<span v-text="formSel.moneyGv"></span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                        <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                                        <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
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
                	<Table boder :columns="columns1" :data="data1" ref="table"></Table>
                </div>
                <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" show-elevator :current="pageChk" @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" simple :current="pageChk" @on-change="changePage"></Page>
            </TabPane>
            <TabPane label="当月还款统计" name="tab2">
                <Row class="form_row">
                    <Col :sm="22" :xs="24">
                        <Form :model="formSel" class="downMenu">
                            <FormItem>
                                <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                                    <Button type="ghost" :class="{active:vs,chk:formSel.moneyGv!=''}">
                                        资金提供方<span v-text="formSel.moneyGv"></span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="全部" :selected="formSel.moneyGv=='全部'">全部</DropdownItem>
                                        <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                                        <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
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
                    <Table border :columns="columns1" :data="data1" ref="table"></Table>
                </div>
                <Row :gutter="16" v-if="pageWin>=768">
                    <Col :sm="5" :xs="24">
                        <div class="total">共{{total}}页</div>
                    </Col>
                    <Col :sm="19" :xs="24" class="txt_right">
                        <Page :total="totalRecords" show-elevator :current="pageChk" @on-change="changePage"></Page>
                    </Col>
                </Row>
                <Page v-else :total="totalRecords" simple :current="pageChk" @on-change="changePage"></Page>
            </TabPane>
        </Tabs>
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
        formSel:{
            moneyGv:''
        },
        columns1: [
        {
            title: '日期',
            key: 'nameBs',
            minWidth:104,
            fixed:'left'
        },
        {
            title: '应还笔数',
            key: 'typeBs',
            minWidth:104
        },
        {
            title: '应还金额',
            key: 'applyNm',
            minWidth:104
        },
        {
            title: '应还本金',
            key: 'applyPh',
            minWidth:104
        },
        {
            title: '应还利息',
            key: 'name',
            minWidth:104
        }],
        data1: [{
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
            },
            {
                nameBs: '319668',
                typeBs: '商户',
                applyNm:'fgfg',
                applyPh:'134445333',
                name: '张一河'
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
