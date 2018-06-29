<template>
    <div>
        <Row class="form_row">
            <Col :sm="24" :xs="24"><div class="float_right">
                <Button type="success" @click="exportData"><Icon type="ios-download-outline"></Icon> 导出EXCEL</Button>
            </div></Col>
        </Row>
		<div class="table_show">
        	<Table border :columns="columns1" :data="data1" ref="table"></Table>
        </div>
    
    </div>
</template>

<script>
import dataShow from '../router/moneyCount.js';

export default {
    props:['tabMsg'],
  data () {
    return {
        tbWidth:100,
        columns1: [
        {
            title: '日期',
            key: 'date',
            minWidth:104,
            fixed:'left'
        },
        {
            title: '结清金额',
            key: 'clrAmount',
            minWidth:104
        },
        {
            title: '结清笔数',
            key: 'clrCount',
            minWidth:104
        },
        {
            title: '提前结清本金',
            key: 'advanceClrAmount',
            minWidth:104
        },
        {
            title: '提前结清利息',
            key: 'realInt',
            minWidth:104
        },
        {
            title: '提前结清服务费',
            key: 'realSfe',
            minWidth:104
        },
        {
            title: '提前结清违约金',
            key: 'realDfltAmount',
            minWidth:104
        },
        {
            title: '结清减免金额',
            key: 'clrReductionAmount',
            minWidth:104
        }],
        data1: []
        }
    },
    created:function(){
        dataShow.financeRepay('statisticType=0','detail/findAlreadyClrStatistic',this);
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
        tabMsg(val){
            var type=0;
            if(val=='tab1'){
                this.columns1[0].title='日期';
                type=0;
            }else{
                this.columns1[0].title='月份';
                type=1;
            }
            dataShow.financeRepay('statisticType='+type,'detail/findAlreadyClrStatistic',this);
        }
    },
    methods: {
        financeRepay(result){
            this.data1=[];
            if(result==null){
                return false;
            }
            if(result.content.length>0){
                for(var r in result.content){
                    var list=result.content[r];
                    var arr=list;
                    arr['clrAmount']=(list.clrAmount/100).toFixed(2);
                    arr['clrCount']=list.clrCount;
                    arr['advanceClrAmount']=(list.advanceClrAmount/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realDfltAmount']=(list.realDfltAmount/100).toFixed(2);
                    arr['clrReductionAmount']=list.clrReductionAmount==null?'0':(list.clrReductionAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
                if(result.total!=undefined){
                    var list=result.total;
                    var arr=list;
                    arr['date']='合计';
                    arr['clrAmount']=(list.clrAmount/100).toFixed(2);
                    arr['clrCount']=list.clrCount;
                    arr['advanceClrAmount']=(list.advanceClrAmount/100).toFixed(2);
                    arr['realInt']=(list.realInt/100).toFixed(2);
                    arr['realSfe']=(list.realSfe/100).toFixed(2);
                    arr['realDfltAmount']=(list.realDfltAmount/100).toFixed(2);
                    arr['clrReductionAmount']=list.clrReductionAmount==null?'0':(list.clrReductionAmount/100).toFixed(2);
                    this.data1.push(arr);
                }
            }
        },
        exportData () {
            var type=0;
            if(this.tabMsg=='tab1'){
                type=0;
            }else{
                type=1;
            }
            window.open(this.$store.getters.httpUrl + "/export/exportAlreadyClrStatistic?statisticType="+type);
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
