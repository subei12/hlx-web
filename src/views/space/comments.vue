<template>
  <div class="container">
    <gourd-nav-bar  @click-left="$globalFunctions.goBack($router)" fixed>
      <template slot="left">
        <img src="../../assets/post/ic_nav_back.png"  alt="">
        <span>我的回复</span>
      </template>
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>

    <gourd-pull-refresh class="public" v-model="refresh" @refresh="getArticleInfo" success-text="刷新成功" :disabled="refreshDisabled">
      <gourd-list v-model="loading" @load="loadComment" :finished="finished" finished-text="我是有底线的">
        <!-- 评论 -->
        <div class="comment">
          <div class="comment-main">
            <div class="comment-top line-bottom">
              <span>评论<em class="comment-sum">{{post.commentCount}}</em></span>
            </div>
            <div>
              <gourd-post-card v-for="(item) in comments" :key="item.commentID" :medal="item.user.medalList | medal" :uname="item.user.nick" :uname-color="item.user.nickColor" :time="item.createTime | formatTime" :avatar="item.user.avatar">
                <template slot="tag">
                  <!-- 性别 -->
                  <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>{{item.user.age}}</gourd-tag>
                  <!-- 版主 -->
                  <gourd-tag v-if="isModerator(item.user.userID)" color="#33b5e5" small>版主</gourd-tag>
                  <!-- 角色 -->
                  <gourd-tag v-if="item.user.identityTitle" :style="{ background: $globalFunctions.decimalToHexColor(item.user.identityColor) }" small>{{item.user.identityTitle}}</gourd-tag>
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
                <template slot="bottom">
                  <blockquote class="comment-post-card--ref" v-if="item.post">
                    <div v-if="item.score" :style="{ 'margin-bottom': '5px' }">
                      <em>送出: </em>
                      <span :style="{ color: '#12c960' }">{{item.score}}</span>
                      <span>葫芦</span>
                    </div>
                    <div :style="{ 'margin-bottom': '5px' }">
                      <em>原帖: </em>
                      <span>{{item.post.title}}</span>
                    </div>
                    <div>
                      <em>版块: </em>
                      <span>{{item.category.title}}</span>
                    </div>
                  </blockquote>
                </template>
                
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
import dialog from '../../demo/view/dialog.vue';

export default {
  components: { dialog },
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
				user_id: 14057952,
				start: 0,
				count: 20
			},
			more: 0
		};
	},
	methods: {
		// 加载更多评论
		async loadComment() {
      
			if (this.more == 0) {
				this.finished = true;
				this.loading = false;
				return;
			}

			const { msg, start, more, comments } = await this.http.get('/comment/create/list/ANDROID/4.1.8', {
				params: this.sendParams
			});

			if (msg) {
				console.log('加载更多评论失败:' + msg);
				return;
			}

			this.sendParams.start = start;
      // 为1表示还有评论待加载
      this.more = more;

			this.comments = this.comments.concat(comments);
			this.loading = false;
		},
		// 初始化数据
		async getArticleInfo() {
      var { user } = JSON.parse(window.localStorage.getItem('user') || '{}');
			const { msg, comments, post, start, more } = await this.http.get('/comment/create/list/ANDROID/4.1.8', {
				params: {
					user_id: user.userID,
					start: 0,
					count: 20
				}
			});

			if (msg) {
				console.log('获取我的评论失败');
				return;
			}


			// 评论
			this.comments = comments;

      this.sendParams.user_id = user.userID;
			this.sendParams.start = start;
      // 为1表示还有评论待加载
      this.more = more;

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