<template>
  <view class="bg">
    <p>服务清单</p>

    <u-collapse>
      <u-collapse-item
        @click="open(index)"
        v-for="(item, index) in indexList"
        :key="index"
        :title="item.name"
      >
        <text class="u-collapse-content">
          <div class="info-body">
           <!-- <u-parse :content="item.content" :selectable="true"  @navigate="navigate"></u-parse> -->
           <view v-html="item.content" @click.native="opens"></view>
          </div>
        </text>
      </u-collapse-item>
    </u-collapse>
  </view>
</template>

<script>
document.getElementsByTagName("title")[0].innerText = "服务清单";
export default {
  data() {
    return {
      currentIndex: -1,
      indexList: [
        {
          name: "餐饮服务",
          src: "",
          content:
            "<p>业务负责人：李宁 <a href='tel:18905811312'>18905811312</a></p><p>服务预定及咨询（预定请提前一天）</p> <p>联系人：高经理 <a href='tel:15336563557'>15336563557</a></p><p>订餐热线：<a href='tel:0571-58005277'>0571-58005277</a></p><p>线上通道：OA-网上办事大厅-后勤-用餐申请</p>",
        },
        {
          name: "物业服务",
          src: "",
          content:
            "<p>业务负责人：邵睿 <a href='tel:15314682496'>15314682496</a></p></p>物业服务：<a href='tel:0571-58005255'>0571-58005255</a></p></p>1. 楼宇管家服务（物业服务第一窗口）</p></p>1#&6#  ：叶  雯    <a href='tel:15356103313'>15356103313</a></p></p>2#     ：向清艳    <a href='tel:15957149963'>15957149963</a></p></p>4#&7#  ：张  迪    <a href='tel:13587385005'>13587385005</a></p></p>8#&11# ：沈中杰    <a href='tel:13857155708'>13857155708</a></p></p>2. 会务服务预约、取消与更改</p></p>二楼前台：<a href='tel:0571-58005202'>0571-58005202</a></p>",
        },
        {
          name: "一卡通服务 ",
          src: "",
          content:
            "<p>业务负责人：鲍博建 <a href='tel:18768491043'>18768491043</a></p></p>服务热线：<a href='tel:0571-58005104'>0571-58005104</a></p></p>办理地点：主楼一楼综合服务大厅办理</p></p>1.	一卡通办理、补办与终止</p></p>前往综合服务大厅办理</p></p>2.	一卡通门禁权限申请与变更</p></p>OA-网上办事大厅-后勤-门禁卡权限申请</p></p>3.	一卡通充值及余额查询</p></p>途径1：综合服务大厅办理</p></p>途径2：之江APP-我的-一卡通- 充值、余额查询</p>",
        },
        {
          name: "交通服务",
          src: "",
          content:
            "<p>业务负责人：朱亚奇  <a href='tel:18858053409'>18858053409</a>  </p></p>1.通勤车服务（可查询公交接驳车时刻表）</p></p>之江APP-车辆服务-班车预约</p></p>2.公务车与观光用车申请、取消与变更</p></p>途径1：OA -网上办事大厅-后勤-车辆申请</p></p>途径2：之江APP-车辆服务-用车申请</p>",
        },
        {
          name: "住房保障",
          src: "",
          content:
            "<p>业务负责人：郑恒 <a href='tel:18368493019'>18368493019</a></p></p>人才公寓政策咨询及公寓申请</p></p>途径1：OA-网上办事大厅-后勤-公寓申请</p></p>途径2：之江APP-后勤服务-公寓申请</p>",
        },
        {
          name: "公用房管理",
          src: "",
          content:
            "<p>业务负责人：孙景行 <a href='tel:18758078180'>18758078180</a></p></p>1.公用房申请</p></p>OA-网上办事大厅-后勤-房产管理系统</p></p>2.公房内电器、家具、设施报修</p></p>之江实验室APP-物业报修</p></p>3.家具借用申请</p></p>OA-网上办事大厅-后勤-家具借用单</p>",
        },
        {
          name: "文体及商业",
          src: "",
          content:
            "<p>业务负责人: 郑恒 <a href='tel:18368493019'>18368493019</a> </p></p>1.文体场馆（足球、篮球、网球、乒乓球、羽毛球）预约</p></p>之江APP-后勤服务-场馆预约-对应场馆预约选择</p></p>2.园区商业配套意见与建议</p></p>之江APP中投诉与反馈板块</p>",
        },
        {
          name: "设施保障",
          src: "",
          content:
            "<p>业务负责人：刘楠    <a href='tel:13702086892'>13702086892</a></p></p>1.园区楼宇内设施设备报修</p></p>途径1：请优先使用报事报修系统</p></p>途径2：联系对应楼宇管家</p>",
        },
        {
          name: "安全管理",
          src: "",
          content:
            "<p>业务负责人：仇东东 <a href='tel:17799134201'>17799134201</a></p></p>1.访客申请</p></p>途径1：OA-网上办事大厅-后勤-访客预约（新园区）</p></p>途径2：之江APP-访客申请 </p></p>2.临时工作证申报</p></p>OA-网上办事大厅-后勤-临时工作证申请</p></p>3.车辆出入权限申请（园区办公人员）</p></p>4.园区日常治安纠纷问题解决</p></p>园区应急报警电话：<a href='tel:0571-58005299'>0571-58005299</a></p></p>辖区派出所电话：<a href='tel:0571-88636561'>0571-88636561</a></p></p>应急消控电话：<a href='tel:0571-58005299'>0571-58005299</a></p></p>南门保安室：<a href='tel:0571-58005260'>0571-58005260</a></p></p>西门保安室：<a href='tel:0571-58005290'>0571-58005290</a></p>",
        },
        {
          name: "投诉与反馈",
          src: "",
          content:
            "<p>后勤综合服务意见与反馈</p></p>途径1：钉钉-之江实验室条保联络服务群-后勤负责人对接反馈</p></p>途径2：条件保障投诉：<a href='tel:0571-58005322'>0571-58005322</a></p></p>途径3：之江实验室APP-后勤服务-意见征询</p>",
        },
        {
          name: "应急电话",
          src: "",
          content:
            "<p>1. 园区应急报警电话：<a href='tel:0571-58005299'>0571-58005299</a></p></p>2. 辖区派出所电话：<a href='tel:0571-88636561'>0571-88636561</a></p></p>3. 应急消控电话：<a href='tel:0571-58005299'>0571-58005299</a></p></p>4. 南门保安室：<a href='tel:0571-58005260'>0571-58005260</a></p></p>5. 西门保安室：<a href='tel:0571-58005290'>0571-58005290</a></p>",
        },
      ],
    };
  },
  mounted() {
    // this.list();
    //
  },
  methods: {
    opens(e){
      if(e.target.nodeName=='A'){
          this.openphone(e.target.innerHTML)
      }
    },
    open(index) {
      console.log(index);
      this.currentIndex = this.currentIndex == index ? -1 : index;
    },
    change(activeNames) {
      console.log(activeNames);
    },
    list() {
      this.$res
        .get(`${this.https}/api/logistics/reservations/spaceCategory`, {})
        .then((res) => {
          this.indexList = res.data.items;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  background: #5282ec;
  padding: 50rpx 0px;
  > p {
    margin-bottom: 30rpx;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
}
.yy_list_item {
  padding: 0px 40rpx;
}
.yy_list_det {
  height: 100rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 8px;
  line-height: 100rpx;
  padding: 0 20rpx;
}
.yy_list_info {
  background: #fff;
}
.names {
  color: #666;
  margin-left: 40rpx;
}

.u-collapse {
  padding: 0 30rpx;

  .u-collapse-item {
    background: #fff;
    margin-bottom: 20rpx;
    border-radius: 8px;

    ::v-deep .u-cell {
      border-radius: 8px !important;
    }
  }
}

.u-collapse-content {
  p {
    line-height: 24px;
    font-size: 14px;
  }

  .info-body {
    margin-bottom: 40rpx;
    line-height: 25px;

    p.title {
      padding-left: 0;
      font-size: 15px;
      line-height: 30px;
      font-weight: bolder;
    }

    ul {
      padding-left: 0;
      dl {
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items: flex-start;
        dt {
          width: 80px;
          text-align: right;
        }

        dd {
          flex: 1;
        }
      }
    }
  }
}

::v-deep .u-collapse-item__content__text {
  padding-top: 0;
}
</style>