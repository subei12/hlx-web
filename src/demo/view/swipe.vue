<template>
  <div class="box">
    <h1 @click="ck('0')">上一张</h1>
    <h1 @click="ck('1')">下一张1</h1>

    <gourd-swipe ref="sw">
      <gourd-swipe-item text="【原创开发】很爱很爱你，哈啊！">
        <img src="../../assets/swipe/1.png" alt="">
      </gourd-swipe-item >
      <gourd-swipe-item text="【原创开发】很爱很爱你，哈啊！阿斯哦欸宋蔼宅宅和·1安随啊u是">
        <img src="../../assets/swipe/2.png" alt="">
      </gourd-swipe-item>
      <gourd-swipe-item text="【原创开发】很爱很爱你，哈啊！阿斯哦欸宋蔼宅宅和·1安随啊u是">
        <img src="../../assets/swipe/3.png" alt="">
      </gourd-swipe-item>
      <gourd-swipe-item text="【原创开发】很爱很爱你，哈啊！阿斯哦欸宋蔼宅宅和·1安随啊u是">
        <img src="../../assets/swipe/4.png" alt="">
      </gourd-swipe-item>
    </gourd-swipe>

  </div>
</template>

<script>
export default {
	data() {
		return {
			val: ''
		};
	},
	methods: {
		ck(type) {
			if (type == 1) {
				this.$refs.sw.next();
			} else {
				this.$refs.sw.prev();
			}
		}
	}
};
</script>

<style scoped>
.box {
	margin: 0 4px;
}

h1{
  margin: 20px 0;
}
</style>
