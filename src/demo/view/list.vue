<template>
  <div class="demo-list">
    <h2>list默认高度为100%，如果父容器没有高度需要指定高度</h2>
    <h2 @click="ck">通过scroll禁用滚动条</h2>
    <gourd-pull-refresh>
      <gourd-list v-model="k"  @load="load" height="300" :finished="finished" finished-text="没有更多啦">
        <h2 v-for="(item,index) in arr.length + 10" :key="index">{{item}}</h2>
      </gourd-list>
    </gourd-pull-refresh>

  </div>
</template>

<script>
export default {
	data() {
		return {
			k: false,
			arr:[1,2,3],
			finished:false
		};
	},
	methods: {
		load() {
			console.log('load事件');
			
			setTimeout(() => {
				this.k = false;
				this.arr.length += 20;
				
				if(this.arr.length >= 40){
					this.finished = true;
				}

				console.log(this.arr);
				
				
			}, 3000);
		},
		ck() {
			this.test[0].loading = !this.test[0].loading;
		}
	},
	computed: {}
};
</script>

<style scoped>
.demo-list {
	position: relative;
	/* height: 300px; */
}
</style>