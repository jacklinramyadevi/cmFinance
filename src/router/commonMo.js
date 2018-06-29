import axios from 'axios';
import Vuex from 'vuex';
import cookie from '../router/cookie.js';
export default{
    login(detail,thisval,type){//登陆
        axios.get('/login'+'?'+detail,
            {
                withCredentials: true,
                xsrfCookieName: 'SESSION',
                headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode.toString() == '1' )  {
                if(thisval.$route.query.redirect!=undefined){
                    window.location.href=thisval.$route.query.redirect;
                }
                else{
                    thisval.$router.push({path:'/index'});
                }
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('登录异常');
        });
    },
    loginAuth(detail,thisval,type){//登陆
        axios.get('/users'+'?'+detail,
            {
                withCredentials: true,
                xsrfCookieName: 'SESSION',
                headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode.toString() == '1' )  {
                if(type=='menu'){
                    thisval.getMenu(resp.data.result.perm);
                    thisval.getSystem(resp.data.result.systems);
                }
                thisval.getuserInfo(resp.data.result.userInfo);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('登录异常');
        });
    },
    loginOut(detail,thisval,logoutHref){//退出登录
        axios.get('/logout'+'?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.resCode.toString() === '1' ) {
                thisval.$store.dispatch('delete_accessToken');
                thisval.$store.dispatch('delete_token');
                thisval.$store.dispatch('delete_userInfo');
                window.location.href=logoutHref;
            }else {
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('退出登录异常');
        });
    },
    getuserInfo(detail,thisval){//个人信息
        axios.get(
            // '/credit-mg/oauth2/getUserInfo?'+detail,
            "/users?" + detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.status.toString() == '200' )  {   
                // console.log(resp.data)
                thisval.getuserInfo(resp.data.result.userInfo);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
           
            thisval.$Message.warning('获取数据异常');
        });
    },
    updPassword(detail,thisval,token,accessToken){//修改密码
        axios({
            method: 'post',
            url: thisval.$store.getters.mngUrl +"/credit-mg/oauth2/changePasswordWithPassword?token=" + token+"&accessToken="+accessToken,
            data:detail,
            withCredentials: true
        }).then(function (response) {
            if(response.data.code.toString() == '200' ) {
                thisval.$Message.success(response.data.msg);
            }else {
                thisval.$Message.warning(response.data.msg);
            }
        }.bind(this)
        ).catch(function (error) {
            console.log(error)
            thisval.$Message.warning('修改异常');
        });
    },
    /*getMenu(detail,thisval){//系统菜单
        axios.get('/credit-mg/oauth2/getUserPermission?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.getMenu(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取数据异常');
        });
    },
    getSystem(detail,thisval){//获取system
        axios.get('/credit-mg/oauth2/listUserSystem?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.getSystem(resp.data.obj);
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('获取数据异常');
        });
    },*/
    changeAline(detail,thisval){//更改在线状态
        axios.put('/credit-mg/oauth2/changeIsAline?'+detail,
            {withCredentials: true, xsrfCookieName: 'SESSION',headers:{'Content-Type':'application/json'}
            }).then(function(resp){
            if(resp.data.code.toString() == '200' )  {
                thisval.$Message.success('修改状态成功');
            }else{
                thisval.$Message.warning(resp.data.msg);
            }
        }).catch(function(resp){
            thisval.$Message.warning('更改在线状态数据异常');
        });
    },
}