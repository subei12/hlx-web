<template>
  <div id="app">

    <keep-alive :include="keepComponent">
      <router-view></router-view>
    </keep-alive>
    <gourd-dialog v-model="show" class="dialog">
      <span slot="title">提示</span>
      <span>使用手机端打开可以获得更好的体验</span>
      <!-- <div>
        <img src="./assets/demo-gourd.png" alt="">
      </div> -->
      <template slot="footer">
        <gourd-button @click="show = false">确定</gourd-button>
      </template>
    </gourd-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			show: false
		};
	},
	computed: {
		...mapState(['keepComponent'])
	},
	mounted() {
		if (!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
			this.show = true;
		}
	}
};
</script>

<style scoped>
.dialog {
  position: absolute;
  text-align: center;
}

.dialog img{
  margin-top: 10px;
  width: 150px;;
}
</style>
