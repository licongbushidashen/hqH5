<template>
  <view class="main">
    <u-toast ref="uToast"></u-toast>
    <div class="cdfw">
      <p>{{ item.name }}场馆</p>
      <div style="margin-top: 12rpx">
        <span
          v-for="(item, index) in type"
          :key="item.id"
          :class="type_index == index ? 'actives' : ''"
          @click="changeType(item, index)"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="jj">
      <!-- <p class="jj_time">(开放时间:15:00-19:30)</p> -->
      <p>场馆地址：{{ address }}</p>
      <!-- <p>2.场地设施啊实打实的场地设施啊实打实的场地设施啊实打实的场地设施啊实打实的场地设施啊实打实的</p> -->
    </div>
    <p class="main_title">预约时间</p>
    <u-scroll-list>
      <view v-for="(item, index) in list" :key="index">
        <div class="sj" @click="daychange(item, index)">
          <p class="title">{{ item.wstr }}</p>
          <div class="times" :class="test(item, index)">
            <p class="times_time">{{ item.day | formatDate("MM-dd") }}</p>
            <p class="times_flag">{{ item.total > 0 ? "可约" : "已满" }}</p>
          </div>
        </div>
      </view>
    </u-scroll-list>
    <view class="changes">
      <div
        v-for="(item, index) in time"
        :key="index"
        :class="
          item.isDeleted ? 'disable' : '' || item.timeindex ? 'actives' : ''
        "
        @click="timechange(item, index)"
      >
        <h1>{{ item.name }}</h1>
        <p class="changes_time">{{ item.startOn }}-{{ item.endOn }}</p>
        <!-- -{{item.endOn.substring(0,item.startOn.length-3)} -->
        <p>余{{ item.schedules[0].surplus }}</p>
      </div>
    </view>
    <view class="lasttip"
      >按照预约时间提前开启场馆，不保障场馆实际使用人。如有重大活动需要保留场馆，请提前与鲍老师（<a href="tel:18768491043">18768491043</a>）联系。</view
    >
    <button @click="add">立即预约</button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      spaceId: "",
      active: "",
      type_index: 0,
      type: [],
      list: [],
      time: [],
      dayIndex: 0,
      address: "",
      timeindex: "",
      schedules: "",
      item: {},
      nums: [],
    };
  },
  onLoad: function (option) {
    console.log(option.id); //打印出上个页面传递的参数。

    this.space(option.id);
    this.types(option.id);
    // this.spaceId = option.id
  },
  methods: {
    types(id) {
      this.$res
        .get(`${this.https}/api/logistics/reservations/spaceCategory/${id}`, {})
        .then((res) => {
          this.item = res.data;
        });
    },
    changeType(item, index) {
      console.log(item);
      this.type_index = index;
      this.address = item.address;
      this.appointment(item.id);
    },
    space(id) {
      this.$res
        .get(`${this.https}/api/logistics/reservations/space`, {
          CategoryId: id,
        })
        .then((res) => {
          this.type = res.data.items;
          this.address = res.data.items[0].address;
          this.appointment(res.data.items[0].id);
        });
    },
    appointment(id) {
      this.spaceId = id;
      this.$res
        .get(
          `${this.https}/api/logistics/reservations/space/remainder/${id}`,
          {}
        )
        .then((res) => {
          for (let i = 0; i < res.data.items.length; i++) {
            var date = new Date(res.data.items[i].day);
            var day = date.getDay();
            let MM =
              date.getMonth < 9
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1;
            let DD = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
            res.data.items[i].wstr = "星期" + "日一二三四五六".charAt(day);
            res.data.items[i].time = MM + "-" + DD;
          }

          this.list = res.data.items;
          this.daychange(res.data.items[0], 0);
        });
    },
    daychange(val, index) {
      this.dayIndex = index;
      this.$res
        .get(
          `${this.https}/api/logistics/reservations/space/remainder-by-day/${this.spaceId}?day=${val.day}`,
          {}
        )
        .then((res) => {
          res.data.forEach((item, i) => {
            res.data[i].timeindex = false;
          });
          this.time = res.data;
          this.timeindex = null;
          this.schedules = null;
        });
    },
    timechange(item, index) {
      if (item.schedules[0]?.surplus == 0) {
        this.$refs.uToast.show({
          type: "default",
          message: "预约已满",
        });
        return;
      } else {
        this.time[index].timeindex = !this.time[index].timeindex;
        if (this.time[index].timeindex) {
          this.nums.push(item.schedules[0].id);
        } else {
          this.nums.forEach((val, i) => {
            if (val == item.schedules[0].id) {
              this.nums.splice(i, 1);
            }
          });
        }
      }
    },
    add() {
      if (!this.nums.length) {
        this.$refs.uToast.show({
          type: "default",
          message: "请选择场次",
        });
        return;
      }
      let date = {
        scheduleId: this.nums[0],
        flag: 1,
        userId: localStorage.getItem("vuex_userId"),
      };

      this.$res
        .post(`${this.https}/api/logistics/reservations/reservation`, date)
        .then((res) => {
          if (res.data.flag == 1) {
            if (this.nums.length == 1) {
              this.$refs.uToast.show({
                type: "success",
                message: "选择成功",
              });
              uni.navigateTo({
                url: `/pages/content/goHome`,
              });
            } else {
              this.nums.shift();
              this.add();
            }
          }
        });
    },
    test(val, index) {
      return val.total == 0
        ? "disable"
        : "" || this.dayIndex == index
        ? "active"
        : "";
    },
  },
};
</script>
<style lang="scss" scoped>
.cdfw {
  background: #ffffff;
  box-shadow: 5px 5px 20px 10px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20rpx;
  p {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    // margin-bottom: 12rpx;
  }
  div {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 44px;
  }
  div > span {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    width: 192rpx;
    height: 64rpx;
    text-align: center;
    line-height: 64rpx;
    display: inline-block;
  }
  div > span.actives {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #5282ec;
    color: #5282ec;
  }
}
.disable {
  background: #efeeef !important;
}
.active {
  background: #5282ec !important;
  p {
    color: #ffffff !important;
  }
}
button {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  height: 94rpx;
  background: #5282ec;
  border-radius: 24px;
}
.changes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 580rpx;
  &:after {
    content: "";
    width: 214rpx;
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
  .actives {
    border: 1px solid #5282ec;
    p,
    h1 {
      color: #5282ec;
    }
  }
  div {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    min-width: 210rpx;
    max-width: 210rpx;
    margin-bottom: 20rpx;
    text-align: center;
    height: 140rpx;
    h1 {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      margin-top: 14rpx;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    p.changes_time {
      font-size: 12px;
      margin: 2px 0px;
    }
  }
}
.jj {
  background: #ffffff;
  box-shadow: 5px 5px 20px 10px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 32rpx;
  > p {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}
.main {
  padding: 24rpx;
  .main_title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    margin-bottom: 40rpx;
    margin-top: 40rpx;
  }
}
.sj {
  margin-right: 5px;
}
.title {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin-bottom: 10rpx;
}
.times {
  width: 90rpx;
  height: 58px;
  background: #f6f8fc;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  text-align: center;
}
.times_flag {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.times_time {
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  margin-top: 20rpx;
  margin-bottom: 10rpx;
}

.lasttip {
  box-sizing: border-box;
  margin:8px;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
  padding:  7px;
  font-size: 12px;
  line-height: 20px; 
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
  color: #d4380d;
  background: #fff2e8;
  border-color: #ffbb96;
}
</style>
