<template>
  <view>
    <!-- <u-navbar title="公告通知" @rightClick="rightClick" @leftClick="leftClick">
    </u-navbar> -->
    <view class="search">
      <u-search placeholder="请输入搜索关键词" v-model="keyword" :showAction="false" @search="articleList"></u-search>
    </view>
    <u-subsection v-if="list.length>0" fontSize="24" :list="list" mode="subsection" :current="current" @change="sectionChange" style="padding: 0px 16px;"></u-subsection>
    <u-list style="height:auto">
      <u-list-item class="list_notice" v-for="(item, index) in indexList" :key="index" >
        <h1 @tap="article(item)">{{item.title}}</h1>
        		<view @tap="article(item)" class="item-attachments" v-if="item.imgs.length>0" :style="stylegl(item.imgs.length)">
			<view :class="imgListClass" v-for="(img,index) in item.imgs" :key="index">
				<image  :src="img" mode="aspectFill">
				</image>
			</view>
		</view>

        <p @tap="article(item)">
          <!-- 来源：{{item.creatorId}} -->
          {{item.creationTime |formatDate}}
        </p>
      </u-list-item>
    </u-list>
    <u-empty v-if="indexList.length==0" mode="data" class="emptys" icon="http://cdn.uviewui.com/uview/empty/data.png">
    </u-empty>
  </view>
</template>
<script>
document.getElementsByTagName('title')[0].innerText = '测试'
export default {
  data() {
    return {
    
      list: [],
      list1: [],
      current: 0,
      indexList: [],
      keyword: '',
      Category:''
    }
  },
  mounted() {},
  onLoad: function(option) {
    //option为object类型，会序列化上个页面传递的参数
    this.parentid(option.id)
  },
  methods: {
    stylegl(len){
        if(len>6){
          return ' grid-template-rows: repeat(3, 120px);'
        }else if(len>3){
           return ' grid-template-rows: repeat(2, 120px);'
        }else{
          return ' grid-template-rows: repeat(1, 120px);'
        }
    },
    article(item) {
      uni.navigateTo({
        url: `/pages/content/index?id=${item.id}`
      })
    },
    rightClick() {
      console.log('rightClick')
    },
    leftClick() {
      uni.navigateBack({
        delta: 1
      })
    },
    parentid(val) {
      let data = { parentId: val ? val : null }
      this.$res.get(`${this.https}/api/logistics/articleCategory/by-parentid`, data).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.list.push(res.data[i].name)
        }
        this.list1 = res.data
        this.Category=this.list1.length ? this.list1[0].id : val
        console.log( this.list1.length ? this.list1[0].id : val)
        this.articleList(this.list1.length ? this.list1[0].id : val)
      })
    },

    articleList(val) {
      let data = { Category: this.Category, Title: this.keyword }
      this.$res.get(`${this.https}/api/logistics/article`, data).then(res => {
         for (let i = 0; i < res.data.items.length; i++) {
          let imgs = res.data.items[i].coverImage.split(",")
          imgs = imgs.filter(e => {
            if (e != "") {
              return e
            }
          })
          for (let i = 0; i < imgs.length; i++) {
            imgs[i] = this.urlhttp + imgs[i]
          }
          res.data.items[i].imgs = imgs
        }
        console.log(res.data.items)
        this.indexList = res.data.items
      })
    },
    sectionChange(index) {
      this.current = index
      this.Category=this.list1[index].id
      this.articleList(this.list1[index].id)
    }
  }
}
</script>
<style lang="scss" scoped>

  uni-image {
    height: 100% !important;
    width: 100% !important;

    div {
      background-position: center center;
      background-size: 100% !important;
      background-repeat: no-repeat;
    }
  }

.emptys {
  margin-top: 50% !important;
}
.search {
  padding: 0px 16px;
  margin: 40rpx 0;
  .u-search__content {
    height: 36px !important;
  }
}
.list_notice {

  padding: 0px 16px;
  h1 {
      font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #282828;
  }
  p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;

    color: #999999;
    &::after {
      content: '';
      display: block;
      height: 1px;
      background: #efefef;
      width: 100%;
      margin: 12px 0px;
    }
    span {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      float: none;
      margin-left: 16px;
    }
  }
}
</style>

<style lang="scss">

.item-attachments{
      display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(2, 100px);
    margin: 8px 0px;
    grid-row-gap:2%;         
grid-column-gap:1%;  
}
::v-deep .u-album{
  margin-top: 10px;
}

::v-deep .u-album__row{
  margin-bottom: 10px;
}
.album {
  @include flex;
  align-items: flex-start;

  &__avatar {
    background-color: $u-bg-color;
    padding: 5px;
    border-radius: 3px;
  }

  &__content {
    margin-left: 10px;
    flex: 1;
  }
}
</style>