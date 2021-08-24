<template>
  <div>
    <div>
      <h2>插槽slots</h2>
      <ul>
        <li>default默认内容</li>
        <li>pulling（下拉过程中顶部内容 ）</li>
        <li>loosing（释放过程中顶部内容）</li>
        <li>loading（加载过程中顶部内容 ）</li>
        <li>success（刷新成功提示内容）</li>
      </ul>
    </div>
    <h2 @click="y = !y">点我加载（true加载false加载完成）{{y}}</h2>
    <gourd-pull-refresh v-model="y" @refresh="ck" :disabled="flag" success-text="刷新成功">
      <!-- <div slot="pulling">请下拉刷新</div>
      <div slot="loosing">释放即可刷新</div>
      <div slot="loading">正在加载中</div>
      <div slot="success">加载完成</div> -->
	  <ul>
		  <li v-for="(item,index) in 50" :key="index">{{item}}</li>
	  </ul>
    </gourd-pull-refresh>
  </div>
</template>

<script>
export default {
	data() {
		return {
			y: false
		};
	},

	methods: {
		ck() {
	

			// for(var i=0 ; i<50;i++){
			//     console.log('77');

			// }

			// setTimeout(() => {
			// 	this.y = false;
			// }, 2000);
		}
	},
	mounted() {
		// console.log(this.$parent);
		console.log(this.$parent);
	},
	computed: {
		flag() {
			if (this.$parent.top === 0) {
				return false;
			} else {
				return true;
			}
		}
	}
};
</script>

<style>
</style>