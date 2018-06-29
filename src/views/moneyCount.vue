<template>
  <div class="sections">
      <div class="pl_body">
        <Tabs class="tabs" :size="tabSize" v-model="tabVal">
            <TabPane label="当月日测算" name="tab1">
                <money v-bind:tabMsg="tabVal"></money>
            </TabPane>
            <TabPane label="月测算" name="tab2">
                <money v-bind:tabMsg="tabVal"></money>
            </TabPane>
        </Tabs>
    </div>
    

  </div>
</template>

<script>
import money from '../components/moneyCount.vue'

export default {
  name: 'sections',
  components:{ money },
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
