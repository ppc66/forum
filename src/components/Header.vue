<template>
  <div style="height: 70px;line-height: 50px;border-bottom: 1px solid whitesmoke;display: flex">
    <div style="width: 200px;padding-left: 30px;font-weight: bold;color: #afbac4">
      <router-link style="text-decoration-line: none;font-size: 30px;color: #a69292" to="/">首页</router-link>
    </div>
    <div style="flex: 1;"></div>
    <div v-if="$store.state.user.username || user" style="width: 200px;padding-left: 50px" >
      {{$store.state.user.username  || user.data.username}} &nbsp;&nbsp;&nbsp;&nbsp;
      <el-dropdown :hide-on-click="false">
    <span class="el-dropdown-link">
      <el-icon  class="el-icon--right" style="margin-top: 20px"><img :src=" $store.state.user.avatarUrl || user.data.avatarUrl || 'https://forum-demo.oss-cn-shanghai.aliyuncs.com/imgs/avatar/v2-6afa72220d29f045c15217aa6b275808_hd.png'" style="width:40px;height: 40px"><img/><arrow-down /></el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toEditInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="loginout">登出</el-dropdown-item>
            <el-dropdown-item>

            <el-badge :value="3"  class="item">回复我的</el-badge>

            </el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>待开发</el-dropdown-item>
            <el-dropdown-item divided>Action 6</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-else style="margin-right: 30px">
      <router-link to="/register">注册</router-link>&nbsp;&nbsp;&nbsp;
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name:'Header',
  data(){
    return {
      user:this.$nextTick(() => JSON.parse(localStorage.getItem("access-admin")))
    }
  },
  methods:{
    toEditInfo(){
      this.$router.push({
        name:'editInfo',
        query:{
          username:this.$store.state.user.username || this.user.data.username ,
          avatarUrl:this.$store.state.user.avatarUrl || this.user.data.avatarUrl,
          id:this.$store.state.user.id || this.user.data.id
        }
      })
    },
    loginout(){
      window.localStorage.removeItem("access-admin")
      location.reload();
    }
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("access-admin"))
  }
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>