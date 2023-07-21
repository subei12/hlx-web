<!-- 发送消息窗口 -->
<template>
  <div class="container" >
    <gourd-nav-bar  @click-left="$globalFunctions.goBack($router)" @click-right="submit" fixed>
      <template slot="left">
        <img src="../../assets/post/ic_nav_back.png"  alt="">
        <span>回复</span>
      </template>
      <template slot="right">
        <span>提交</span>
      </template>
    </gourd-nav-bar>

    <!-- 评论 -->
    <div class="comment">
      <div class="comment-main">
        
        <div>
          <gourd-post-card v-model="commentItem"  :medal="commentItem.user.medalList | medal" :uname="commentItem.user.nick" :uname-color="commentItem.user.nickColor" :time="commentItem.createTime | formatTime" :avatar="commentItem.user.avatar" >
            <template slot="tag">
              <!-- 性别 -->
              <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>{{commentItem.user.age}}</gourd-tag>
              <!-- 角色 -->
              <gourd-tag v-if="commentItem.user.identityTitle" :style="{ background: $globalFunctions.decimalToHexColor(commentItem.user.identityColor) }" small>{{commentItem.user.identityTitle}}</gourd-tag>
            </template>
            <template slot="bottom">
              <blockquote class="comment-post-card--ref" v-if="commentItem.post">
                <span>{{commentItem.text}}</span>
              </blockquote>
            </template>
          </gourd-post-card>
          
        </div>

        <!-- 编辑框 文本域 -->
        <div class="comment-textarea">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 15}"
            placeholder="填写内容，5-2000个字符。"
            minlength = "5"
            maxlength = "2000"
            show-word-limit
            v-model="commentText">
          </el-input>
        </div>
        <!-- 功能栏 -->
        <div class="feature">
          <!-- <gourd-button type="success" icon="el-icon-search" circle></gourd-button> -->
          <gourd-button icon="el-icon-camera" circle @click="imagesShow = !imagesShow"></gourd-button>
          <gourd-button icon="el-icon-user" circle></gourd-button>
        </div>
        <div v-show="imagesShow">
          <el-upload
            action=""
            list-type="picture-card"
            ref="upload"
            
            :http-request="upload"
            :on-success="success"
            :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>

      </div>
    </div>
     
  </div>  
</template>

<script>
import Dialog from '../../demo/view/dialog.vue';

export default {
  components: {Dialog   },
	name: 'SendMessage',
	props: ['commentItem'],
	data() {
		return {
			commentText: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imagesShow: false, //控制上传图片是否显示
      images: '', //图片 多个用逗号分割
      count: 0, // 计数器，表示文件已上传的数量
		};
	},
	methods: {
		handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 自定义上传函数
    async handleBeforeUpload(file) {
      // if(!file){
      //   return false;
      // }
      // var params = {};
      // const result = await this.$api.uploadImg(params, file);
      // console.log(result);
      // if(!result && result.status == 0){
      //   console.log(result.msg);
      //   alert(result.msg);
      // }
      // // 上传成功
      // if (!this.images) {
      //   this.images = result.fid;
      // } else {
      //   this.images = this.images + ',' + result.fid;
      // }
      // return false; // 阻止自动上传
    },
    // 提交回复 
    submit() {
      // 手动上传
      this.$refs.upload.submit();
    },
    // 上传文件
    upload (params) {
      // 覆盖掉默认上传
      console.log('上传中...');
      return new Promise((resolve, reject) => {
        let success = false; 
        const result = this.$api.uploadImg({}, params.file);
        console.log(result);
        if(!result && result.status == 0){
          console.log(result.msg);
        }else{
          success = true;
        }
        if (success) {
          resolve(result); // 上传成功，传递成功的结果
        } else {
          reject(new Error("上传失败")); // 上传失败，传递失败的错误
        }
      });
      
    },
    async sendMessage(){
      // 文件上传完成后，继续执行提交回复的逻辑
      console.log('提交回复');
      var params = {
        post_id: this.commentItem.post.postID,
        comment_id: this.commentItem.commentID,
        text: this.commentText,
        images: this.images
      };
      const result = await this.$api.sendMessage(params);
      this.$message({
        showClose: true,
        message: result.msg,
        type: result.status == 1 ? 'success' : 'error'
      });
      // 返回上一页
      if(result.status == 1){
        this.$globalFunctions.goBack(this.$router)
      }
    },
    // 文件上传成功时的钩子
    success(response, file, fileList){
      this.count = this.count + 1;
      if (!this.images) {
        this.images = response.fid;
      } else {
        this.images = this.images + ',' + response.fid;
      }
      // 全部文件上传完毕后提交回复
      if(this.count == fileList.length){
        this.sendMessage();
      }
      
    },
	},
	mounted() {
    console.log(this.commentItem);
	},
  filters: {
		
		medal(medalList) {
			if (medalList && Array.isArray(medalList)) {
				return medalList.map(item => item.url);
			}
			return [];
		}
	},
};
</script>

<style scoped>
.container {
	margin-top: 46px;
	height: calc(100% - 46px);
	overflow: auto;
}

.public {
	height: 100%;
}

/* .article:active {
	background-color: #eeeeee;
} */

.article-content {
	padding: 10px;
	line-height: 1.5;
	color: #686868;
	font-size: 14px;
	user-select: none;
}

.comment {
	padding-top: 10px;
	background-color: #eeeeee;
}

.comment-main {
	background-color: #fff;
}
.comment-top {
	padding: 10px 12px;
	color: #646464;
	font-size: 14px;
}

.comment-sum {
	margin-left: 4px;
	font-size: 14px;
	font-style: normal;
}

.comment-post-card {
	flex: 1;
}

.comment-post-card--ref {
	margin-bottom: 6px;
	padding: 10px;
	color: #a9a9a9;
	background-color: #f0f0f0;
	border-radius: 2px;
}

.comment-post-card--ref em {
	font-style: normal;
	margin-right: 4px;
}

.comment-post-card--ref .demo-post-card--row {
	margin-top: 10px;
	color: #646464;
}

.comment-textarea {
  display: flex; 
  flex-direction: column; 
  height: 100%;
}

.feature {
    background: #f6f2f2;
    height: 100%;
    padding: 5px;
}


</style>