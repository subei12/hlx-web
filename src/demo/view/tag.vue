<template>
  <div>
    <h2>基本使用</h2>
    <gourd-tag>默认</gourd-tag>
    <gourd-tag type="danger">公告</gourd-tag>
    <gourd-tag type="warning">置顶</gourd-tag>
    <gourd-tag type="success">LV12</gourd-tag>
    <gourd-tag type="primary"><i class="iconfont icon-nan"></i>18</gourd-tag>
    <h2>自定义颜色</h2>
    <gourd-tag color="#bd07bd">大当家</gourd-tag>
    <gourd-tag color="#fc26c7">二当家</gourd-tag>
    <gourd-tag color="#d50e1b">三当家</gourd-tag>
    <gourd-tag color="#ffe1e1" text-color="#ad0000">三当家</gourd-tag>
    <h2>样式</h2>
    <gourd-tag type="success" round>孤独</gourd-tag>
    <gourd-tag type="primary" round>小丑</gourd-tag>
    <gourd-tag type="success">新</gourd-tag>
    <gourd-tag type="danger">热</gourd-tag>
    <h2>尺寸</h2>
    <gourd-tag type="success" small>新</gourd-tag>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
	padding: 0 5px;
}
</style>