<template>
  <div>
      <el-card class="box-card">
        <div  class="text item">
          <!--     发布     -->
          <div style="position:sticky;text-align: center">
            <div v-if="user">
              <div style="width: 48px;height:48px;transform: translate(0px, 0px);">
                <img
                    style="width:40px;height: 40px"
                    :src="user.data.avatarUrl"
                    alt="">
                <span>{{user.data.username}}</span>
              </div>
            </div>
            <div>
              <el-form ref="form"  :model="form" label-width="80px">
                <el-form-item label="">
                  <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="">
                  <el-input type="hidden" v-model="form.userId"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="plain" @click="onSubmit">立即发布</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!--     帖子内容     -->
          <MyPost/>

        </div>
      </el-card>
  </div>
</template>

<script>
import getDate from "../utils/DateUtil";
import MyPost from "../components/MyPost";
export default {
  name: "Home",
  data(){
    return {
      form:{
        userId:'',
        content:'',
      },
      user:''
    }
  },

  components:{
    MyPost,
  },
  created() {
    var user = JSON.parse(window.localStorage.getItem("access-admin"));
    if (user){
      this.user = user
      this.form.userId = this.user.data.id
    }
  },
  methods:{
    onSubmit(){
      var user = JSON.parse(localStorage.getItem("access-admin"));
      //全局事件总线 前端实现发布帖子直接显示  这儿就不用vuex了



      if (user == null){
        this.$message.error("请登录后在进行后续操作!")
        return
      }
      this.axios.post('http://192.168.2.148:9090/post',this.form,{
        headers: {
          authorization: user.data.token
        }
      }).then((resp) => {
        this.$bus.emit('addPost',{
            username:user.data.username,
            postId:'',
            content:this.form.content,
            postTime:getDate(),
            commentNum:'',
            replyNum:'',
            likeNum:'',
            avatarUrl: user.data.avatarUrl
          })
            this.$message({
              message: '恭喜你，发布成功!',
              type: 'success'
            });
          },
          (error) => {
            console.log(error)
            if (error.response.status === 401){
              this.$message.warning("登录信息已失效，请重新登录")
            }
          }
      ).finally(() => {
        // this.$router.go(0)

          this.form.content = ''
      })

    }
  }
}
</script>

<style scoped>
textarea{
  margin-top: 10px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  background-color: #7fe7cd;
  width: 1100px;
  margin-left: 150px;
  margin-top: 30px;
}


</style>