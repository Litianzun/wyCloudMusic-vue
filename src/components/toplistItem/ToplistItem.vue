<template>
  <div class="toplist-item">
    <div class="header">
      <img :src="bannerImg" alt="toplist-banner" />
      <div class="tit">
        <router-link to="'/discover/toplist?id='id">{{ title }}</router-link>
        <div class="btn">
          <video-play title="播放" class="icon1" color="#888"></video-play>
          <folder-add title="收藏" class="icon2" color="#888"></folder-add>
        </div>
      </div>
    </div>
    <ol>
      <li v-for="(item, index) in data" :key="item.id">
        <span class="no">{{ index + 1 }}</span>
        <router-link to="'/song?id='item.id" class="nm f-thide">{{ item.name }}</router-link>
      </li>
    </ol>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/runtime-core'
import { VideoPlay, FolderAdd } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import playlistRequest from '@/service/api/playlist'

export default defineComponent({
  name: 'titleNav',
  components: {
    VideoPlay,
    FolderAdd,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    bannerImg: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    let data = ref([])
    let getData = async () => {
      //获取轮播图
      try {
        const list = await playlistRequest.detail({ id: props.id })
        console.log(list)
        if (list.code === 200) {
          data.value = list.playlist.tracks.slice(0, 10) || []
        }
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(() => {
      getData()
    })
    return {
      data,
    }
  },
})
</script>

<style scoped lang="scss">
.toplist-item {
  width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-right: 1px solid #dcdcdc;
  .header {
    height: 100px;
    padding: 20px 0 0 19px;
    display: flex;
    align-items: center;
    img {
      width: 80px;
    }
    .tit {
      width: 116px;
      margin: 6px 0 0 10px;
      a {
        text-decoration: none;
        color: #333;
      }
      .btn {
        margin-top: 10px;
        .icon1 {
          width: 22px;
          height: 22px;
        }
        .icon2 {
          width: 22px;
          height: 22px;
          margin-left: 10px;
        }
      }
    }
  }
  ol {
    height: 319px;
    width: 100%;
    // margin-left: 50px;
    line-height: 32px;
    display: block;
    li {
      height: 32px;
      list-style: none;
      padding-left: 9px;
      display: flex;
      align-items: center;
      color: #666;
      &:nth-child(-n + 3) {
        color: #c10d0c;
      }
      &:nth-child(odd) {
        background: #eee;
      }
      .no {
        width: 35px;
        height: 32px;
        display: inline-block;
        text-align: center;
      }
      .nm {
        width: 170px;
        height: 32px;
        display: inline-block;
        text-decoration: none;
        color: #000;
        font-size: 14px;
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
</style>
