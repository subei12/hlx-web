<template>
  <div class="demo-main" @scroll="scroll" ref="main">
    <h1 class="title">demo</h1>
    <ul>
      <li v-for="(item,index) in links" :key="index">
        <router-link :to="item.path">{{item.text}}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
const links = [
	{
		path: '/demo/button',
		text: 'button按钮'
	},
	{
		path: '/demo/cell',
		text: 'cell导航'
	},
	{
		path: '/demo/cellgroup',
		text: 'cellGroup'
	},
	{
		path: '/demo/tabbar',
		text: 'Tabbar'
	},
	{
		path: '/demo/swipe',
		text: 'swipe'
	},
	{
		path: '/demo/navbar',
		text: '导航条'
	},
	{
		path: '/demo/image',
		text: 'image'
	},
	{
		path: '/demo/imagegroup',
		text: 'imagegroup'
	},
	{
		path: '/demo/tabs',
		text: 'tabs'
	},
	{
		path: '/demo/tag',
		text: 'tag标签'
	},
	{
		path: '/demo/title',
		text: '帖子title'
	},
	{
		path: '/demo/test',
		text: 'test'
	},
	{
		path: '/demo/pullrefresh',
		text: '下拉刷新PullRefresh'
	},
	{
		path: '/demo/loading',
		text: 'loading'
	},
	{
		path: '/demo/list',
		text: 'list'
	},
	{
		path: '/demo/badge',
		text: 'badge'
	},
	{
		path: '/demo/overlay',
		text: 'overlay'
	},
	{
		path: '/demo/postcard',
		text: 'postcard明信片'
	},
	{
		path: '/demo/divider',
		text: 'divider分割线'
	},
	{
		path:'/demo/dialog',
		text:'dialog对话框'
	}
];

function shake(fun, time) {
	return () => {
		if (fun.timer) {
			clearTimeout(fun.timer);
		}

		fun.timer = setTimeout(() => {
			fun();
		}, time);
	};
}

export default {
	data() {
		return {
			links,
			top: 0,
			timer: ''
		};
	},
	methods: {
		scroll() {
			if (this.timer) {
				clearTimeout(this.timer);
			}

			this.timer = setTimeout(() => {
				this.handler();
			}, 50);
		},
		handler() {
			this.top = this.$refs.main.scrollTop;
		}
	}
};
</script>

<style scoped>
.title {
	text-align: center;
}

.demo-main {
	height: 100%;
	overflow: auto;
}
</style>