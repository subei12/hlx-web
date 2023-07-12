<template>
  <div class="community" ref="community" @scroll="communityScroll">
    <gourd-nav-bar title="葫芦侠社区" @click-right="$router.push('/messages')" fixed>
      <img src="../../assets/navbar/ic_class_add.png" slot="left" alt="">
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>

    <div class="swipe">
      <gourd-swipe>
        <gourd-swipe-item :text="item.title" v-for="item in slideLists" :key="item.postId">
          <img :src="item.coverUrl" alt="">
        </gourd-swipe-item>
      </gourd-swipe>
    </div>

    <gourd-cell-group :title="item.group.title" align="grid" :key="index" v-for="(item,index) in categoryLists">
      <gourd-cell :title="childItem.title" link :arrow="false" @click="cellClick(childItem)" :key="childItem.categoryID || key" v-for="(childItem,key) in item.children">
        <img :src="childItem.icon" slot="prefix" alt="">
        <gourd-badge v-if="childItem.categoryID === 0 || childItem.categoryID === 94" slot="suffix"></gourd-badge>
      </gourd-cell>
    </gourd-cell-group>
    <div class="flag"></div>

    <gourd-dialog v-model="showDialog">
      <span slot="title">提示</span>
      <template slot="footer">
        <gourd-button @click="showDialog = false">确定</gourd-button>
      </template>
      <span>此模块暂时没有开放</span>
    </gourd-dialog>

  </div>
</template>

<script>
export default {
	data() {
		return {
			slideLists: [],
			categoryLists: [],
			timer: '',
			showDialog: false
		};
	},
	methods: {
		cellClick(item) {
			let id = item.categoryID;
			// 活动 94 关注 0
			if (id === 94 || id === 0) {
				this.showDialog = true;
			} else {
				this.$router.push({
					name: 'postList',
					params: {
						categoryID: id
					}
				});
			}
		},
		communityScroll(e) {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				sessionStorage.setItem(
					'scroll',
					JSON.stringify({
						community: e.target.scrollTop
					})
				);
			}, 15);
		},
		async getSlideLists() {
			var result = await this.http.get('/post/slide/ANDROID/4.1');

			if (result.msg) {
				return console.log('获取轮播图数据失败');
			}
			this.slideLists = result.postList;
		},
		async getCategoryLists() {
			var categoryLists = window.sessionStorage.getItem('categoryLists');

			try {
				this.categoryLists = JSON.parse(categoryLists);
				if (this.categoryLists) return;
			} catch (err) {}

			var { categories, msg } = await this.http.get('/category/list/ANDROID/2.0');

			if (msg) {
				console.log('获取社区列表失败');
				return;
			}
			console.log(categories);

			var arr = [],
				i = 0;

			categories.forEach((item, index) => {
				if (item.type == 1) {
					arr.push({
						group: item,
						children: []
					});
					i++;
				} else {
					arr[i - 1].children.push(item);
				}
			});

			window.sessionStorage.setItem('categoryLists', JSON.stringify(arr));

			this.categoryLists = arr;
		}
	},
	mounted() {
		this.getSlideLists();

		this.getCategoryLists();
	},
	activated() {
		this.$parent.updateActive(this.$route.path);
		try {
			var { community } = JSON.parse(sessionStorage.getItem('scroll'));
		} catch (err) {}

		this.$refs.community.scroll(0, community);
	}
};
</script>

<style scoped >
.swipe {
	margin: 2px 2px 0;
}

.community {
	height: calc(100% - 46px);
	margin-top: 46px;
	overflow: auto;
}

.flag {
	height: 10px;
	background-color: #f0f0f0;
}
</style>