<template>
  <div class="demo-divider">
    <h2>基本使用</h2>
    为了更美好的明天而奋斗
    <gourd-divider></gourd-divider>

    <h2>加入文本</h2>
    <gourd-divider>我是有底线的</gourd-divider>

    <h2>位置</h2>
    王侯将相，宁有种呼？
    <gourd-divider position="left">陈胜</gourd-divider>
    黄河常有澄清日，岂可人无得运时。
    <gourd-divider position="right">哲学</gourd-divider>
    麻雀虽小，五脏俱全。
    <gourd-divider position="right">钱钟书</gourd-divider>

     <h2>自定义样式</h2>
    <gourd-divider :style="{color:'#00a9ff',borderColor:'#00a9ff'}">爱一个人需要理由吗？</gourd-divider>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.demo-divider {
	padding: 16px;
}

h2 {
	margin: 16px 0;
}
</style>