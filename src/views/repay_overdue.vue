
<template>
    <div class="sections">
        <div class="pl_body">
            <Tabs class="tabs" :size="tabSize" v-model="tabVal">
                <TabPane label="最大逾期天数" name="tab1">
                    <overdue v-bind:tabMsg="tabVal"></overdue>
                </TabPane>
                <TabPane label="分期逾期天数" name="tab2">
                    <overdue v-bind:tabMsg="tabVal"></overdue>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import overdue from '../components/repay_overdue.vue'

export default {
  name: 'sections',
  components:{ overdue },
  data () {
    return {
        tabVal:'tab1',
        tabSize:'default',
    }
    },
    created:function(){
    },
    computed :{
    },
    methods: {
        
    }
}
</script>
