<template>
  <div class="box">
    <h1 @click="ck" :data-val="value">11111</h1>
    <GourdTabbar @myClick="ck" v-model="value" :active-color="color" route :index="index">
        <gourd-tabbar-item icon="el-icon-s-custom" :key="index"  v-for="(item,index) in lists">空间</gourd-tabbar-item>
    
    </GourdTabbar>
  </div>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			index: 0,
      color: 'red',
      lists:['首页','空间']
		};
	},

	methods: {
		ck() {
			// console.log(++this.value);
		this.lists.push('发现')
		}
	},

	computed: {
		s() {
			return this.value;
		}
	}
};
</script>

<style scoped>
.box {
	padding: 5px;
	background-color: pink;
}
</style>