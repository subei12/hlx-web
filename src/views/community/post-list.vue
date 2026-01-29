<template>

  <div class="container" ref="container" @scroll="containerScroll">
    <gourd-nav-bar fixed ref="nav" @click-right="$router.push('/messages')">
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
        <gourd-tab v-for="(item,tagIndex) in tags" :key="item.ID" title="哈哈">
          <span slot="title">{{item.name}}</span>

          <!-- Single-scroll mode: outer .container handles scrolling; inner list must not scroll -->
          <gourd-pull-refresh v-model="item.refresh" disabled>
            <gourd-list
              v-model="item.listLoading"
              :finished="item.finished"
              :DisableScroll="true"
              @load="listLoad(item,tagIndex)"
            >
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
			// 记录上一次激活的 tab index（用于在 tabChange 时保存旧 tab 的 scrollTop）
			prevActive: 0,
			// tabs 从“未吸顶”滚到“吸顶”所需的阈值 scrollTop。
			// 关键点：这个值必须是“固定阈值”，不能在 tabs 已经吸顶后用 rect 差值去算，
			// 否则会变成“当前 scrollTop”，导致其它 tag 的位置被污染（切换后跳到很深处）。
			tabsStickyTop: 0,
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
			// tabs 是一个 Vue 组件，需要取 $el 才能拿到 offsetTop
			this.distance.tabsTop = this.$refs.tabs && this.$refs.tabs.$el ? this.$refs.tabs.$el.offsetTop : 0;
			this.distance.wrapHeight = this.$refs.tabs && this.$refs.tabs.$refs && this.$refs.tabs.$refs.wrap ? this.$refs.tabs.$refs.wrap.offsetHeight : 0;

			// 初始化吸顶阈值（在页面刚进入、tabs 尚未吸顶时测一次）
			this.updateTabsStickyTop();
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
				// 记录当前 tag 的滚动位置（用于切回时恢复）
				const current = this.tags && this.tags[this.active];
				if (current) {
					current.scrollTop = this.scrollTop;
					current._everActivated = true;
				}
				// 只要还能测到，就不断更新一次 tabsStickyTop（在未吸顶阶段有效）
				this.updateTabsStickyTop();
				// Single-scroll mode: trigger load-more based on outer container scroll
				this.maybeLoadMore();
			}, 15);
		},
		// 尝试更新 tabsStickyTop：只在 tabs 尚未吸顶时才更新。
		// 一旦吸顶（wrapRect.top≈containerRect.top），继续更新会把阈值误写成“当前滚动位置”。
		updateTabsStickyTop() {
			const containerEl = this.el;
			const wrapEl = this.$refs.tabs && this.$refs.tabs.$refs ? this.$refs.tabs.$refs.wrap : null;
			if (!containerEl || !wrapEl || !wrapEl.getBoundingClientRect) return;

			const containerRect = containerEl.getBoundingClientRect();
			const wrapRect = wrapEl.getBoundingClientRect();

			// 如果 wrap 还没吸顶（它的 top > container top），就可以用 rect 差值算出阈值
			// 一旦吸顶后 wrapRect.top≈containerRect.top，再用差值会变成“当前 scrollTop”，会误算。
			const delta = wrapRect.top - containerRect.top;
			if (delta > 1) {
				const stickyTop = Math.max(0, Math.round(containerEl.scrollTop + delta));
				this.tabsStickyTop = stickyTop;
			}
		},
		// 获取“让 tabs 进入吸顶状态”所需要滚动到的 container.scrollTop。
		// - 未吸顶：用 rect 差值换算
		// - 已吸顶：必须用缓存 tabsStickyTop（避免算成当前 scrollTop）
		getTabsStickyTop() {
			const containerEl = this.el;
			const wrapEl = this.$refs.tabs && this.$refs.tabs.$refs ? this.$refs.tabs.$refs.wrap : null;
			if (!containerEl || !wrapEl || !wrapEl.getBoundingClientRect) {
				return this.tabsStickyTop || this.distance.tabsTop || 0;
			}

			const containerRect = containerEl.getBoundingClientRect();
			const wrapRect = wrapEl.getBoundingClientRect();
			const delta = wrapRect.top - containerRect.top;

			// 如果当前已经吸顶（delta≈0），阈值应该用缓存的 tabsStickyTop，而不是当前 scrollTop
			if (Math.abs(delta) <= 1 && this.tabsStickyTop) {
				return this.tabsStickyTop;
			}

			// 未吸顶时，用差值换算阈值
			return Math.max(0, Math.round(containerEl.scrollTop + delta));
		},
		maybeLoadMore() {
			const current = this.tags && this.tags[this.active];
			if (!current) return;
			if (current.listLoading || current.finished) return;

			const el = this.el;
			if (!el) return;

			// Near bottom threshold
			const threshold = 220;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
				current.listLoading = true;
				this.$nextTick(() => {
					this.listLoad(current, this.active);
				});
			}
		},
		loadFinishedCheck(item, posts) {
			// Heuristic: if API returns fewer than requested, treat as finished
			if (Array.isArray(posts) && posts.length < 20) {
				item.finished = true;
			}
		},
		async sortFun(sort,sortText) {
			// sort_by(排序) 0 => 按回复时间 1 => 按发布时间 2 => 按版本精华
			this.post.sort_by = sort;
			this.showSortText = sortText;

			var currentTag = this.tags[this.active];

			currentTag.refresh = true;
			currentTag.sort_by = sort;
			currentTag.start = 0;

			// single-scroll: outer container scrolls
			this.el && this.el.scroll(0, 0);

			currentTag.finished = false;
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
			// 保存旧 tab 的滚动位置
			const oldIndex = this.prevActive;
			const oldItem = this.tags && this.tags[oldIndex];
			if (oldItem && this.el) {
				oldItem.scrollTop = this.el.scrollTop;
				oldItem._everActivated = true;
			}

			// 切换到新 tab（保险起见，这里手动同步 active，避免 v-model 时序差异）
			this.active = index;
			const item = this.tags && this.tags[index];
			if (!item) return;

			// 计算“让 tabs 吸顶”所需的 container.scrollTop。
			// 注意：tabsTop 不能直接用 offsetTop（它是相对 offsetParent 的），
			// 需要用 getBoundingClientRect 换算到滚动容器坐标系里。
			const tabsTop = this.getTabsStickyTop();

			// 切换 tag 时，强制让 tabs 进入吸顶状态。
			// 解释：新 tag 刚切过去时，列表内容可能还没渲染完成，scrollHeight 不够，
			// 这时滚到 tabsTop 会被浏览器“卡住”。因此我们先标记，
			// 等 setItemData 把数据渲染出来后再补一次滚动。
			item._forceStickyOnEnter = true;

			// 数据需要刷新/首次加载
			if (item.posts.length === 0 || item.sort_by !== this.post.sort_by) {
				item.sort_by = this.post.sort_by;
				item.start = 0;
				item.finished = false;
				this.setItemData(item, true);
			}

			// 滚动行为：
			// - 第一次进入某个 tag：滚到 tabsTop（吸顶位置）
			// - 回到已访问的 tag：恢复深度，但不得小于 tabsTop（保证切换后直接吸顶）
			const isFirstEnter = !item._everActivated;
			const savedTop = item.scrollTop ?? tabsTop;
			const targetTop = isFirstEnter ? tabsTop : Math.max(tabsTop, savedTop);

			const applyScroll = (top) => {
				if (!this.el) return;
				// 这里同时写 scrollTop + scroll/scrollTo，是为了兼容不同浏览器/内核在某些时序下忽略滚动的情况
				this.el.scrollTop = top;
				this.el.scroll(0, top);
				this.el.scrollTo && this.el.scrollTo(0, top);
			};

			// 连续滚动多次：立即 / nextTick+rAF / 延迟兜底
			// 目的：抵抗 tab 内容切换、图片加载、列表渲染带来的布局变化导致的“回弹/覆盖”
			applyScroll(targetTop);
			this.$nextTick(() => {
				requestAnimationFrame(() => applyScroll(targetTop));
				setTimeout(() => applyScroll(targetTop), 80);
				setTimeout(() => applyScroll(targetTop), 220);
			});

			item._everActivated = true;
			item.scrollTop = targetTop;

			this.prevActive = index;
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
			var { msg, posts, start } = await this.getData(item);

			if (msg) {
				console.log('获取数据失败');
				item.listLoading = false;
				item.refresh = false;
				return;
			}

			item.listLoading = false;
			item.refresh = false;
			item.start = start;
			this.loadFinishedCheck(item, posts);

			if (restore) {
				item.posts = posts;
			} else {
				item.posts = item.posts.concat(posts);
			}

			// 切换 tag 后“直接吸顶”的兜底：等数据渲染后再把 scrollTop 拉到 tabs 位置
			if (item._forceStickyOnEnter && this.tags && item === this.tags[this.active]) {
				item._forceStickyOnEnter = false;
				this.$nextTick(() => {
					requestAnimationFrame(() => {
						const containerEl = this.el;
						if (!containerEl) return;
						const stickyTop = this.getTabsStickyTop();
						containerEl.scrollTop = stickyTop;
						containerEl.scroll(0, stickyTop);
					});
				});
			}
		},
		async listLoad(item, index) {
			// In single-scroll mode, listLoad can be triggered by outer container scroll.
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
				item.finished = false;
				// 记录每个 tag 自己的滚动位置（外层容器 scrollTop）
				item.scrollTop = 0;
				// 标记该 tag 是否真正被用户切换访问过
				// - false：首次进入该 tag，需要强制滚到 tabs 吸顶位置（不展示上面内容）
				// - true：再次进入该 tag，恢复其 scrollTop（同时保证 >= tabsTop）
				item._everActivated = index === 0;
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
		// 优先恢复当前 tag 的滚动深度
		const current = this.tags && this.tags[this.active];
		const top = current && typeof current.scrollTop === 'number' ? current.scrollTop : this.scrollTop;
		this.$refs.container.scroll(0, top);
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

/* Single-scroll mode: make the tab bar sticky within the scroll container */
/* NOTE: gourd-tabs has `overflow: hidden` by default, which breaks sticky.
   We override it for this page so the tab bar can stick while the outer container scrolls. */
/* Single-scroll mode: make the tab bar sticky within the scroll container */
/*
  Sticky 并不是因为“变成一个列表”就失效。
  真正原因通常是：祖先元素有 overflow:hidden/auto 或 transform 导致 sticky 失效。
  gourd-tabs 默认 overflow:hidden，所以这里强制覆盖。
*/
.container /deep/ .gourd-tabs {
	overflow: visible !important;
}

.container /deep/ .gourd-tabs--wrap {
	position: sticky !important;
	top: 0 !important; /* .container 已经在 fixed nav 下面 */
	z-index: 15 !important;
	background: #fff;
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