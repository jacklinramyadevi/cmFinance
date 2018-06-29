<template>
  <div>
    <Row class="form_row">
        <Col :sm="22" :xs="24">
            <Form :model="formSel" class="downMenu">
                <FormItem>
                    <Dropdown trigger="click" class="showMn" @on-click="showMenu" @on-visible-change="orShow">
                        <Button type="ghost" :class="{active:vs,chk:formSel.moneyGv!=''}">
                            资金提供方: <span v-text="formSel.moneyGv"></span>
                            <Icon type="arrow-down-b"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="中科诺" :selected="formSel.moneyGv=='中科诺'">中科诺</DropdownItem>
                            <DropdownItem name="华金" :selected="formSel.moneyGv=='华金'">华金</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormItem>
            </Form>
        </Col>
        <Col :sm="2" :xs="24"><div class="float_right">
            <Button type="success" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
        </div></Col>
    </Row>
	<div class="table_show">
    	<Table border :columns="columns1" :data="data1" ref="table"></Table>
    </div>
    
  </div>
</template>

<script>
import dataShow from '../router/moneyCount.js'

export default {
  props:['tabMsg'],
  data () {
    return {
        tbWidth:100,
        vs:false,
        formSel:{
            moneyGv:'中科诺'
        },
        columns1: [
        {
            title: '日期',
            key: 'planLtm',
            minWidth:104,
            fixed:'left'
        },
		{
            title: '应还笔数',
            key: 'repCount',
            minWidth:104
        },
        {
            title: '应还金额',
            key: 'dueRepAmount',
            minWidth:104
        },
        {
            title: '应还本金',
            key: 'planPrp',
            minWidth:104
        },
        {
            title: '应还利息',
            key: 'planInt',
            minWidth:104
        },
		{
            title: '实还笔数',
            key: 'realRepCount',
            minWidth:104
        },
        {
            title: '实还金额',
            key: 'realRepAmount',
            minWidth:104
        },
        {
            title: '实还本金',
            key: 'realPrp',
            minWidth:104
        },
        {
            title: '实还利息',
            key: 'realInt',
            minWidth:104
        }],
        data1: []
        }
    },
    created:function(){
        var detail='capitalPro=110205&statisticType=0';
        dataShow.financeRepay(detail,'detail/findCapitalProRepStatisHis',this);
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
    watch:{
        tabMsg:function(val){
            var type=0;
            if(val=='tab1'){
                this.columns1[0].title='日期';
                type=0;
            }else{
                this.columns1[0].title='月份';
                type=1;
            }
            var detail='capitalPro=110205&statisticType='+type;
            dataShow.financeRepay(detail,'detail/findCapitalProRepStatisHis',this);
        }
    },
    methods: {
        showMenu(val){
            if(val!=''){
                this.formSel.moneyGv=val;
                var pro='ZKN';
                var type=0;
                if(val=='华金'){
                    pro='HJZR';
                }
                if(this.tabMsg=='tab1'){
                    type=0;
                }else{
                    type=1;
                }
                var detail='capitalPro='+pro+'&statisticType='+type;
                dataShow.financeRepay(detail,'detail/findCapitalProRepStatisHis',this);
            }else{
                this.formSel.moneyGv='';
            }
        },
        orShow(visible){
            this.vs=visible;
        },
        dateChange(date){
            this.formSel.selectTm=date;
        },
        exportData () {
            var type=0;
            if(this.tabMsg=='tab1'){
                type=0;
            }else{
                type=1;
            }
            var pro='ZKN';
            if(this.formSel.moneyGv=='华金'){
                pro='HJZR';
            }
            window.open(this.$store.getters.httpUrl + '/export/exportCapitalProRepStatisHis?capitalPro='+pro+'&statisticType=' + type);
        },
        financeRepay(data){
            this.data1=[];
            
            if(data==null){
                return false;
            }
            if(data.content.length>0){
                for(var d in data.content){
                    var list=data.content[d];
                    var arr=list;
                    arr['dueRepAmount']=(list.dueRepAmount/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['planInt']=(list.planInt/100).toFixed(2);
					arr['realRepCount']=(list.realRepCount/100).toFixed(2);
                    arr['realRepAmount']=(list.realRepAmount/100).toFixed(2);
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
					arr['realInt']=(list.realInt/100).toFixed(2);
                    this.data1.push(arr);
                }
                if(data.total!=undefined){
                    var list = data.total;
					var arr = list;
                    arr['planLtm']='合计';
                    arr['dueRepAmount']=(list.dueRepAmount/100).toFixed(2);
                    arr['planPrp']=(list.planPrp/100).toFixed(2);
                    arr['planInt']=(list.planInt/100).toFixed(2);
					arr['realRepCount']=(list.realRepCount/100).toFixed(2);
                    arr['realRepAmount']=(list.realRepAmount/100).toFixed(2);
                    arr['realPrp']=(list.realPrp/100).toFixed(2);
					arr['realInt']=(list.realInt/100).toFixed(2);
                    
                    this.data1.push(arr);
                }
            }
        }
    }
}
</script>
