<template>
  <div
    className="player"
    :style="{
      backgroundColor: '#3d80008a',
      transform: hiddenFlag ? `translateY(120px)` : `translateY(0px)`,
    }"
    @mouseleave="toHide"
    @mouseenter="toShow"
    v-show="store.playSwitch"
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
      <!-- <Popover content={renderPlaylist()} title="播放列表" trigger="click">
          <UnorderedListOutlined style="font-size: 15px;" />
        </Popover> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, onUpdated } from 'vue'
import { useMainStore } from '@/store/main'
import songRequest from '@/service/api/song'

export default defineComponent({
  components: {},
  props: {},
  setup() {
    let store = useMainStore()
    // let song = store.currentSong
    console.log('歌曲信息', store.currentSong)
    let playState = ref(false)
    let hiddenFlag = ref(false)
    onMounted(() => {
      toShow()
      toHide()
      if (store.currentSong && store.currentSong.id) {
        getSongUrl()
      }
      //存储到播放列表
      //   const playlist = localStorage.getItem('playlist')
      //   const newList = playlist ? JSON.parse(playlist) : []
      //   const filterIndex = newList.findIndex((item2) => item2.id === song.id)
      //   if (filterIndex == -1 && song.id) {
      //     newList.push(song)
      //   }
      //   localStorage.setItem('playlist', JSON.stringify(newList))
    })
    onUpdated(() => {
      console.log('updated', store.currentSong)
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
          await getSong(newList[filterIndex + 1])
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
    //   function renderPlaylist() {
    //     const list = localStorage.getItem("playlist");
    //     return (
    //       <div style={{ height: "300px", overflowY: "scroll" }}>
    //         <List
    //           dataSource={JSON.parse(list)}
    //           renderItem={renderPlaylistItem}
    //           itemLayout="vertical"
    //           size="small"
    //         />
    //       </div>
    //     );
    //   }

    //   function renderPlaylistItem() {
    //     return (
    //       <List.Item
    //         onDoubleClick={async () => {
    //           await getSong(item);
    //         }}
    //         extra={creatorFormat(item.ar || item.artists)}
    //         style={{ backgroundColor: item.id === props.id ? "#eee" : "#fff" }}
    //       >
    //         {item.name}
    //       </List.Item>
    //     );
    //   }
    return {
      setPlayState,
      handleEnd,
      styleObj,
      toHide,
      toShow,
      creatorFormat,
      store,
      hiddenFlag,
    }
  },
})
</script>

<style scoped lang="scss">
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
