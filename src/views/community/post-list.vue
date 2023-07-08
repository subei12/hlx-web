<template>

  <div class="container" ref="container" @scroll="containerScroll">
    <gourd-nav-bar fixed ref="nav">
      <template slot="left">
        <img src="../../assets/post/ic_nav_back.png" @click="$globalFunctions.goBack($router)" alt="">
        <button id="sort-btn" @click="isShow = !isShow" @blur="blur">{{showSortText}}</button>
      </template>
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>
    <div class="sort line-bottom" v-show="isShow">
      <button :class="post.sort_by === 0 ? 'active':''" @click.stop.prevent="sortFun(0,'按回复时间')">按回复时间</button>
      <button :class="post.sort_by === 1 ? 'active':''" @click.stop.prevent="sortFun(1,'按发布时间')">按发布时间</button>
      <button :class="post.sort_by === 2 ? 'active':''" @click.stop.prevent="sortFun(2,'按版本精华')">按版本精华</button>
    </div>

    <div class="info">
      <div class="icon">
        <img :src="category.icon" alt="">
      </div>
      <div class="content">
        <h2 v-text="category.title"></h2>
        <!-- <div>实用软件</div> -->
        <div class="glory">
          <span>热度<em v-text="category.viewCountFormated"></em></span>
          <span>话题<em v-text="category.postCountFormated"></em></span>
        </div>
        <div class="moderator">
          <div>

            <groud-image-group more-fixed overflow="hidden">
              <gourd-image v-for="item in moderator" :key="item.userID" width="22" height="22" round :src="item.avatar"></gourd-image>
            </groud-image-group>

          </div>
        </div>
      </div>
    </div>

    <!-- 签到 -->

    <div class="tools">
      <div>
        <button>
          <img src="../../assets/button/icon_topic_tarento.png" alt="">达人堂
        </button>
      </div>
      <div>
        <button>
          <img src="../../assets/button/icon_topic_signin.png" alt="">
          签到
        </button>
      </div>
    </div>

    <!-- 模块公告 -->
    <div class="notice">

      <gourd-title v-for="item in topPostWeight" :key="item.postID" @click="titleClick(item)" :title="item.title">
        <template slot="title-prefix">
          <gourd-tag type="danger" small v-if="item.notice === 1">公告</gourd-tag>
          <gourd-tag type="warning" small v-else>置顶</gourd-tag>
        </template>
      </gourd-title>

    </div>

    <!-- tabs内容 -->

    <div class="tabs-content">

      <gourd-tabs v-model="active" :distance="46" ref="tabs" @change="tabChange" @tab-content-move="tabContentMove" @tab-content-start="tabContentStart">
        <gourd-tab v-for="(item,tagIndex) in tags" :key="item.ID" title="哈哈" :height="tabHeight">
          <span slot="title">{{item.name}}</span>

          <gourd-pull-refresh v-model="item.refresh" disabled>
            <gourd-list v-model="item.listLoading" ref="lists" :height="tabHeight" :disable-scroll="false" @load="listLoad(item,tagIndex)">
              <gourd-title v-for="postItem in item.posts" :key="postItem.postID" @click="titleClick(postItem)" :describe="postItem.detail" :title="postItem.title" :covers="postItem.detail | parseImg(postItem.images)" :author="postItem.user.nick" :see="postItem.hit" :info="postItem.commentCount" :time="postItem.createTime | formatTime">
                <template slot="title-prefix">
                  <!-- 葫芦数 -->
                  <gourd-badge v-if="postItem.score" :value="'+'+postItem.score" :max="99" square small></gourd-badge>
                  <gourd-tag type="success" small>新</gourd-tag>

                </template>
              </gourd-title>
            </gourd-list>
          </gourd-pull-refresh>

        </gourd-tab>

      </gourd-tabs>

    </div>

    <!-- 加载遮罩层 -->
    <gourd-overlay v-model="overlayMask" region color="#fff">
      <div class="overlay-wrap">
        <gourd-loading size="26"></gourd-loading>
      </div>
    </gourd-overlay>

  </div>

</template>


<script>
import tweenAnimation from '../../tools/tweenAnimation';

import { parseImg } from '../../common/js/article';

export default {
	name: 'PostList',
	data() {
		return {
			timer: '',
			showSortText:'按回复时间',
			overlayMask: true,
			test: false,
			scroll: true,
			post: {
				sort_by: 0
			},
			active: 0,
			distance: {
				navHeight: 0,
				tabsTop: 0,
				wrapHeight: 0
			},
			category: {},
			tags: [],
			weightAndTopPost: [],
			el: {},
			posts: [],
			startTop: 0,
			scrollTop: 0,
			isShow: false
		};
	},
	mounted() {
		this.el = this.$refs.container;

		this.$nextTick(() => {
			this.distance.navHeight = this.$refs.nav.$el.offsetHeight;
			this.distance.tabsTop = this.$refs.tabs.offsetTop;
			this.distance.wrapHeight = this.$refs.tabs.$refs.wrap.offsetHeight;
		});

		this.$store.commit('setKeep', 'PostList');

		this.initData();
	},
	methods: {
		containerScroll(e) {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.scrollTop = e.target.scrollTop;
			}, 15);
		},
		async sortFun(sort,sortText) {
			// sort_by(排序) 0 => 按回复时间 1 => 按发布时间 2 => 按版本精华
			this.post.sort_by = sort;
			this.showSortText = sortText;

			var currentTag = this.tags[this.active];

			currentTag.refresh = true;
			currentTag.sort_by = sort;
			currentTag.start = 0;

			this.$refs.lists[this.active].scroll(0, 0);

			this.setItemData(currentTag, true);
		},
		blur() {
			setTimeout(() => {
				this.isShow = false;
			});
		},
		tabContentStart() {
			this.startTop = this.el.scrollTop;
		},
		tabContentMove(index) {
			if (Math.ceil(this.el.scrollTop) >= Math.ceil(this.el.scrollHeight) - Math.ceil(this.el.clientHeight)) {
				this.scroll = false;
			} else {
				this.scroll = true;
			}
		},
		tabChange(index) {
			var item = this.tags[this.active];

			if (item.posts.length === 0 || item.sort_by !== this.post.sort_by) {
				item.sort_by = this.post.sort_by;
				item.start = 0;

				if (item.posts.length !== 0) {
					item.refresh = true;
					this.$refs.lists[this.active].scroll(0, 0);
				}

				this.setItemData(item, true);
			}

			// var maxScrollY = this.el.scrollHeight - this.el.clientHeight;
			// tweenAnimation(this.el, 'scrollY', this.el.scrollTop, maxScrollY, 200, 10, 'SineEaseOut');
			this.el.scroll(0, this.el.scrollHeight - this.el.clientHeight);
		},
		titleClick(postItem) {
			// console.log(postItem);
			this.$router.push({
				name: 'article',
				params: {
					postID: postItem.postID
				}
			});
		},
		async setItemData(item, restore = false) {
			// console.log(item);

			var { msg, posts, start } = await this.getData(item);

			if (msg) {
				console.log('获取数据失败');
				return;
			}

			item.listLoading = false;
			item.refresh = false;
			item.start = start;

			if (restore) {
				item.posts = posts;
			} else {
				item.posts = item.posts.concat(posts);
			}
		},
		async listLoad(item, index) {
			this.setItemData(item);
		},
		async initData(params) {
			var { msg, category, posts, weightAndTopPost, start } = await this.getData(params);

			if (posts.length === 0) {
				this.$router.push('/home');
				return;
			}

			if (msg) {
				console.log('获取列表数据失败');
				return;
			}

			if (category.tags.length === 0) {
				category.tags.push({
					name: category.title,
					ID: 0
				});
			}

			category.tags.forEach((item, index) => {
				if (index === 0) {
					item.start = start;
					item.posts = posts;
				} else {
					item.posts = [];
					item.start = 0;
				}
				item.listLoading = false;
				item.refresh = false;
				item.sort_by = this.post.sort_by;
			});

			this.category = category;
			// 置顶信息
			this.weightAndTopPost = weightAndTopPost;

			this.overlayMask = false;

			this.tags = category.tags;

			this.$nextTick(() => {
				this.$refs.tabs.tabContentChange();
			});
			console.log(this.tags);
		},
		async getData(params = { start: 0, ID: 0 }) {
			return await this.http.get('/post/list/ANDROID/4.1.8', {
				params: {
					cat_id: this.$route.params.categoryID,
					count: 20,
					tag_id: params.ID,
					sort_by: this.post.sort_by,
					start: params.start,
          market_id: 'floor_web'
				}
			});

			// this.tags[this.active].posts = data.posts;
		}
	},
	filters: {
		parseImg
	},
	computed: {
		tabHeight() {
			var sumHeight = this.el.offsetHeight;

			return sumHeight - this.distance.tabsTop - this.distance.wrapHeight + this.distance.tabsTop;
		},
		moderator() {
			const displayModerators = [];

			const moderator = this.category.moderator;

			if (Array.isArray(moderator)) {
				moderator.some(item => {
					if (displayModerators.length < 5) {
						displayModerators.push(item);
					} else {
						return true;
					}
				});
			}

			return displayModerators;
		},
		topPostWeight() {
			for (let i = 0; i < this.weightAndTopPost.length; i++) {
				for (let j = 0; j < this.weightAndTopPost.length - i; j++) {
					var before = this.weightAndTopPost[j];

					var after = this.weightAndTopPost[j + 1];

					if (!after) {
						after = {};
					}

					if (before.weight > after.weight) {
						this.weightAndTopPost[j] = this.weightAndTopPost[j + 1];

						this.weightAndTopPost[j + 1] = before;
					}
				}
			}

			return this.weightAndTopPost;
		}
	},
	activated() {
		this.$refs.container.scroll(0, this.scrollTop);
	}
};
</script>

<style scoped>
.tools {
	display: flex;
	height: 40px;
}

.tools > div {
	position: relative;
	display: flex;
	flex: 1;
}

.tools > div:last-child::before {
	display: block;
	position: absolute;
	top: 50%;
	left: -1px;
	width: 1px;
	height: 50%;
	content: '';
	background-color: #e6e6e6;
	transform: translateY(-50%);
}

.tools > div button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 10px;
	outline: none;
	border: none;
	color: #a1a1a1;
	font-size: 14px;
	background-color: #fafafa;
}

.tools > div button img {
	width: 20px;
	height: 20px;
	margin-right: 4px;
	/* vertical-align: middle; */
}

.tools > div button:active {
	background-color: #eeeeee;
}

.tabs-content {
	position: relative;
	padding: 10px 0 0;
	background-color: #f0f0f0;
}

#sort-btn {
	margin-left: 10px;
	color: #fff;
	font-size: 18px;
	outline: none;
	border: none;
	background-color: transparent;
}

.sort {
	display: flex;
	position: fixed;
	top: 46px;
	left: 0;
	right: 0;
	z-index: 20;
	width: 100%;
	max-width: 750px;
	height: 48px;
	margin: auto;
	background-color: #fff;
}

.sort button {
	flex: 1;
	outline: none;
	border: none;
	color: #979797;
	font-size: 14px;
	background-color: transparent;
}

.sort .active {
	color: #25ce6d;
}

.container {
	position: relative;
	height: calc(100% - 46px);
	margin-top: 46px;
	overflow: auto;
	box-sizing: border-box;
}

.scrpll-behavior {
	scroll-behavior: smooth;
}

.overlay-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}

.info {
	display: flex;
	padding: 10px;
	height: 68px;
	/* background-color: #666; */
}

.info .icon {
	width: 68px;
	height: 68px;
	border-radius: 4px;
	overflow: hidden;
}

.icon img {
	display: block;
	width: 100%;
	height: 100%;
}

.info .content {
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	margin-left: 10px;
}

.content > div,
.content > h2 {
	flex: 1;
}

.content > h2 {
	font-size: 14px;
}

.glory {
	font-size: 12px;
	color: #969696;
}

.glory span {
	margin-right: 8px;
}

.glory em {
	margin-left: 2px;
	color: #3bd27b;
	font-style: normal;
}

.moderator {
	display: flex;
	padding-right: 4px;
}

.moderator div {
	width: 100%;
	height: 100%;
}
</style>