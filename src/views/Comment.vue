<template>
  <div>
    <el-card class="box-card">
      <div  class="text item">
        <!--     帖子内容     -->
        <Post/>
        <div  style="margin-top: 50px;">
        <div style="width: 40px;height:40px;">
          <img
              style="width:40px;height: 40px"
              :src="post.avatarUrl"
              alt="">
          <span>{{post.username}}</span>
        </div>
        <div class="content" style="border-radius: 8px;width: 600px;padding: 10px 20px 30px 10px;height: fit-content;background-color: #42b983">
          <article style="margin: 15px auto auto 20px">{{post.content}}</article>
        </div>
          <br/>
          <br/>
          <br/>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="">
              <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input type="hidden" v-model="form.userId"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="plain" @click="onSubmit">评论</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      </div>
      <Comments :postId="form.postId" />
    </el-card>
  </div>
</template>

<script>
import Comments from "./Comments";
import getDate from "../utils/DateUtil";
export default {
  name: "Comment",
  data(){
    return {
      post:{
        content:'',
        postId:'',
        username:'',
        avatarUrl:''
      },
      form:{
        postId:'',
        content:'',
        userId:'',
      }
    }
  },
  components:{
    Comments
  },
  methods:{
    onSubmit() {
      var user = JSON.parse(localStorage.getItem("access-admin"));
      //全局事件总线 前端实现发布帖子直接显示  这儿就不用vuex了



      var user = JSON.parse(localStorage.getItem("access-admin"));
      if (user == null){
        this.$message.error("请先登录")
      }
      this.axios.post('http://192.168.2.148:9090/comment', this.form, {
        headers: {
          authorization: user.data.token
        }
      }).then(
          (resp) => {
            this.$bus.emit('addComment',{
            username:user.data.username,
            content:this.form.content,
            commTime:getDate(),
            avatarUrl: user.data.avatarUrl
          })
            console.log("formComment", this.form)
            this.$message.success("评论成功!")
          },
          (error) => {
            if (error.response.status === 401){
              this.$message.error('用户登录信息已失效,请重新登录!')
            }

          }
      ).finally(() => {
        this.form.content = '';
        // this.$router.go(0);
      })
    }
    //   this.axios.post('http://192.168.2.148:9090/comment',this.form).then(
    //       (resp) => {
    //         console.log("formComment",this.form)
    //         this.$message.success("评论成功!")
    //       },
    //       (error) => {
    //         this.$message.error('评论失败!')
    //       }
    //   ).finally(() => {
    //     this.form.content = '';
    //     this.$router.go(0);
    //   })
    // }
  },
  mounted() {
    this.post.content = this.$route.query.content;
    this.post.username = this.$route.query.username;
    console.log(this.$route.query.username);
    this.post.avatarUrl = this.$route.query.avatarUrl;
    this.form.postId = this.$route.query.postId;
    this.$store.commit("getPostId",this.$route.query.postId)
    var user = JSON.parse(window.localStorage.getItem("access-admin"));
    if (user){
      this.user = user
      this.form.userId = this.user.data.id
    }
  }
}
</script>

<style scoped>
.content{
  margin-left: 70px;
}
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