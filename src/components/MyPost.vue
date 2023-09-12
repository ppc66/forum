<template>
  <div v-for="post in posts" :key="post.id" style="margin-top: 50px;display: flex">
    <div style="width: 40px;height:40px;">
      <span></span>

    </div>
    <div class="content" style="border-radius: 8px;width: 600px;padding-bottom: 15px;background-color: #42b983">
      <div style="margin: 15px auto auto 20px">{{post.content}}</div>
    </div>
    <span>{{post.postTime}}</span>
    <div class="btn">
      <el-badge :value="post.commentNum" class="item">
        <el-button size="medium" @click="toComment(post)">评论</el-button>
      </el-badge>

      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-badge :value="post.likeNum" class="item" type="warning">
        <!-- todo 不知道如何在前端实现点一下+1 再点一下-1 后端已完成  定义一个isliked就行 问题是用户第二次进来怎么办 不行 后端必须在价一个字段才行
         todo 要么就把数据全部放到store用vuex 但感觉这样不符合规范 烦 感觉还是要加字段 根据当前用户id查redis 如果能查到 就是true 其他的就是 false 烦-->
        <el-button size="medium" @click="like(post)">点赞</el-button>
      </el-badge>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-badge class="item" type="warning">
        <el-button size="medium" @click="deletePost(post)">删除</el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPost",
  data(){
    return {
      posts:[{
        id:'',
        username:'',
        postId:'',
        content:'',
        postTime:'',
        commentNum:'',
        replyNum:'',
        likeNum:'',
        avatarUrl: '',
        isliked:false
      }],
    }
  },
  methods:{
    toComment(post){
      this.$router.push({
        name:'comment',
        query:{
          postId:post.postId,
          username:post.username,
          content:post.content,
          avatarUrl: JSON.parse(localStorage.getItem("access-admin")).data.avatarUrl
        }
      })
    },
    getMyPosts(){
      let user = JSON.parse(localStorage.getItem("access-admin")).data;
      this.axios.get(`http://192.168.2.148:9090/post/me/allPosts/${user.id}`)
          .then((resp) => {
            this.posts = ''
            this.posts = resp.data.data
            // for (let i = 0; i < this.posts.; i++) {
            //
            // }
          },(error) => {
            console.log("获取post 服务器异常")
          })
    },
    like(post){
      post.isliked ? post.likeNum-- : post.likeNum++;
      post.isliked = !post.isliked;
      console.log(post.isliked)
      let user = JSON.parse(localStorage.getItem("access-admin")).data;
      this.axios.get('http://192.168.2.148:9090/post/like/'+post.postId+'/' + user.id,{
        headers:{
          authorization:user.token
        }
      }).then(
          (resp) =>{
            this.$message.success(resp.data.data)
          },
          (error) => {
            this.$message.error('服务器异常')
          }
      )
    },
    deletePost(post){
      this.posts.splice(post.index,1)
      this.axios.delete("http://192.168.2.148:9090/post/delete/" + post.postId).then(
          (resp) => {
            console.log("进入axios")
            this.$message.success(resp.data.data);
          },
          err => {
            this.$message.error(err);
          }
      )
    }
  },
  mounted() {
    this.$bus.on('addPost',(data) => {
      this.posts.unshift(data);
    })
    let item = localStorage.getItem("access-admin");
    if (!item){
      this.$message.warning("请先登录！")
      return
    }
    this.getMyPosts()
  },
}
</script>

<style scoped>
.content{
  margin-left: 70px;
}
.btn{
  margin-top: 76px;
  margin-left: -80px;
}
</style>