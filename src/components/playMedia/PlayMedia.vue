<template>
  <div
    className="player"
    :style="{
      backgroundColor: '#3d80008a',
      transform: hiddenFlag ? `translateY(120px)` : `translateY(0px)`,
    }"
    @mouseleave="toHide"
    @mouseenter="toShow"
    v-show="mediaShow"
  >
    <div class="song-info-box">
      <h2 class="f-thide">{{ store.currentSong.name }}</h2>
      <span class="f-thide">{{ store.currentSong.ar && creatorFormat(store.currentSong.ar) }}</span>
    </div>
    <div className="player-ico" :style="styleObj" />
    <audio
      :src="store.currentSong.url"
      autoPlay
      controls
      className="systemplayer"
      id="audio"
      @pause="setPlayState(false)"
      @play="setPlayState(true)"
      @ended="handleEnd"
    >
      您的浏览器不支持audio标签
    </audio>
    <div className="player-toolBox">
      <!-- <el-popover placement="top-start" title="播放列表" :width="400" trigger="click"> -->
      <el-icon><tickets @click="playlistShow = !playlistShow" /></el-icon>
      <!-- <el-affix position="bottom" :offset="10" v-show="playlistShow"> -->
      <el-table
        :data="gridData"
        size="small"
        @row-dblclick="rowClick"
        max-height="300"
        row-class-name="black-row"
        header-row-class-name="black-row"
        cell-class-name="my-cell"
        header-cell-class-name="black-row"
        class="playlist-box"
        v-show="playlistShow"
      >
        <el-table-column property="name" label="歌曲" width="220">
          <template #default="scope">
            <span class="f-thide" style="display: list-item">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手" width="120">
          <template #default="scope">
            <span class="f-thide" style="display: list-item">{{
              creatorFormat(scope.row.ar || scope.row.artists)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="70">
          <template #default="scope">
            <span>{{ formatDt(scope.row.dt) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-affix> -->
      <!-- </el-popover> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUpdated, computed, watch } from 'vue'
import { useMainStore } from '@/store/main'
import songRequest from '@/service/api/song'
import { Tickets } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    Tickets,
  },
  props: {},
  setup() {
    let store = useMainStore()
    // let song = store.currentSong
    console.log('歌曲信息', store.currentSong)
    let playState = ref(false)
    let hiddenFlag = ref(false)
    let playlistShow = ref(false)
    let mediaShow = computed(() => {
      return store.currentSong ? store.currentSong.id : store.playSwitch
    })
    onMounted(() => {
      console.log('mounted')
      toShow()
      toHide()
      if (store.currentSong && store.currentSong.id) {
        getSongUrl()
      }
    })
    onUpdated(() => {
      // console.log('updated', store.currentSong)
      if (store.currentSong && store.currentSong.id && !store.currentSong.url) {
        getSongUrl()
      }
    })
    let getSongUrl = async () => {
      //获取轮播图
      try {
        const res = await songRequest.url({ id: store.currentSong.id })
        console.log(res)
        if (res.code === 200) {
          store.currentSong.url = res.data && res.data[0].url
          styleObj.backgroundImage = `url(${store.currentSong.al.picUrl})`
        }
      } catch (error) {
        console.error(error)
      }
    }
    let setPlayState = (state) => {
      //控制播放器暂停状态
      playState.value = state
    }
    let handleEnd = async () => {
      const playlist = localStorage.getItem('playlist')
      if (playlist) {
        //如果播放列表有下一首歌，自动播放
        const newList = playlist ? JSON.parse(playlist) : []
        const filterIndex = newList.findIndex((item) => item.id === store.currentSong.id) //当前播放的列表index
        if (!(newList.length === filterIndex + 1)) {
          store.setSong(newList[filterIndex + 1])
        }
      }
    }
    let timer = null
    let toHide = () => {
      //鼠标移开三秒之后，向下收起
      timer = setTimeout(() => {
        hiddenFlag.value = true
      }, 3000)
    }
    let toShow = () => {
      hiddenFlag.value = false
      clearTimeout(timer)
    }
    let styleObj = {
      animationPlayState: playState ? 'running' : 'paused',
    }
    function creatorFormat(e) {
      if (e) {
        const arr = e.map((item) => item.name)
        return arr.join('/')
      }
    }
    let list = localStorage.getItem('playlist')
    let gridData = ref(JSON.parse(list))
    watch(store, (newValue, oldValue) => {
      //存储到播放列表
      const playlist = localStorage.getItem('playlist')
      const newList = playlist ? JSON.parse(playlist) : []
      const filterIndex = newList.findIndex((item2) => item2.id === store.currentSong.id)
      if (filterIndex == -1 && store.currentSong.id) {
        newList.push(store.currentSong)
      }
      localStorage.setItem('playlist', JSON.stringify(newList))
      gridData.value = newList
    })
    let formatDt = (time) => {
      return dayjs(time).format('mm:ss')
    }
    let rowClick = (row, column, event) => {
      store.setSong(row)
    }
    return {
      setPlayState,
      handleEnd,
      styleObj,
      toHide,
      toShow,
      creatorFormat,
      store,
      hiddenFlag,
      gridData,
      formatDt,
      rowClick,
      playlistShow,
      mediaShow,
    }
  },
})
</script>

<style scoped lang="scss">
.el-table {
  --el-table-row-hover-bg-color: #f5f7fa6b;
}
.playlist-box {
  position: absolute;
  width: 410px;
  bottom: 149px;
  right: 80px;
}
.cell {
  color: #fff;
}
.player {
  width: 100%;
  height: 130px;
  padding: 10px 20px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0em;
  display: flex;
  transition: transform 1s;
  .black-row {
    background-color: #555;
  }
  .song-info-box {
    width: 250px;
    height: 58px;
  }
  .player-ico {
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 30px;
    animation: rotate 7s 1s linear infinite;
  }
  .player-toolBox {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .systemplayer {
    width: 366px;
    margin-left: 30px;
  }
  &::after {
    content: '';
    width: 80px;
    height: 30px;
    position: absolute;
    right: -15px;
    top: -30px;
    background-color: #3d80008a;
    color: #3d80008a;
    transform: skewX(-30deg);
  }
}

.player-hiddenbar {
  width: 100%;
  height: 10px;
  &::after {
    content: '';
    width: 80px;
    height: 30px;
    position: absolute;
    right: -15px;
    top: -30px;
    background-color: #3d80008a;
    color: #3d80008a;
    transform: skewX(-30deg);
  }
}
</style>
