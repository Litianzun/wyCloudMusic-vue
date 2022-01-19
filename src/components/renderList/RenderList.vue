<template>
  <li :class="isActive ? 'item-wrapper isActive' : 'item-wrapper'" @click="handleClick" v-if="data">
    <img :src="data.coverImgUrl" alt="list-img" />
    <div class="content-box">
      <span class="f-thide title">{{ data.name }}</span>
      <small>{{ data.trackCount + '首' }}</small>
    </div>
  </li>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: 'renderList',
  components: {},
  props: {
    data: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true
    },
  },
  setup(props, ctx) {
    let handleClick = () => {
      ctx.emit('listItemClick', props.data)
    }
    return {
      handleClick
    }
  },
})
</script>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  padding: 6px;
  box-sizing: border-box;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .content-box {
    flex: 1;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 13px;
    }
    small {
      font-size: 12px;
      color: #999;
    }
  }
}
.isActive {
  background-color: #eee;
}
</style>
