<style scoped>
.index img{width:100%;height:auto;}
</style>

<template>
  <div class="index">
    <img v-if="pageWin>=768" src="../assets/login_huanyingye.jpg"/>
    <img v-else src="../assets/mblLogin_bg2.png"/>
  </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
        }
    },
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    }
}
</script>
