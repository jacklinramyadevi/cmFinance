import Vue from 'vue'
import Vuex from 'vuex'
import showData from '../router/cookie.js'

Vue.use(Vuex)

const state= {
     //httpUrl:'http://localhost:8091/manage',
    httpUrl:'http://test.finance.creditmate.cn/manage',
    mngUrl:'http://test.mng.creditmate.cn',//管理系统地址
    accessToken:showData.getCookie("accessToken"),
    userInfo:{id:showData.getCookie("id"),name:showData.getCookie("name")},
    custId:showData.getCookie("id"),
    custName:showData.getCookie("name"),
    token:showData.getCookie("token")
}

const getters= {
    httpUrl:(state) => state.httpUrl,
    mngUrl:(state) => state.mngUrl,
    accessToken:(state) => state.accessToken,
    userInfo:(state) => {return {id:showData.getCookie("id"),name:showData.getCookie("name")}},
    custId:(state) => state.custId,
    custName:(state) => state.custName,
    token:(state) => state.token
    
}

const actions = {
    add_httpUrl({commit}) {
        return commit('ADD_HTTPURL');
    },
    delete_httpUrl({commit}) {
        return commit('DELETE_HTTPURL');
    },
    edit_httpUrl({commit}, httpUrl) {
        return commit('EDIT_HTTPURL', accessToken);
    },
    add_accessToken({commit}) {
        return commit('ADD_ACCESSTOKEN');
    },
    delete_accessToken({commit}) {
        return commit('DELETE_ACCESSTOKEN');
    },
    edit_accessToken({commit}, accessToken) {
        return commit('EDIT_ACCESSTOKEN', accessToken);
    },
    add_userInfo({commit}) {
        return commit('ADD_USERINFO');
    },
    delete_userInfo({commit}) {
        return commit('DELETE_USERINFO');
    },
    edit_userInfo({commit}, userInfo) {
        return commit('EDIT_USERINFO', userInfo);
    },
    add_custId({commit}) {
        return commit('ADD_CUSTID');
    },
    delete_custId({commit}) {
        return commit('DELETE_CUSTID');
    },
    edit_custId({commit}, custId) {
        return commit('EDIT_CUSTID', custId);
    },
    add_custName({commit}) {
        return commit('ADD_CUSTNAME');
    },
    delete_custName({commit}) {
        return commit('DELETE_CUSTNAME');
    },
    edit_custName({commit}, custName) {
        return commit('EDIT_CUSTNAME', custName);
    },
    delete_token ({commit}) {
        return commit('DELETE_TOKEN');
      },
    edit_token ({commit}, token) {
        return commit('EDIT_TOKEN', token);
    },
}

const mutations = {

    ADD_HTTPURL(state) {
        state.httpUrl=state.httpUrl;
    },
    DELETE_HTTPURL(state) {
        state.httpUrl = '';
    },
    EDIT_HTTPURL(state, httpUrl) {
        state.httpUrl=httpUrl;
    },
    ADD_ACCESSTOKEN(state) {
        //根据id判断是否为同一个note
        /*const noteid = Math.round(Math.random()*10000);
        const note = {
            id: noteid,
            token: '',
        }*/
        state.accessToken=showData.getCookie("accessToken");
        /*if(state.notes.length == 1) {
            state.activeNote = state.notes[0];
        }*/
        //console.log(state.token);
    },
    DELETE_ACCESSTOKEN(state) {
        showData.clearCookie("accessToken");
        state.accessToken = '';
        /*for(let key in notes) {
            if(notes[key].id == state.activeNote.id) {
                state.notes.splice(key, 1);
            }
        }
        if(state.notes.length != 0)
            state.activeNote = state.notes[0];
        else
            state.activeNote = {}*/
    },
    EDIT_ACCESSTOKEN(state, accessToken) {
        /*state.activeNote.token = token;
        for(let i in state.notes) {
            if(i == state.activeNote) {
                i.token = token;
            }
        }*/
        state.accessToken=showData.setCookie("accessToken",accessToken,20);
        state.accessToken=accessToken;
    },
    ADD_USERINFO(state) {
        state.userInfo={
            custId:showData.getCookie("id"),
            custName:showData.getCookie("name")
        };
    },
    DELETE_USERINFO(state) {
        state.userInfo = {};
        showData.clearCookie("id");
        showData.clearCookie("name");
    },
    EDIT_USERINFO(state, userInfo) {
        state.userInfo=userInfo;
        showData.setCookie("id",userInfo.id,20);
        showData.setCookie("name",userInfo.name,20);
    },
    ADD_CUSTID(state) {
        showData.setCookie("id",showData.getCookie("id"),20);
        state.custId=showData.getCookie("id");
    },
    DELETE_CUSTID(state) {
        showData.clearCookie("id");
        state.custId = '';
    },
    EDIT_CUSTID(state, custId) {
        showData.setCookie("id",custId,20);
        state.custId=custId;
    },
    ADD_CUSTNAME(state) {
        showData.setCookie("name",showData.getCookie("name"),20);
        state.custName=showData.getCookie("name");
    },
    DELETE_CUSTNAME(state) {
        showData.clearCookie("name");
        state.custName = '';
    },
    EDIT_CUSTNAME(state, custName) {
        showData.setCookie("name",custName,20);
        state.custName=custName;
    },
    DELETE_TOKEN (state) {
        showData.clearCookie('token');
        state.token = '';
      },
    EDIT_TOKEN (state, token) {
        showData.setCookie('token', token, 2);
        state.token = token;
    },
}


export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})