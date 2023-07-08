<template>
  <div class="container">
    <gourd-nav-bar @click-left="$globalFunctions.goBack($router)" fixed>
      <template slot="left">
        <img src="../../assets/post/ic_nav_back.png"  alt="">
        <span>{{category.title}}</span>
      </template>
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>

    <gourd-pull-refresh class="public" v-model="refresh" @refresh="getArticleInfo" success-text="刷新成功" :disabled="refreshDisabled">
      <gourd-list v-model="loading" @load="loadComment" :finished="finished" finished-text="我是有底线的">
        <!-- 文章标题 -->
        <gourd-title :title="post.title" :author="user.nick" :see="post.hit" :info="post.commentCount">
        </gourd-title>

        <article class="article">
          <!-- 作者 -->
          <gourd-post-card class="author" :uname="user.nick" floor="楼主" :medal="user.medalList | medal" :avatar="user.avatar">
            <template slot="tag">
              <!-- 性别 -->
              <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>{{user.age}}</gourd-tag>
              <!-- 版主 -->
              <gourd-tag v-if="isModerator(user.userID)" color="#33b5e5" small>版主</gourd-tag>
              <!-- 角色 -->
              <gourd-tag v-if="user.identityTitle" :color="user.identityTitle | identityColor" small>{{user.identityTitle}}</gourd-tag>
            </template>
          </gourd-post-card>

          <!-- 文章内容 -->
          <div class="article-content" v-html="handlerContent(post.detail||'')"></div>

          <!-- 图片 -->
          <div class="article-images">
            <gourd-image v-for="(imgUrl,index) in post.images" :key="index" fit="cover" :src="imgUrl"></gourd-image>
          </div>

          <!-- <h2 v-for="i  in 50">{{i}}</h2> -->
        </article>

        <!-- 评论 -->
        <div class="comment">
          <div class="comment-main">
            <div class="comment-top line-bottom">
              <span>评论<em class="comment-sum">{{post.commentCount}}</em></span>
            </div>
            <div>
              <gourd-post-card v-for="(item,index) in comments" :key="item.commentID" :medal="item.user.medalList | medal" :uname="item.user.nick" :uname-color="item.user.nickColor" :call="item.user.userID | isLandlord(post.user)" :floor="index | floor" :time="item.createTime | formatTime" :avatar="item.user.avatar">
                <template slot="tag">
                  <!-- 性别 -->
                  <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>{{item.user.age}}</gourd-tag>
                  <!-- 版主 -->
                  <gourd-tag v-if="isModerator(item.user.userID)" color="#33b5e5" small>版主</gourd-tag>
                  <!-- 角色 -->
                  <gourd-tag v-if="item.user.identityTitle" :color="item.user.identityTitle | identityColor" small>{{item.user.identityTitle}}</gourd-tag>
                </template>

                <!-- 回复 -->
                <div class="comment-post-card">
                  <blockquote class="comment-post-card--ref" v-if="item.refComment">
                    <em>回复</em>
                    <span>{{item.refComment.nick}}</span>
                    <div class="comment-post-card--row">{{item.refComment.text}}</div>
                  </blockquote>

                  <!-- 评论内容 -->
                  <div class="comment-post-card--row">{{item.text}}</div>
                </div>
              </gourd-post-card>
            </div>
          </div>
        </div>
      </gourd-list>

    </gourd-pull-refresh>

  </div>
</template>

<script>
import { handlerContent } from '../../common/js/article';

export default {
	name: 'Article',
	props: ['postID'],
	data() {
		return {
			loading: false,
			finished: false,
			refresh: false,
			refreshDisabled: false,
			timer: '',
			comments: [],
			// 帖子信息
			post: {},
			// 作者
			user: {},
			// 模块信息
			category: {
				moderator: []
			},
			categoryID: '',
			sendParams: {
				post_id: this.$route.params.postID,
				page_no: 1,
				page_size: 20
			},
			totalPage: ''
		};
	},
	methods: {
		// 加载更多评论
		async loadComment() {
      
			if (this.sendParams.page_no >= this.totalPage) {
				this.finished = true;
				this.loading = false;
				return;
			}

			const { msg, currPageNo, pageSize, totalPage, comments } = await this.http.get('/post/detail/ANDROID/4.2.2', {
				params: this.sendParams
			});

			if (msg) {
				console.log('加载更多评论失败:' + msg);
				return;
			}

			this.sendParams.page_no = currPageNo + 1;
			this.sendParams.page_size = pageSize;
			this.totalPage = totalPage;

			this.comments = this.comments.concat(comments);
			this.loading = false;
		},
		// 初始化数据
		async getArticleInfo() {
			const { msg, comments, post, totalPage, currPageNo, pageSize } = await this.http.get('/post/detail/ANDROID/4.2.2', {
				params: {
					post_id: this.postID,
					page_no: 1,
					page_size: 20
				}
			});

			if (msg) {
				console.log('获取帖子信息失败');
				return;
			}

			// 模块信息
			this.category = post.category;

			// 作者
			this.user = post.user;

			this.post = post;
			this.comments = comments;
			this.totalPage = totalPage;

			this.sendParams.page_no = currPageNo + 1;
			this.sendParams.page_size = pageSize;

			// 关闭下拉刷新
			this.refresh = false;

			console.log(post);
			console.log(comments);
		},
		isModerator(userID) {
			return this.category.moderator.some(item => item.userID === userID);
		},
		handlerContent(val) {
			return handlerContent(val);
		}
	},
	filters: {
		floor(val) {
			return val + 1 + '楼';
		},
		isLandlord(val, landlordUser) {
			if (val === landlordUser.userID) {
				return '楼主';
			}
			return '';
		},
		identityColor(role) {
			switch (role) {
				case '大当家':
					return '#bd07bd';
				case '二当家':
					return '#fc26c7';
				case '三当家':
					return '#d50e1b';
			}
		},
		medal(medalList) {
			if (medalList && Array.isArray(medalList)) {
				return medalList.map(item => item.url);
			}
			return [];
		}
	},
	mounted() {
		this.getArticleInfo();
	}
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
</style>