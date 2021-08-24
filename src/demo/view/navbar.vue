<template>
  <div>
    <gourd-nav-bar @click-left="left" @click-right="right" title="葫芦侠" left-icon="el-icon-arrow-left" right-icon="el-icon-message-solid">
      <span slot="left">返回</span>
    </gourd-nav-bar>
    
	<gourd-nav-bar @click-left="left" @click-right="right" title="插入图片作为icon">
      <img src="../../assets/navbar/ic_class_add.png" slot="left" alt="">
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>

	<gourd-nav-bar @click-left="left" @click-right="right" title="固定顶部" fixed>
      <img src="../../assets/navbar/ic_class_add.png" slot="left" alt="">
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>
  </div>
</template>

<script>
export default {
	data() {
		return {
			fals: false
		};
	},
	methods: {
		left() {
			console.log('哈哈哈');
			this.fals = this.fals;
		},
		right() {
			console.log('友');
		}
	}
};
</script>

<style scoped>
.gourd-nav-bar:nth-child(2) {
	margin: 5px 0;
}
</style>