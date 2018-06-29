<template>
  <div class="sections">
    <div class="pl_body">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="当月日放款统计" name="tab1">
                <loan v-bind:tabMsg="tabVal"></loan>
            </TabPane>
            <TabPane label="月放款统计" name="tab2">
                <loan v-bind:tabMsg="tabVal"></loan>
            </TabPane>
        </Tabs>
    </div>
    
  </div>
</template>

<script>
import loan from '../components/loanList.vue'

export default {
  name: 'sections',
  components:{ loan },
  data () {
    return {
        tbWidth:100,
        total:0,
        totalRecords:0,
        pageChk:1,
        vs:false,
        tabSize:'default',
        tabVal:'tab1'
        }
    },
    created:function(){
    },
    computed :{
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
