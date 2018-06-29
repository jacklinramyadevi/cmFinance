<template>
  <div class="sections">
    <div class="pl_body">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="当月日结清统计" name="tab1">
                <repayed v-bind:tabMsg="tabVal"></repayed>
            </TabPane>
            <TabPane label="月结清统计" name="tab2">
                <repayed v-bind:tabMsg="tabVal"></repayed>
            </TabPane>
        </Tabs>
    </div>
    
  </div>
</template>

<script>
import repayed from '../components/repayedCount.vue'

export default {
  name: 'sections',
  components:{ repayed },
  data () {
    return {
        tabVal:'tab1',
        tabSize:'default',
        }
    },
    created:function(){
    },
    methods: {   
    }
}
</script>
