<template>
  <div class="my-music">
    <aside>
      <div class="n-minelst">
        <h2 class="f-ff1">歌单({{ userPlaylist.length }})</h2>
        <ul class="j-flag" style="padding-left: 10px">
          <render-list
            v-for="item in userPlaylist"
            :key="item.id"
            :data="item"
            :isActive="currentPlaylist ? item.id === currentPlaylist.id : false"
            :imgUrl="item.coverImgUrl"
            :title="item.name"
            :description="item.trackCount"
            @listItemClick="listItemClick"
          ></render-list>
          <!-- <li v-for="item in userPlaylist" :key="item.id"></li> -->
        </ul>
      </div>
    </aside>
    <div class="main-box" v-if="currentPlaylist">
      <div class="top-wrapper">
        <img :src="currentPlaylist.coverImgUrl" class="coverImg" />
        <div class="content-box">
          <el-row :gutter="10" align="middle" style="width: 68%">
            <el-col :span="6">
              <el-tag type="danger" effect="dark">歌单</el-tag>
            </el-col>
            <el-col :span="18">
              <h3>{{ currentPlaylist.name }}</h3>
            </el-col>
          </el-row>
          <el-row align="middle" style="margin-top: 10px; width: 60%; height: 35px" :gutter="3">
            <el-col :span="5">
              <img :src="currentPlaylist.creator.avatarUrl" class="avatar" />
            </el-col>
            <el-col :span="19">
              <span class="label" style="color: #0c73c2">{{
                currentPlaylist.creator.nickname
              }}</span>
              <small class="label" style="margin-left: 7px"
                >{{ formatTime(currentPlaylist.createTime) }}创建</small
              >
            </el-col>
          </el-row>
          <el-row align="middle" :gutter="6" style="margin-top: 10px">
            <el-col :span="4.8"
              ><el-button type="primary" :icon="VideoPlay" size="small">播放</el-button></el-col
            >
            <el-col :span="4.8"
              ><el-button :icon="FolderAdd" type="info" plain size="small">收藏</el-button></el-col
            >
            <el-col :span="4.8"
              ><el-button :icon="Share" type="info" plain size="small">分享</el-button></el-col
            >
            <el-col :span="4.8"
              ><el-button :icon="Download" type="info" plain size="small">下载</el-button></el-col
            >
            <el-col :span="4.8"
              ><el-button :icon="Comment" type="info" plain size="small">评论</el-button></el-col
            >
          </el-row>
        </div>
      </div>
      <div class="table-box">
        <songs-table :dataSource="currentPlaylist.tracks"></songs-table>
      </div>
      <div class="comment-box">
        <comment-box />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { getCookie } from '@/utils/cookie'
import userRequest from '@/service/api/user'
import playlistRequest from '@/service/api/playlist'
import RenderList from '@/components/renderList/RenderList.vue'
import { VideoPlay, FolderAdd, Share, Download, Comment } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import SongsTable from '@/components/songsTable/SongsTable.vue'
import CommentBox from '@/components/comment/Comment.vue'

export default defineComponent({
  components: {
    RenderList,
    SongsTable,
    CommentBox
  },
  setup() {
    let userPlaylist = ref([])
    let currentPlaylist = ref(null) //当前选择的歌单
    let getUserPlaylist = async () => {
      try {
        const playlist = await userRequest.playlist({ uid: getCookie('userId') })
        if (playlist.code === 200) {
          // playlist.playlist.map(async (listitem) => {
          //   let arr = await getPlaylistDetail(listitem.id)
          //   listitem.children = arr
          // })
          userPlaylist.value = playlist.playlist
        }
        console.log(userPlaylist.value)
      } catch (error) {
        console.error(error)
      }
    }
    let getPlaylistDetail = async (id) => {
      try {
        const list = await playlistRequest.detail({ id })
        console.log(list)
        if (list.code === 200) {
          currentPlaylist.value.tracks = list.playlist.tracks || []
        }
      } catch (error) {
        console.error(error)
      }
    }
    let listItemClick = (param) => {
      //点击左侧列表
      currentPlaylist.value = param
      getPlaylistDetail(param.id)
    }
    let formatTime = (time) => {
      return dayjs(time).format('YYYY-MM-DD')
    }
    onMounted(() => {
      getUserPlaylist()
    })
    return {
      userPlaylist,
      currentPlaylist,
      listItemClick,
      VideoPlay,
      FolderAdd,
      Share,
      Download,
      Comment,
      formatTime,
    }
  },
})
</script>

<style scoped lang="scss">
.my-music {
  position: relative;
  min-height: 719px;
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  aside {
    padding-bottom: 50px;
    padding-top: 40px;
    float: left;
    min-height: 719px;
    width: 240px;
    position: relative;
    border-right: 1px solid #d3d3d3;
    box-sizing: border-box;
    .n-minelst {
      margin-top: 8px;
      h2 {
        padding: 0 10px 12px 15px;
        font-size: 14px;
        color: #000;
      }
    }
  }
  .main-box {
    height: inherit;
    float: right;
    width: 740px;
    padding-bottom: 50px;
    position: relative;
    min-height: 719px;
    box-sizing: border-box;
    .top-wrapper {
      width: 100%;
      height: 200px;
      padding: 40px;
      display: flex;
      .coverImg {
        width: 208px;
        height: 208px;
      }
      .content-box {
        margin-left: 20px;
        .avatar {
          width: 35px;
          height: 35px;
        }
        .label {
          font-size: 11px;
          color: #999;
        }
      }
    }
  }
}
</style>
