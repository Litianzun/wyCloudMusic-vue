<template>
  <span class="box-header">
    <b>歌曲列表</b>
    <span>{{ songsLength }}首歌 </span></span
  >
  <el-table :data="dataSource" stripe style="width: 100%" @cell-click="handleClick">
    <el-table-column type="index" :index="indexMethod" />
    <el-table-column width="30" column-key="play">
      <div>
        <el-icon class="title-icon" color="#c10d0c">
          <video-play></video-play>
        </el-icon>
      </div>
    </el-table-column>
    <el-table-column label="歌曲标题" width="250">
      <template #default="scope">
        <span class="f-thide list-item">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="时长" width="70">
      <template #default="scope">
        <span>{{ formatDt(scope.row.dt) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="scope">
        <span class="f-thide list-item">{{ formatArtists(scope.row.ar) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="专辑">
      <template #default="scope">
        <span class="f-thide list-item">{{ formatAlbum(scope.row.al) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from '@vue/runtime-core'
import dayjs from 'dayjs'
import { useMainStore } from '@/store/main'
import { VideoPlay } from '@element-plus/icons-vue'

function Data(name, dt, ar, al) {
  this.name = name
  this.dt = dt
  this.ar = ar
  this.al = al
}
export default defineComponent({
  name: 'songsTable',
  components: {
    VideoPlay,
  },
  props: {
    dataSource: {
      type: Array || null,
      required: true,
    },
  },
  setup(props, ctx) {
    let store = useMainStore()
    const indexMethod = (index) => {
      return index + 1
    }
    let formatDt = (time) => {
      return dayjs(time).format('mm:ss')
    }
    function formatArtists(text) {
      const names = text.map((item) => item.name)
      return names.join(',')
    }
    let formatAlbum = (album) => {
      return album.name
    }
    let songsLength = computed(() => {
      return props.dataSource && props.dataSource.length
    })
    let handleClick = (row, column, cell, event) => {
      if(column.columnKey === 'play'){
        store.setPlaySwitch(true)
        console.log(row)
        store.setSong(row)
      }
    }
    return {
      indexMethod,
      formatDt,
      formatArtists,
      formatAlbum,
      songsLength,
      handleClick
    }
  },
})
</script>

<style scoped lang="scss">
.box-header {
  padding: 0 10px 0 32px;
  margin-top: 22px;
  display: block;
  border-bottom: 2px solid #c20c0c;
  line-height: 28px;
  b {
    font-size: 18px;
  }
  > span {
    margin: 9px 0 0 20px;
    color: #666;
    font-size: 12px;
  }
}
.list-item {
  display: list-item;
}
</style>
