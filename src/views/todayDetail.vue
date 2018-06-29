
<template>
    <div class="sections">
        <div class="titleShow">
            <h1>财务总览</h1>
        </div>
        <div class="pl_body todayDetail">
            <h1 class="title">放款</h1>
            <Row :gutter="16" class="loanDetail">
                <Col :sm="8" :xs="24">
                    <div class="">
                        <img src="../assets/total_card1.png"/>
                        <p>放款金额</p>
                        <h1>{{loanMoney}}</h1>
                    </div>
                </Col>
                <Col :sm="8" :xs="24">
                    <div class="">
                        <img src="../assets/total_card2.png"/>
                        <p>放款笔数</p>
                        <h1>{{loanCount}}</h1>
                    </div>
                </Col>
            </Row>

            <h1 class="title">还款</h1>
            <Row :gutter="16" class="repayCount">
                <Col :sm="12" :xs="24">
                    <div class="">
                        <p>还款总金额</p>
                        <h1>{{repayMoney}}<span>元</span></h1>
                    </div>
                </Col>
                <Col :sm="12" :xs="24">
                    <div class="">
                        <p>还款总笔数</p>
                        <h1>{{repayCount}}<span>笔</span></h1>
                    </div>
                </Col>
            </Row>
            <div class="repayDetail">
                <Row :gutter="16">
                    <Col :sm="6" :xs="24">
                        <div class="first">
                            <h1>{{onlineMoney}}<span>元</span></h1>
                            <p>线上还款金额</p>
                        </div>
                    </Col>
                    <Col :sm="6" :xs="24">
                        <div class="second">
                            <h1>{{onlineCount}}<span>人</span></h1>
                            <p>线上还款笔数</p>
                        </div>
                    </Col>
                    <Col :sm="6" :xs="24">
                        <div class="third">
                            <h1>{{offlineMoney}}<span>元</span></h1>
                            <p>线下还款金额</p>
                        </div>
                    </Col>
                    <Col :sm="6" :xs="24">
                        <div class="fourth">
                            <h1>{{offlineCount}}<span>人</span></h1>
                            <p>线下还款笔数</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import dataShow from '../router/moneyCount.js'

export default {
  name: 'sections',
  data () {
    return {
        loanMoney:0,
        loanCount:0,
        repayMoney:0,
        repayCount:0,
        onlineMoney:0,
        onlineCount:0,
        offlineMoney:0,
        offlineCount:0
    }
    },
    created:function(){
        dataShow.financeRepay('','detail/samedayOfLoan',this);
        dataShow.financeRepay('','detail/samedayOfRepay',this);
    },
    computed :{
    },
    methods: {
        financeRepay(result){
            if(result==null){
                return false;
            }
            if(result.payAmount!=null){
                this.loanMoney=result.payAmount;
                this.loanCount=result.total;
            }else{
                this.repayMoney=result.amount;
                this.repayCount=result.total;
                this.onlineMoney=result.lineAmount;
                this.onlineCount=result.lineTotal;
                this.offlineMoney=result.offlineAmount;
                this.offlineCount=result.offlineTotal;
            }
        }
    }
}
</script>
