<template>
  <div class="sections">
    <div class="pl_body">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="当月日还款统计" name="tab1">
                <repay v-bind:tabMsg="tabVal"></repay>
            </TabPane>
            <TabPane label="月还款统计" name="tab2">
                <repay v-bind:tabMsg="tabVal"></repay>
            </TabPane>
        </Tabs>
        
    </div>
    
  </div>
</template>

<script>
import repay from '../components/capitalProRepStatisList.vue';
export default {
  name: 'sections',
  components:{ repay },
  data () {
    return {
            tabSize:'default',
            tabVal:'tab1',
        }
    },
    created:function(){
    },
    methods: {  
    }
}
</script>
