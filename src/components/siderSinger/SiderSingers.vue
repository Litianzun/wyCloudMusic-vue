<template>
  <div class="n-singer">
    <h3 class="v-hd3">
      <span class="f-fl">入驻歌手</span>
      <router-link to="/discover/artist/signed" class="more">查看全部 ></router-link>
    </h3>
    <ul class="singer-list">
      <li v-for="singer in singerData" :key="singer.id">
        <img class="singer-img" :src="singer.picUrl" />
        <div class="singer-info">
          <span class="f-thide">{{ singer.name }}</span>
          <p class="description f-thide">歌手详情 >></p>
        </div>
      </li>
    </ul>
    <el-button
      @click="goPage('https://music.163.com/st/musician')"
      style="margin-left: 40px; margin-top: 10px"
      >申请成为网易音乐人</el-button
    >
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/runtime-core'
import singersRequest from '@/service/api/singers'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'siderSinger',
  setup() {
    let singerData = ref([])
    let router = useRouter()
    let getSingers = async () => {
      //获取轮播图
      try {
        const singers = await singersRequest.list({ offset: 0, limit: 10 })
        console.log(singers)
        if (singers.code === 200) {
          singerData.value = singers.artists || []
        }
      } catch (error) {
        console.error(error)
      }
    }
    let goPage = (url) => {
      window.open(url)
    }
    onMounted(() => {
      getSingers()
    })
    return {
      singerData,
      goPage,
    }
  },
})
</script>

<style scoped lang="scss">
.n-singer {
  margin-top: 15px;
  .v-hd3 {
    position: relative;
    height: 23px;
    margin: 0 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    .f-fl {
      float: left;
      font-size: 13px;
    }
    .more {
      float: right;
      font-weight: normal;
      color: #666;
      text-decoration: none;
      font-size: 13.5px;
    }
  }
  .singer-list {
    margin: 6px 0 14px 20px;
    li {
      list-style: none;
      margin-top: 14px;
      float: left;
      width: 210px;
      height: 62px;
      background: #fafafa;
      .singer-img {
        float: left;
        width: 62px;
        height: 62px;
      }
      .singer-info {
        float: left;
        width: 133px;
        height: 60px;
        padding-left: 14px;
        border: 1px solid #e9e9e9;
        border-left: none;
        span {
          margin-top: 8px;
          width: 90%;
          font-size: 14px;
          display: inline-block;
        }
        .description {
          width: 90%;
          display: inline-block;
          margin-top: 8px;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  .f-thide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
}
</style>
