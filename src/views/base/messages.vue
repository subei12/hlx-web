<template>
  <div class="container" ref="container" @scroll="handleScroll">
    <gourd-nav-bar  @click-left="$globalFunctions.goBack($router)" fixed>
      <template slot="left">
        <img src="../../assets/post/ic_nav_back.png"  alt="">
        <span>消息</span>
      </template>
    </gourd-nav-bar>


    <gourd-tabs v-model="typeId" :distance="46" ref="tabs" @change="tabChange" >
        <gourd-tab v-for="(item) in tags" :key="item.ID" title="哈哈" :height="height">
          <span slot="title">{{item.name}}</span>
          <gourd-pull-refresh class="public" v-model="refresh" @refresh="getArticleInfo" :disabled="refreshDisabled">
            <gourd-list v-model="loading" @load="loadComment" :finished="finished" finished-text="我是有底线的" >
              <!-- 评论 -->
              <div class="comment">
                <div class="comment-main">
                  
                  <div>
                    <gourd-post-card v-for="(item) in comments" :key="item.content.commentID" :medal="item.content.user.medalList | medal" :uname="item.content.user.nick" :uname-color="item.content.user.nickColor" :time="item.content.createTime | formatTime" :avatar="item.content.user.avatar">
                      <template slot="tag">
                        <!-- 性别 -->
                        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>{{item.content.user.age}}</gourd-tag>
                        <!-- 版主 -->
                        <gourd-tag v-if="isModerator(item.content.user.userID)" color="#33b5e5" small>版主</gourd-tag>
                        <!-- 角色 -->
                        <gourd-tag v-if="item.content.user.identityTitle" :style="{ background: $globalFunctions.decimalToHexColor(item.content.user.identityColor) }" small>{{item.content.user.identityTitle}}</gourd-tag>
                      </template>

                      <!-- 回复 -->
                      <div class="comment-post-card">
                        <blockquote class="comment-post-card--ref" v-if="item.content.refComment">
                          <em>回复</em>
                          <span>我的评论</span>
                          <div class="comment-post-card--row">{{item.content.refComment.text}}</div>
                        </blockquote>

                        <!-- 评论内容 -->
                        <div class="comment-post-card--row">{{item.content.text}}</div>
                      </div>
                      <template slot="post">
                        <blockquote class="comment-post-card--ref" v-if="item.content.post">
                          <div v-if="item.content.score" :style="{ 'margin-bottom': '5px' }">
                            <em>获得: </em>
                            <span :style="{ color: '#12c960' }">{{item.content.score}}</span>
                            <span>葫芦</span>
                          </div>
                          <div :style="{ 'margin-bottom': '5px' }">
                            <em>原帖: </em>
                            <span>{{item.content.post.title}}</span>
                          </div>
                          <div>
                            <em>版块: </em>
                            <span>{{item.content.category.title}}</span>
                          </div>
                        </blockquote>
                      </template>
                      
                    </gourd-post-card>
                  </div>
                </div>
              </div>
            </gourd-list>
          </gourd-pull-refresh> 
        </gourd-tab>
    </gourd-tabs>   

     
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
				type_id: 8, // 8表示我的社区消息
				start: 0,
				count: 20
			},
			more: 0,
      tags: [
        {
          "ID": 8,
          "name": "帖子"
        },
        {
          "ID": 1,
          "name": "系统"
        }
      ],
      typeId: 8,
      height: 0
		};
	},
	methods: {
		// 加载更多评论
		async loadComment() {
      console.log('底部到了');
			if (this.more == 0) {
				this.finished = true;
				this.loading = false;
				return;
			}

			const { msg, start, more, datas } = await this.$api.getMessages(this.sendParams);

			if (msg) {
				console.log('加载更多评论失败:' + msg);
				return;
			}

			this.sendParams.start = start;
      // 为1表示还有评论待加载
      this.more = more;

			this.comments = this.comments.concat(datas);
			this.loading = false;
		},
		// 初始化数据
		async getArticleInfo() {
			//const { msg, comments, post, start, more } = await this.http.get('/comment/create/list/ANDROID/4.1.8', {
      const { msg, datas, post, start, more } = await this.$api.getMessages(this.sendParams);
      console.log(msg);
			if (msg) {
				console.log('获取我的消息失败');
				return;
			}
      console.log(datas);

			// 评论
			this.comments = datas;

			this.sendParams.start = start;
      // 为1表示还有评论待加载
      this.more = more;

			// 关闭下拉刷新
			this.refresh = false;

		},
		isModerator(userID) {
			return this.category.moderator.some(item => item.userID === userID);
		},
		handlerContent(val) {
			return handlerContent(val);
		},
    // 切换选项卡
    tabChange(index) {
      console.log('点击了：' + index);
      this.sendParams.type_id = this.tags[index].ID;
      this.sendParams.start = 0;
      //this.comments = [];
      // 初始化数据
      this.getArticleInfo();
    },
    // 获得容器的高度
    handleScroll() {
      const container = this.$refs.container;
      const scrollHeight = container.scrollHeight; // 内容的总高度
      const scrollTop = container.scrollTop; // 滚动条距离顶部的距离
      const clientHeight = container.clientHeight; // 可见区域的高度

      // 判断是否滑动到了底部
      if (scrollHeight - scrollTop - clientHeight <= 1) {
        // 滑动到了底部，执行相应操作
        console.log('滑动到了底部');
      }

      // 获取容器的高度
      const containerHeight = container.offsetHeight;
      this.height = containerHeight;
      //console.log('容器的高度:', containerHeight);

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