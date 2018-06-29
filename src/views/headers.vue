<style scoped>
.ivu-menu-primary {
  background: #3950d4;
}
.layout {
  background: #f5f7f9;
}
.layout-logo {
  width: auto;
  height: 60px;
  line-height: 60px;
  float: left;
  margin-right: 10px;
  font-size: 1.8em;
}
.layout-nav {
  width: auto;
  float: right;
}
.ivu-col-span-3 {
  width: 200px;
}
.ivu-col-span-21 {
  width: calc(100% - 200px);
}
/* .topMenu{padding:0 20px;} */
.layout-content {
  width: 100%;
  min-height: 200px;
  overflow: hidden;
}
.layout-content-main {
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #fff;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
.topMenu.ivu-menu,
.topMenu a,
.topMenu .ivu-btn-text {
  color: #fff;
}
.topMenu .ivu-poptip-body a {
  color: #495060;
}
.layout-content .ivu-menu a {
  color: #666;
  padding: 14px 24px;
}
.layout-content li .ivu-menu a{color: #999;padding: 10px 0;}
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover {
  background: #3950d4;
  color: #3950d4;
}
.topMenu .ivu-menu-item a {
  color: #90a0fd;
}
.topMenu .ivu-menu-item-active a,
.topMenu .ivu-menu-item:hover a,
.topMenu .ivu-menu-submenu-active a,
.topMenu .ivu-menu-submenu:hover a {
  background: #3950d4;
  color: #fff;
}
.ivu-menu-vertical.ivu-menu-light:after {
  background: #fff;
}
.ivu-menu a {
  width: 100%;
  color: #fff;
  height: auto;
  display: inline-block;
}
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 0;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item a,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title a {
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.7);
}
/* .ivu-menu-vertical .ivu-menu-item{padding: 0 24px;} */
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  border: 0;
  background: #f5f5f5;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu)
  a {
  color: #3950d4;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item:not(.ivu-menu-submenu)
  a.router-link-active {
  color: #3950d4;
}
/* .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a {
  padding-left: 43px;
} */
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active a,
.ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-submenu
  .ivu-menu-item-active:hover
  a {
  color: #fff;
}
.layout-menu-left li .ivu-icon {
  margin-right: 8px;
}
.layout-menu-left .ivu-icon:before {
  content: "";
  float: left;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-index:before {
  background: url("../assets/icon_home.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-loan:before {
  background: url("../assets/icon_shanghufangkuan.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-order:before {
  background: url("../assets/icon_tixianfangkuan.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-freeze:before {
  background: url("../assets/icon_dongjiedingdan.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-close:before {
  background: url("../assets/icon_tuidanguanli.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-repay:before {
  background: url("../assets/icon_huankuanchuli.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-compenstate:before {
  background: url("../assets/icon_xinmeidaichang.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-recommend:before {
  background: url("../assets/icon_jianglitixian.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-fundsChk:before {
  background: url("../assets/icon_zijinhedui.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-agents:before {
  background: url("../assets/icon_qudaoguanli.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-todayDetail:before {
  background: url("../assets/tab_icon1.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left i.ivu-icon-loan:before {
  background: url("../assets/tab_icon2.png") no-repeat center;
  background-size: 14px 14px;
}
/* .layout-menu-left .ivu-icon-repay:before {
  background: url("../assets/tab_icon3.png") no-repeat center;
  background-size: 14px 14px;
} */
.layout-menu-left .ivu-icon-repayed:before,.layout-menu-left .ivu-icon-overdue:before {
  background: url("../assets/tab_icon4.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-moneyBusiness:before {
  background: url("../assets/tab_icon5.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-repayProvider:before {
  background: url("../assets/tab_icon6.png") no-repeat center;
  background-size: 14px 14px;
}

.layout-menu-left .ivu-icon-moneyCount:before {
  background: url("../assets/tab_icon8.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-loanList_Month:before {
  background: url("../assets/tab_icon8.png") no-repeat center;
  background-size: 14px 14px;
}

.layout-menu-left .ivu-icon-userBill:before {
  background: url("../assets/tab_icon9.png") no-repeat center;
  background-size: 14px 14px;
}

.layout-menu-left .ivu-icon-financeShow:before {
  background: url("../assets/tab_icon7.png") no-repeat center;
  background-size: 14px 14px;
}
.layout-menu-left .ivu-icon-capitalProRepStatis:before {
  background: url("../assets/tab_icon7.png") no-repeat center;
  background-size: 14px 14px;
}
.homePage{background:none;padding:0;margin:0;}
.userOp {
  width: auto;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  padding-left: 30px;
  padding-right: 15px;
}
.userImage {
  width: auto;
  height: 60px;
  float: left;
  padding: 10px 6px 0;
  overflow: hidden;
}
.userImage img {
  border: 0;
  width: 40px;
  height: 40px;
  border-radius: 50% 50%;
  -webkit-border-radius: 50% 50%;
  -moz-border-radius: 50% 50%;
  -o-border-radius: 50% 50%;
}
.btn_right {
  display: none;
}
.layout-content-main {
  border-radius: 0px;
}
.api a {
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #dfdfdf;
}
.api li:last-child a {
  border: 0;
}

@media (max-width: 768px) {
  .layout-logo {
    font-size: 18px;
  }
  .ivu-menu-submenu-title span > i,
  .ivu-menu-submenu-title > i {
    margin-right: 4px;
  }
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a {
    padding: 14px 24px;
  }
  .btn_right {
    display: block;
    float: right;
    padding: 0;
    color: #2d8cf0;
    padding: 14px 15px;
  }
  .btn_right .expand {
    background: url("../assets/close.png") no-repeat center;
    width: 20px;
    height: 32px;
    background-size: 20px 20px;
  }
  .btn_right .expand:before {
    content: "";
  }
  .topMenu .layout-nav,
  .topMenu .ivu-menu-item {
    clear: both;
    width: 100%;
    padding: 0;
  }
  .topMenu .layout-nav {
    position: absolute;
    top: 60px;
    z-index: 990;
    background-color: #fff;
    box-shadow: 0 0 3px #ccc;
  }
  .topMenu .layout-nav li {
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }
  .topMenu .api li {
    border-bottom: 0;
  }
  .topMenu .layout-nav {
    width: 100%;
    text-align: center;
  }
  .topMenu .userOp {
    padding-left: 0;
  }
  .topMenu a {
    width: auto;
    padding: 0 8px;
  }
  .topMenu .layout-nav .ivu-menu-item-active a,
  .topMenu .layout-nav .ivu-menu-submenu:hover a {
    border-bottom: 2px solid #3950d4;
  }
  .layout-content .ivu-col-span-3 {
    position: absolute;
    left: 0;
    z-index: 32;
  }
  .layout-content .ivu-col-span-21 {
    width: 100%;
  }
  .layout-menu-left {
    margin-left: -200px;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    border-bottom: 1px solid #ccc;
  }
  .topMenu.ivu-menu {
    color: #90a0fd;
  }
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active,
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover,
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu-active,
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover,
  .topMenu .ivu-menu-item-active a,
  .topMenu .ivu-menu-item:hover a,
  .topMenu .ivu-menu-submenu-active a,
  .topMenu .ivu-menu-submenu:hover a {
    background: #fff;
    color: #3950d4;
  }
}
</style>
<style>
@import "../css/style.css";
</style>
<template>
    <div class="headers">
        <div class="layout">
            <Menu mode="horizontal"
                ref="topMenu"
                class="topMenu"
                theme="primary"
                :active-name="showSystemid">
                <i-button type="text"
                    style="float:left;padding: 14px 15px;"
                    @click="toggleClick">
                    <Icon type="navicon"
                        size="32"></Icon>
                </i-button>
                <div class="layout-logo">
                    <router-link to="/index">信美分期财务系统</router-link>
                </div>
                <!-- <i-button type="text" class="btn_right" @click="show=!show">
                <Icon type="navicon" :class="{expand:show}" size="32"></Icon>
            </i-button> -->
                <!-- <transition name="fadeInDownBig">  -->
                <div class="layout-nav"
                    v-if="show">
                    <MenuItem :name="s.id"
                        v-for="(s,i) in systemList"
                        :key="s.id"
                        class="item1">
                    <a :href="s.url+'?token='+$store.getters.token"
                        v-text="s.remarks"></a>
                    </MenuItem>
                    <!-- <Menu-item name="1" class="item1"><a href="#" target="_bank">管理系统</a></Menu-item>
                    <Menu-item name="2" class="item2"><a href="#">业务监控系统</a></Menu-item>
                    <Menu-item name="3" class="item3"><a href="#">财务系统</a></Menu-item>
                    <Menu-item name="4" class="item4"><a href="#">风控系统</a></Menu-item>
                    <Menu-item name="5" class="item5"><a href="#">客服系统</a></Menu-item>
                    <Menu-item name="6" class="item6"><a href="#">催收系统</a></Menu-item> -->

                    <Poptip placement="bottom">
                        <div type="ghost"
                            class="userOp">
                            <div class="userImage"><img src="../assets/userImg.jpg"
                                    height="334"
                                    width="500" /></div>
                            <span v-text="userInfo.name"></span>
                        </div>
                        <ul class="api"
                            slot="content">
                            <li>
                                <router-link to="/userInfo">个人信息</router-link>
                            </li>
                            <li>
                                <router-link to="/logout">退出登录</router-link>
                            </li>
                        </ul>
                    </Poptip>
                </div>
                <!-- </transition> -->
            </Menu>
            <div class="layout-content"
                :class="{'layout-hide-text':spanLeft<3}">
                <Row type="flex">
                    <!-- :duration="{enter:1000,leave:3000}" -->
                    <transition name="fadeInLeft">
                        <i-col :span="spanLeft"
                            class="layout-menu-left">
                            <div @click="menuClick">
                                <Menu ref="activeMenu"
                                    :open-names="openName"
                                    :active-name="activeName"
                                    width="auto"
                                    accordion>

                                    <!-- <MenuItem name="0">
                        <router-link to="/index">
                            <Icon type="index" :size="iconSize"></Icon>
                            <span class="layout-text">首页</span>
                        </router-link>
                    </MenuItem> -->
                                    <li v-for="(m,index) in menus"
                                        :key="index"
                                        >
                                        <!-- 暂时隐藏 资金核对 菜单 -->
                                        <Submenu :name="m.id"
                                            v-if="m.children.length>0">
                                            <template slot="title">
                                                <Icon :type="m.icon"
                                                    :size="iconSize"></Icon>
                                                <span class="layout-text"
                                                    v-text="m.name"></span>
                                            </template>
                                            <MenuItem :name="c.parent.toString()"
                                                v-for="(c,idx) in m.children"
                                                :key="c.parent">
                                            <router-link :to="c.url"
                                                v-text="c.name"></router-link>
                                            </MenuItem>
                                        </Submenu>
                                        <MenuItem :name="m.id.toString()"
                                            v-else-if="m.children!=undefined">
                                        <router-link :to="m.url">
                                            <Icon :type="m.icon"
                                                :size="iconSize"></Icon>
                                            <span class="layout-text"
                                                v-text="m.name"></span>
                                        </router-link>
                                        </MenuItem>
                                    </li>

                                    <!-- <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-bussiness" :size="iconSize"></Icon>
                            <span class="layout-text">贷款结算</span>
                        </template>
                        <Menu-item name="1-1"><router-link to="/loan">贷款结算</router-link></Menu-item>
                        <Menu-item name="1-2"><router-link to="/loanDetail">贷款结算查询</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">提现放款</span>
                        </template>
                        <Menu-item name="2-1"><router-link to="/xianjing">现金贷结算</router-link></Menu-item>
                        <Menu-item name="2-2"><router-link to="/xianjing_detail">现金贷结算明细</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-freeze" :size="iconSize"></Icon>
                            <span class="layout-text">冻结订单</span>
                        </template>
                        <Menu-item name="3-1"><router-link to="/xiaofeiFr">已冻结消费贷</router-link></Menu-item>
                        <Menu-item name="3-2"><router-link to="/xianjinFr">已冻结现金贷</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-close" :size="iconSize"></Icon>
                            <span class="layout-text">退单管理</span>
                        </template>
                        <Menu-item name="2-1"><router-link to="/moneyOut">扣回放款</router-link></Menu-item>
                        <Menu-item name="2-2"><router-link to="/moneyOut_detail">扣款记录</router-link></Menu-item>
                        <Menu-item name="2-3"><router-link to="/charge_refund">退服务费</router-link></Menu-item>
                      <Menu-item name="4-4"><router-link to="/orderDeled">已取消订单</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-repay" :size="iconSize"></Icon>
                            <span class="layout-text">还款处理</span>
                        </template>
                        <Menu-item name="3-1"><router-link to="/repayment">还款处理</router-link></Menu-item>
                        <Menu-item name="3-2"><router-link to="/repayOver_detail">还款明细</router-link></Menu-item>
                        <Menu-item name="3-3"><router-link to="/huajinRepay">华金还款处理</router-link></Menu-item>
                        <Menu-item name="3-4"><router-link to="/huajinRepayData">华金还款明细</router-link></Menu-item>
                        <Menu-item name="3-5"><router-link to="/huajinOrderDelData">华金退单明细</router-link></Menu-item>
                        <Menu-item name="5-4"><router-link to="/repaymentNoLine_detail">线下还款查询</router-link></Menu-item>
                        <Menu-item name="5-5"><router-link to="/repayment_detail">按期还款明细表</router-link></Menu-item>
                        <Menu-item name="5-6"><router-link to="/repay_detail">还款汇总表</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-compenstate" :size="iconSize"></Icon>
                            <span class="layout-text">信美代偿</span>
                        </template>
                        <Menu-item name="4-1"><router-link to="/compenstate">代偿处理</router-link></Menu-item>
                        <Menu-item name="4-2"><router-link to="/compenstate_detail">代偿记录</router-link></Menu-item>
                        <Menu-item name="4-3"><router-link to="/windCtrBook">风控确认书</router-link></Menu-item>
                        <Menu-item name="4-4"><router-link to="/contractRp">借款合同</router-link></Menu-item>
                        <Menu-item name="4-5"><router-link to="/huajinDetail">华金数据传输记录</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-recommend" :size="iconSize"></Icon>
                            <span class="layout-text">APP奖励提现</span>
                        </template>
                        <Menu-item name="5-1"><router-link to="/recommended">推荐奖励审批</router-link></Menu-item>
                        <Menu-item name="5-2"><router-link to="/recommended_detail">推荐奖励记录</router-link></Menu-item>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="ios-fundsChk" :size="iconSize"></Icon>
                            <span class="layout-text">资金核对</span>
                        </template>
                        <Menu-item name="6-1"><router-link to="/lenders">放贷明细表</router-link></Menu-item>
                        <Menu-item name="6-2"><router-link to="/repay_detail">还款汇总表</router-link></Menu-item>
                        <Menu-item name="6-3"><router-link to="/fundsChk">资金核对表</router-link></Menu-item>
                        <Menu-item name="6-4"><router-link to="/repayDetail">借款汇总表</router-link></Menu-item>
                        <Menu-item name="6-5"><router-link to="/fundsChk">回款汇总表</router-link></Menu-item>
                        <Menu-item name="6-6"><router-link to="/huajinRepayDetail">华金借款核对表</router-link></Menu-item>
                        <Menu-item name="6-7"><router-link to="/fundsChk">华金回款核对表</router-link></Menu-item>
                    </Submenu> -->
                                    <Submenu name="7"
                                        v-if="!show">
                                        <template slot="title">
                                            <Icon type="ios-close"
                                                :size="iconSize"></Icon>
                                            <span class="layout-text">系统管理</span>
                                        </template>

                                        <MenuItem :name="'7-'+i"
                                            v-for="(s,i) in systemList"
                                            :key="i"
                                            class="item1">
                                        <a :href="s.url"
                                            v-text="s.remarks"></a>
                                        </MenuItem>
                                        <!-- <MenuItem name="7-1" class="item1"><a href="#">管理系统</a></MenuItem>
                        <MenuItem name="7-2" class="item2"><a href="#">业务监控系统</a></MenuItem>
                        <MenuItem name="7-3" class="item3 ivu-menu-item-active"><a href="#" class="">财务系统</a></MenuItem>
                        <MenuItem name="7-4" class="item4"><a href="#">风控系统</a></MenuItem>
                        <MenuItem name="7-5" class="item5"><a href="#">客服系统</a></MenuItem>
                        <MenuItem name="7-6" class="item6"><a href="#">催收系统</a></MenuItem> -->
                                    </Submenu>
                                </Menu>

                                <ul class="api mobile_api"
                                    v-if="!show">
                                    <li>
                                        <router-link to="/userInfo">个人信息</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/logout">退出登录</router-link>
                                    </li>
                                </ul>
                            </div>
                        </i-col>
                    </transition>
                    <i-col :span="spanRight"
                        class="layout-right">
                        <div class="layout-content-main"
                            @click="closeShow" :class="{ homePage:isClass }">
                            <router-view></router-view>
                        </div>
                        <div class="layout-copy">
                            2016-2018 &copy; 信美分期
                        </div>
                    </i-col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import '../router/jquery-1.11.3.min.js'
import swipe from '../router/jquery.touchwipe.js'
import cookie from '../router/cookie.js'
import showData from '../router/commonMo.js'

export default {
    name: 'headers',
    data () {
        return {
            showSystemid: null,
            spanLeft: 3,
            spanRight: 21,
            show: false,
            timer: true,
            userInfo: {},
            menus: [],
            systemList: [],
            systemId: 4,
            /*screnWidth:document.body.clientWidth,*/
            screnHeight: window.innerHeight - 62 || document.documentElement.clientHeight - 62 || document.body.clientHeight - 62,
            routeName: '',
            activeName: 0 || '',
            openName: [],
            isClass:false
        }
    },
    created () {
        this.routeName = this.$route.name;
        if(this.$route.path=='/todayDetail' || this.$route.path=='/financeShow'){
          this.isClass=true;
        }else{
          this.isClass=false;
        }
        let accessToken = this.$store.getters.accessToken;
	      let href = window.location.search;
        // let token = href.substring(href.indexOf("token") + 5);
        // let end = token.length;
        let token = ''
        if (href.indexOf('?') >= 0) {
            let str = href.substr(1);
            let hrefArr = [];
            hrefArr = str.split('&')
            for (let h in hrefArr) {
            let r = hrefArr[h].split('=')
            if (r[0] === 'token') {
                this.$store.dispatch('edit_token', r[1]);
                token = r[1]
            }
            }
        }
        //let token='64c394f8-6f58-4778-849e-ed0d6fe81a87';
        //把token获取传递到后台，后台需要token获取accessToken
        showData.loginAuth('token='+ token + '&accessToken=' + accessToken, this, 'menu');
    },
    mounted () {
        var height = window.innerHeight - 62 || document.documentElement.clientHeight - 62 || document.body.clientHeight - 62;
        /*var height1=Math.max(window.innerHeight-62,document.documentElement.clientHeight-62,document.body.clientHeight-62)*/
        $('.layout-menu-left').css('minHeight', height);
        $('.layout-content-main').css('minHeight', height - 68);

        if (window.innerWidth >= 768) {
            this.show = true;
        } else {
            $('.layout-right').touchwipe({
                wipeLeft: function () {
                    if ($('.layout-menu-left').hasClass('expand')) {
                        $('.layout-menu-left').animate({ 'marginLeft': -200 }, 500);
                        $('.layout-right').animate({ 'marginLeft': 0 }, 500);
                        $('.layout-menu-left').removeClass('expand');
                    }
                },
                min_move_x: 10,
                preventDefaultEvents: false
            })
        }

        window.onresize = function () {
            if (window.innerHeight) {
                this.screnHeight = window.innerHeight - 62;
            }
            else if ((document.body) && (document.body.clientHeight)) {
                this.screnHeight = document.body.clientHeight - 62;
            }
            $('.layout-menu-left').css('minHeight', this.screnHeight);
            $('.layout-content-main').css('minHeight', this.screnHeight - 68);
        }
    },
    computed: {
        iconSize () {
            return this.spanLeft === 3 ? 14 : 24;
        }
    },
    watch: {
        routeName: function (newValue, oldValue) {
            if (window.innerWidth < 768) {
                if (newValue != oldValue) {
                    this.expentMenu();
                }
            }
        },
        '$route': function (val) {
            if(val.path=='/todayDetail' || val.path=='/financeShow'){
              this.isClass=true;
            }else{
              this.isClass=false;
            }
            this.routeName = val.name;
            let that = this;
            this.$nextTick(function () {
                that.getRoute();
            });
        },
        show: function (val) {
            if (val) {
                this.$nextTick(function () {
                    var height = window.innerHeight - 62 || document.documentElement.clientHeight - 62 || document.body.clientHeight - 62;
                    $('.topMenu li').eq(this.selActive - 1).addClass('ivu-menu-item-active');
                    if (window.innerWidth < 768) {
                        $('.topMenu .layout-nav').css('minHeight', height + 2);
                        $('body').css('overflow', 'hidden');
                    }
                });
            } else {
                $('body').css('overflow', 'auto');
            }
        }
    },
    methods: {
        getRoute () {
            if (this.routeName.toString().indexOf('-') >= 0) {
                var name = this.routeName.split('-');
                var a = [];
                a[0] = parseInt(name[0]);
                this.openName = [a[0]];
                this.activeName = this.routeName;
            } else {
                this.activeName = (this.routeName).toString();
            }
            this.$nextTick(function () {
                this.$refs.topMenu.updateActiveName();
                this.$refs.activeMenu.updateOpened();
            });
        },
        getMenu (list) {
            this.menus = [{ id: 0, name: '首页', url: '/index', icon: 'index', children: [] }];
            let that = this;
            let menuName = 0;
            if (list.length > 0 || list != undefined) {
                for (var l in list) {
                    if (list[l].name != '个人信息') {
                        if (list[l].type == 'memu' && list[l].parentId == null) {
                            menuName++;
                            var menu = {};
                            menu['id'] = menuName;
                            menu['name'] = list[l].name;
                            menu['url'] = list[l].url;
                            var urlArr = list[l].url.split('/');
                            menu['icon'] = urlArr[urlArr.length - 1];
                            menu['children'] = [];
                            let menuIndex = 0;
                            for (var i in list) {
                                if (list[l].id == list[i].parentId) {
                                    menuIndex++;
                                    var children = {};
                                    //children['id']=list[i].id;
                                    children['parent'] = menuName + '-' + menuIndex;
                                    children['name'] = list[i].name;
                                    children['url'] = list[i].url;
                                    //children['parentId']=list[i].parentId;
                                    menu['children'].push(children);
                                }
                            }
                            this.menus.push(menu);
                        }
                    }
                }
                this.$nextTick(function () {
                    that.getRoute();
                });
            }
        },
        getuserInfo (userInfo) {
            if (userInfo != undefined) {
                this.userInfo = userInfo;
                this.$store.dispatch("edit_userInfo", { id: userInfo.id, name: userInfo.name });
            }
        },
        getSystem (list) {
            if (list != undefined) {
                this.systemList = list;
                this.showSystemid = this.systemList[2].id;
                this.$nextTick(function () {
                    this.$refs.topMenu.updateActiveName();
                })
            }
        },
        expentMenu () {
            $('.layout-menu-left').animate({ 'marginLeft': -200 }, 500);
            $('.layout-right').animate({ 'marginLeft': 0 }, 500);
            $('.layout-menu-left').removeClass('expand');
        },
        toggleClick () {
            if ($(window).width() >= 768) {
                if (this.spanLeft === 3) {
                    this.spanLeft = 1;
                    this.spanRight = 23;
                    $('.ivu-menu-opened .ivu-menu').hide();
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                    $('.ivu-menu-opened .ivu-menu').show();
                }
            } else {
                if (!$('.layout-menu-left').hasClass('expand')) {
                    this.show = false;
                    $('.layout-menu-left').animate({ 'marginLeft': 0 }, 500);
                    $('.layout-right').animate({ 'marginLeft': 200 }, 500);
                    $('.layout-menu-left').css('height', $('.layout-right').height());
                    $('.layout-menu-left').addClass('expand');
                } else {
                    this.expentMenu();
                }
            }
        },
        expentMenu () {
            $('.layout-menu-left').animate({ 'marginLeft': -200 }, 500);
            $('.layout-right').animate({ 'marginLeft': 0 }, 500);
            $('.layout-menu-left').removeClass('expand');
        },
        menuClick () {
            if (this.spanLeft === 1) {
                this.toggleClick();
                return false;
            }
        },
        closeShow () {
            if ($(window).width() < 768) {
                if (this.show) {
                    this.show = false;
                }
                if ($('.layout-menu-left').hasClass('expand')) {
                    this.toggleClick();
                }
            }
        }/*,
        logOut(){
            var that = this;
            $.ajax({
                url : "/user/logout",
                type : "get",
                cache : false,
                dataType : "json",
                xhrFields: {
                    withCredentials: true
                },
                data : {
                },
                success : function(data) {
                    if(data.resCode == 1){
                        that.$router.push({path:'login'});
                    }
                }
            });
        }*/
    }
}
</script>
<style>
.layout-hide-text .ivu-menu-vertical .ivu-menu-submenu-title-icon {
  display: none;
}
</style>

