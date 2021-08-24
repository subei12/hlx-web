<template>
  <div>
    <h2 @click="show = !show">点我显示</h2>
    <gourd-dialog v-model="show">
      <span slot="title">退出登录</span>
      <template slot="footer">
        <GourdButton @click="show = false">取消</GourdButton>
        <GourdButton>确定</GourdButton>
      </template>
      <span>确定退出吗？</span>
    </gourd-dialog>

    <h2 @click="show1 = !show1">点击遮罩层关闭</h2>

    <gourd-dialog v-model="show1" :title-center="false" close-on-click-overlay @overlay-click="overlayCk">
      <span slot="title">退出登录</span>
      <template slot="footer">
        <GourdButton @click="show1 = false">取消</GourdButton>
        <GourdButton>确定</GourdButton>
      </template>
      <span>确定退出吗？</span>
    </gourd-dialog>
  </div>
</template>

<script>
export default {
	data() {
		return {
      show: false,
      show1:false
		};
  },
  
  methods:{
    overlayCk(){
      console.log('9999');
      
    }
  }
};
</script>

<style>
</style>