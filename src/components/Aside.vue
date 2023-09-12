<template>

      <el-menu
          style="width: 250px;min-height: calc(100vh - 50px)"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span @click="tip">帖子相关</span>
          </template>
          <el-menu-item-group title="帖子">
            <el-menu-item @click="toMyPost" index="1-1">我发布的</el-menu-item>
            <el-menu-item index="1-2">我评论的</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="待开发">
            <el-menu-item index="1-3">待开发</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>待开发</template>
            <el-menu-item index="1-4-1">待开发</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><setting /></el-icon>
          <span @click="toAdvice">对本站的建议以及发现的bug</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><setting /></el-icon>
          <span @click="toAbout">关于本站</span>
        </el-menu-item>
      </el-menu>

</template>

<script>
export default {
  name: "Aside",
  methods:{
    tip(){
    },
    toAbout(){
      this.$router.push({
        name:'about'
      })
    },
    toAdvice(){
      this.$router.push({
        name:'advice'
      })
    },
    toMyPost(){
      this.$router.push({
        name:'mypost'
      })
    }
  }
}
</script>

<style scoped>

</style>
