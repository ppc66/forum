<template>
  <div v-for="comment in comments" :key="comment.id" style="margin-top: 50px;display: flex">
    <div style="width: 40px;height:40px;">
      <img
          style="width:40px;height: 40px"
          :src="comment.avatarUrl"
          alt="">
      <span>{{comment.username}}</span>
    </div>
    <div class="content" style="border-radius: 8px;width: 600px;padding-bottom: 15px;background-color: #8492a6">
      <div style="margin: 15px auto auto 20px">{{comment.content}}</div>
    </div>
    <span>{{comment.commTime}}</span>
<!--    <div class="btn">-->
<!--      <el-badge :value="comment.commentNum" class="item">-->
<!--        <el-button size="medium" @click="toComment(post)">评论</el-button>-->
<!--      </el-badge>-->
<!--      &nbsp;&nbsp;&nbsp;&nbsp;-->
<!--      <el-badge :value="post.likeNum" class="item" type="warning">-->
<!--        <el-button size="medium" @click.once="post.likeNum++">点赞</el-button>-->
<!--      </el-badge>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "Comments",
  data(){
    return {
      comments:{

      },
    }
  },
  props:['postId'],
  mounted() {
    this.$bus.on('addComment',(data) => {
      this.comments.unshift(data);
    })

    console.log(this.postId)
    this.$nextTick(() => this.axios.get(`http://192.168.2.148:9090/comment/all/${this.postId}`).then(
        (resp) => {
          console.log("@@@@",resp.data)
          this.comments = resp.data.data;
        },
        (error) =>{
          this.$message.error("获取评论失败!")
        }
    ))
  }
}
</script>

<style scoped>
.content{
  margin-left: 70px;
}
</style>