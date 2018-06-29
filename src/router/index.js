import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Vuex from 'vuex'
//import ZkTable from 'vue-table-with-tree-grid'

Vue.use(Router)
Vue.use(iview)
Vue.use(Vuex)
Vue.prototype.$ajax = axios
//Vue.use(ZkTable)
//axios.defaults.baseURL = '/manage'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: resolve => require(['../views/headers.vue'], resolve),
      children: [{
        path: '/userInfo',
        name:'0-0',
        component: resolve => require(['../views/userInfo.vue'], resolve)
      }, {
        path: '/index',
        name: '0',
        component: resolve => require(['../views/index.vue'], resolve)
      },
      {
        path:'/todayDetail',
        name: '1',
        component:resolve => require(['../views/todayDetail.vue'],resolve)
      },
	  {
        path:'/loanList_Month',
        name:'2',
        component:resolve => require(['../views/loanList_Month.vue'],resolve)
      },
      {
        path:'/financeShow',
        name: '3',
        component:resolve => require(['../views/financeShow.vue'],resolve)
      },
       {
        path: '/loan',
        name: '4-1',
        component: resolve => require(['../views/loan.vue'], resolve)
      }, {
        path: '/loanDetail',
        name: '4-2',
        component: resolve => require(['../views/loanDetail.vue'], resolve)
      },
	  {
        path:'/loanList',
        name:'4-3',
        component:resolve => require(['../views/loanList.vue'],resolve)
      },
      {
        path:'/loanList_detail',
        name:'4-4',
        component:resolve => require(['../views/loanList_detail.vue'],resolve)
      },
      /*{
        path: '/moneyOut',
        name: '4-1',
        component: resolve => require(['../views/moneyOut.vue'], resolve)
      },
      {
        path: '/moneyOut_detail',
        name: '4-2',
        component: resolve => require(['../views/moneyOut_detail.vue'], resolve)
      },
      {
        path: '/charge_refund',
        name: '4-3',
        component: resolve => require(['../views/charge_refund.vue'], resolve)
      },
      {
        path: '/refundList',
          name: '4-4',
        component: resolve => require(['../views/refundList.vue'], resolve)
      },*/
      {
        path: '/repayment',
        name: '5-1',
        component: resolve => require(['../views/repayment.vue'], resolve)
      },
      {
        path: '/repayOver_detail',
        name: '5-2',
        component: resolve => require(['../views/repayOver_detail.vue'], resolve)
      },
      /*{
        path: '/huajinOrderDelData',
        name: '4-5',
        component: resolve => require(['../views/huajinOrderDelData.vue'], resolve)
      },
      {
        path:'/repaymentNoLine_detail',
        name:'3-4',
        component:resolve => require(['../views/repaymentNoLine_detail.vue'],resolve)
      },*/
	  {
        path:'/repay',
        name:'5-3',
        component:resolve => require(['../views/repayList.vue'],resolve)
      },
	  {
        path:'/repayedCount',
        name:'5-4',
        component:resolve => require(['../views/repayedCount.vue'],resolve)
      },
      {
        path:'/repayedList',
        name:'5-5',
        component:resolve => require(['../views/repayedList.vue'],resolve)
      },
	  {
        path:'/repay_overdue',
        name:'5-6',
        component:resolve => require(['../views/repay_overdue.vue'],resolve)
      },
      {
        path:'/repay_overdueMonth',
        name:'5-7',
        component:resolve => require(['../views/repay_overdueMonth.vue'],resolve)
      },
      {
        path: '/compenstate',
        name: '6-1',
        component: resolve => require(['../views/compenstate.vue'], resolve)
      },
      {
        path: '/compenstate_detail',
        name: '6-2',
        component: resolve => require(['../views/compenstate_detail.vue'], resolve)
      },
	  {
        path:'/businessList',
        name:'7-1',
        component:resolve => require(['../views/businessList.vue'],resolve)
      },
      {
        path:'/fundsChk',
        name:'7-2',
        component:resolve => require(['../views/fundsChk.vue'],resolve)
      },
	  {
        path: '/capitalProRepStatis',
        name: '8-1',
        component: resolve => require(['../views/capitalProRepStatis.vue'], resolve)
      }, {
        path: '/capitalProRepStatisHis',
        name: '8-2',
        component: resolve => require(['../views/capitalProRepStatisHis.vue'], resolve)
      }, {
        path: '/capitalProRepStatisOfDetail',
        name: '8-3',
        component: resolve => require(['../views/capitalProRepStatisOfDetail.vue'], resolve)
      },
	  {
        path: '/huajinRepay',
        name: '8-4',
        component: resolve => require(['../views/huajinRepay.vue'], resolve)
      },
      {
        path: '/huajinRepayData',
        name: '8-5',
        component: resolve => require(['../views/huajinRepayData.vue'], resolve)
      },
	  {
        path:'/moneyCount',
        name:'9',
        component:resolve => require(['../views/moneyCount.vue'],resolve)
      },
	  {
        path:'/userBill',
          name:'10',
        component:resolve => require(['../views/userBill.vue'],resolve)
      },
      {
        path:'/userDetailBill',
          name:'10-1',
        component:resolve => require(['../views/userDetailBill.vue'],resolve)
      },
      /*{
        path:'/repayList',
        name:'8-1',
        component:resolve => require(['../views/repayList.vue'],resolve)
      },
      {
        path:'/repayedCount',
        name:'9-1',
        component:resolve => require(['../views/repayedCount.vue'],resolve)
      },
      {
        path:'/repayedList',
        name:'9-2',
        component:resolve => require(['../views/repayedList.vue'],resolve)
      },
      {
        path:'/repay_overdue',
        name:'10-1',
        component:resolve => require(['../views/repay_overdue.vue'],resolve)
      },
      {
        path:'/repay_overdueMonth',
        name:'10-2',
        component:resolve => require(['../views/repay_overdueMonth.vue'],resolve)
      },
      {
        path:'/businessList',
        name:'11-1',
        component:resolve => require(['../views/businessList.vue'],resolve)
      },
      {
        path:'/fundsChk',
        name:'11-2',
        component:resolve => require(['../views/fundsChk.vue'],resolve)
      },
      {
        path: '/capitalProRepStatis',
        name: '12-1',
        component: resolve => require(['../views/capitalProRepStatis.vue'], resolve)
      }, {
        path: '/capitalProRepStatisHis',
        name: '12-2',
        component: resolve => require(['../views/capitalProRepStatisHis.vue'], resolve)
      }, {
        path: '/capitalProRepStatisOfDetail',
        name: '12-3',
        component: resolve => require(['../views/capitalProRepStatisOfDetail.vue'], resolve)
      },
      {
        path:'/moneyCount',
        name:'13',
        component:resolve => require(['../views/moneyCount.vue'],resolve)
      },
      {
        path:'/userBill',
          name:'14',
        component:resolve => require(['../views/userBill.vue'],resolve)
      },
      {
        path:'/userDetailBill',
          name:'14-1',
        component:resolve => require(['../views/userDetailBill.vue'],resolve)
      },

      /*{
        path:'/windCtrBook',
        name:'4-3',
        component:resolve => require(['../views/windCtrBook.vue'],resolve)
      },
      {
        path:'/contractRp',
        name:'4-4',
        component:resolve => require(['../views/contractRp.vue'],resolve)
      },
      {
        path:'/huajinDetail',
        name:'4-5',
        component:resolve => require(['../views/huajinDetail.vue'],resolve)
      },
      {
        path:'/recommended',
        name:'5-1',
        component:resolve => require(['../views/recommended.vue'],resolve)
      },
      {
        path:'/recommended_detail',
        name:'5-2',
        component:resolve => require(['../views/recommended_detail.vue'],resolve)
      },*/
      /*{
        path: '/lenders',
        name: '7-1',
        component: resolve => require(['../views/lenders.vue'], resolve)
      },
      {
        path: '/repay_detail',
        name: '7-2',
        component: resolve => require(['../views/repay_detail.vue'], resolve)
      },
      {
        path: '/repayDetail',
        name: '7-3',
        component: resolve => require(['../views/repayDetail.vue'], resolve)
      },*/]
    },
    {
      path: '/loginAccess',
      component: resolve => require(['../views/loginAccess.vue'], resolve)
    },
    {
      path: '/logout',
      component: resolve => require(['../views/logout.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
