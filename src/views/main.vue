<template>
  <div class="container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <gourd-tabbar route v-model="active">
      <gourd-tabbar-item icon="el-icon-s-cooperation" v-for="(item,index) in routes" :key="index" :name="item.path" :to="item.path">
        {{item.tabbarData.text}}
        <template slot="icon" slot-scope="{active}">
          <img :src="item.tabbarData.on" v-show="active" alt="">
          <img :src="item.tabbarData.off" v-show="!active" alt="">
        </template>
      </gourd-tabbar-item>

    </gourd-tabbar>
  </div>
</template>

<script>
import routes from '../router/bin/main';

let navs = routes.map(item => {
	return {
		path:item.path,
		tabbarData:item.tabbarData
	}
}).filter(item => item.path==='/community'||item.path==='/space');


export default {
	name: 'ViewMain',
	data() {
		return {
			active: '',
			routes: navs,
			timer: ''
		};
	},
	methods: {
		updateActive(val) {
			this.active = val;
		}
	},
	mounted() {
		this.updateActive(this.$route.path);
	},
	activated() {
		this.$store.commit('clearKeep', 'PostList');
	}
};
</script>

<style scoped>
.container {
	height: 100%;
	padding-bottom: 50px;
	overflow: hidden;
	box-sizing: border-box;
}
</style>

