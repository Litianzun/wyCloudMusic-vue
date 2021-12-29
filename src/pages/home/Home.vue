<template>
  <div>
    <div class="banner-container">
      <div class="carousel-box">
        <el-carousel trigger="click" height="285px">
          <el-carousel-item v-for="item in bannerData" :key="item.encodeId">
            <img :src="item.imageUrl" alt="item.typeTitle" class="banner-img" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="download-box"></div>
    </div>
    <div class="discover-box">
      <div class="main">
        <title-nav title="热门推荐">
          <template v-slot:icon>
            <el-icon class="title-icon" color="#c10d0c">
              <star-filled></star-filled>
            </el-icon>
          </template>
        </title-nav>
        <ul class="main-1">
          <li v-for="item in personalizedData" :key="item.id">
            <div class="u-cover">
              <img :src="item.picUrl" />
              <router-link :to="'/playlist?id=' + item.id" />
              <div class="bottom">
                <video-play class="icon-play" title="播放"></video-play>
                <service class="icon-headset" />
                <span class="nb">{{ formatPlayTimes(item.playCount) }}</span>
              </div>
            </div>
            <p class="dec">{{ item.name }}</p>
          </li>
        </ul>
        <title-nav title="新碟上架" style="margin-top: 35px">
          <template v-slot:icon>
            <el-icon class="title-icon" color="#c10d0c">
              <dessert></dessert>
            </el-icon>
          </template>
        </title-nav>
        <div class="new-disk-box">
          <el-carousel trigger="click" arrow="always" height="184px" :autoplay="disk_autoplay">
            <el-carousel-item v-for="(item, index) in newAlbumData" :key="index">
              <div class="roll">
                <div v-for="item2 in item" :key="item2.id" class="roll-item">
                  <img :src="item2.picUrl" />
                  <p class="roll-item-title f-thide">{{ item2.name }}</p>
                  <p class="roll-item-desc f-thide">
                    {{ item2.artists ? formatArtists(item2.artists) : '-' }}
                  </p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <title-nav title="榜单" style="margin-top: 35px">
          <template v-slot:icon>
            <el-icon class="title-icon" color="#c10d0c">
              <histogram></histogram>
            </el-icon>
          </template>
        </title-nav>
        <div class="toplist-wrapper">
          <div v-for="toplistItem in toplistData" :key="toplistItem.id">
            <toplist-item
              :id="toplistItem.id"
              :bannerImg="toplistItem.coverImgUrl"
              :title="toplistItem.name"
            ></toplist-item>
          </div>
        </div>
      </div>
      <aside class="side">
        <sider-singer></sider-singer>
      </aside>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed, reactive, toRefs, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bannerRequest from '@/service/api/banner'
import personalizedRequest from '@/service/api/personalized'
import newalbumRequest from '@/service/api/newalbum'
import toplistRequest from '@/service/api/toplist'
import TitleNav from '@/components/titleNav/TitleNav.vue'
import ToplistItem from '@/components/toplistItem/ToplistItem.vue'
import SiderSinger from '@/components/siderSinger/SiderSingers.vue'
import _ from 'lodash'
import { StarFilled, Histogram, Dessert, VideoPlay, Service } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'home',
  components: {
    TitleNav,
    StarFilled,
    VideoPlay,
    Service,
    Dessert,
    Histogram,
    ToplistItem,
    SiderSinger,
    SiderSinger
  },
  setup() {
    let router = useRouter()
    let route = useRoute()
    let bannerData = ref(10) //轮播图数据需要给默认长度
    let personalizedData = ref([])
    let newAlbumData = ref(2)
    let disk_autoplay = ref(false)
    let toplistData = ref([]) //榜单
    let getBanner = async () => {
      //获取轮播图
      try {
        const bannerList = await bannerRequest.list({ type: 0 })
        console.log(bannerList)
        if (bannerList.code === 200) {
          bannerData.value = bannerList.banners || []
        }
      } catch (error) {
        console.error(error)
      }
    }
    let getPersonalized = async () => {
      //获取推荐歌单
      try {
        const personalizedList = await personalizedRequest.list({ limit: 8 })
        console.log(personalizedList)
        if (personalizedList.code === 200) {
          personalizedData.value = personalizedList.result || []
        }
      } catch (error) {
        console.error(error)
      }
    }
    let getNewAlbum = async () => {
      //获取新碟
      try {
        const newAlbumList = await newalbumRequest.list({
          limit: 10,
          offset: 0,
          type: 'hot',
        })
        console.log(newAlbumList)
        if (newAlbumList.code === 200) {
          newAlbumData.value =
            newAlbumList.weekData && _.chunk(newAlbumList.weekData.slice(0, 10), 5)
        }
      } catch (error) {
        console.error(error)
      }
    }
    let getToplist = async () => {
      //获取榜单
      try {
        const toplist = await toplistRequest.list()
        console.log(toplist) //toplist拿到的是榜单id；根据榜单id获取榜单数据
        if (toplist.code === 200) {
          let list = toplist.list.splice(0, 3)
          console.log(list)
          //获取榜单详情
          toplistData.value = list
        }
      } catch (error) {
        console.error(error)
      }
    }
    let formatPlayTimes = (x) => {
      return _.truncate(x, {
        length: 3,
        omission: '万',
      })
    }
    let formatArtists = (arr) => {
      let _nameArr = arr.map((item) => item.name)
      return _nameArr.join('/')
    }
    onMounted(() => {
      getBanner()
      getPersonalized()
      getNewAlbum()
      getToplist()
    })
    return {
      bannerData,
      personalizedData,
      formatPlayTimes,
      formatArtists,
      disk_autoplay,
      newAlbumData,
      toplistData,
    }
  },
})
</script>

<style scoped lang="scss">
.banner-container {
  width: 982px;
  margin: 13px auto;
  position: relative;
  .carousel-box {
    width: 730px;
  }
  .banner-img {
    width: 730px;
    height: 285px;
  }
  .download-box {
    width: 254px;
    height: 285px;
    position: absolute;
    top: 0;
    right: -1px;
    background: url(https://s2.music.126.net/style/web2/img/index/download.png?9ab09973cedf2ea02c9f801532810f07);
  }
}
.discover-box {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  display: flex;
  .main {
    width: 730px;
    padding: 20px 20px 40px;
    box-sizing: border-box;
    border-right: 1px solid #dcdcdc;
    .title-icon {
      float: left;
      line-height: 30px;
    }
    .main-1 {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-left: -43px;
      margin-top: 20px;
      li {
        width: 140px;
        height: 204px;
        padding-left: 43px;
        list-style: none;
        .u-cover {
          width: 140px;
          height: 140px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          > a {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 27px;
            background-color: rgba(51, 51, 51, 0.563);
            color: #ccc;
            .icon-play {
              position: absolute;
              right: 10px;
              bottom: 5px;
              width: 16px;
              height: 17px;
              margin: 1px 0;
            }
            .icon-headset {
              float: left;
              width: 16px;
              height: 17px;
              margin: 4px 5px 9px 8px;
            }
            .nb {
              float: left;
              margin: 4px 0 0 0;
              font-size: 13px;
            }
          }
        }
        .dec {
          width: 100%;
          font-size: 14px;
          margin: 8px 0 3px;
        }
      }
    }
    .new-disk-box {
      position: relative;
      zoom: 1;
      height: 186px;
      margin: 20px 0 37px;
      background: #f5f5f5;
      border: 1px solid #d3d3d3;
      .roll {
        width: 687px;
        height: 180px;
        display: flex;
        align-items: center;
        .roll-item {
          flex: 1;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          img {
            width: 100px;
            height: 100px;
          }
          .f-thide {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }
          .roll-item-title {
            width: 100px;
            line-height: 18px;
            font-size: 13px;
          }
          .roll-item-desc {
            width: 100px;
            line-height: 18px;
            font-size: 12px;
            color: #777;
          }
        }
      }
    }
    .toplist-wrapper {
      width: 100%;
      display: flex;
    }
  }
  .side {
    width: 250px;
  }
}
</style>
