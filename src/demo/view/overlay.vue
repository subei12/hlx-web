<template>
  <div>

    <h2 @click="flag = true">基本使用，点我</h2>
    <gourd-overlay v-model="flag" @click="flag = false"></gourd-overlay>

    <h2 @click="flag2 = true">自定义内容，点我</h2>

    <gourd-overlay v-model="flag2" @click="flag2 = false">
      <div class="demo-overlay--wrap">
        <gourd-loading size="26"></gourd-loading>
      </div>
    </gourd-overlay>

     <h2 @click="flag4 = true">自定义背景色，点我</h2>

    <gourd-overlay v-model="flag4" @click="flag4 = false" color="#fff">
      <div class="demo-overlay--wrap">
        <gourd-loading size="26"></gourd-loading>
      </div>
    </gourd-overlay>

    <h2 @click="flag3 = true">区域region，默认是全屏（flex）,点我</h2>
    <div class="demo-overlay--region">
        <h2>哈哈，我是一些文本或者内容</h2>
      <gourd-overlay v-model="flag3" @click="flag3 = false" region>
        <div class="demo-overlay--wrap">
          <gourd-loading size="26"></gourd-loading>
        </div>
      </gourd-overlay>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			flag: false,
            flag2: false,
            flag3:false,
            flag4:false
		};
	},
	methods: {
		ck1() {
			this.flag = !this.flag;
		}
	}
};
</script>

<style scoped>
.demo-overlay--wrap {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.demo-overlay--region {
    position: relative;
	height: 300px;
	border: 1px solid;
}
</style>