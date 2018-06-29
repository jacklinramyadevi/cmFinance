<template></template>
<script>
import showData from '../router/commonMo.js';
import cookie from '../router/cookie.js';

export default {
        created:function(){
                var token=this.$store.getters.accessToken;
                
                var logoutHref=this.$store.getters.mngUrl+'/login';                            
                if(token==='null' || token===''){
                        window.location.href=logoutHref;
                }else{
                        var detail='accessToken='+token;
        	       showData.loginOut(detail,this,logoutHref);
                }
        }
}
</script>