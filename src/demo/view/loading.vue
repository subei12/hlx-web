<template>
  <div>
    <gourd-loading></gourd-loading>
    <h2>自定义大小</h2>
    <gourd-loading size="24"></gourd-loading>

    <h2>加载文案</h2>
    <gourd-loading size="36">加载中...</gourd-loading>

    <h2>自定义颜色</h2>
    <gourd-loading size="36" color="#0094ff">加载中...</gourd-loading>
    <gourd-loading size="36" color="#0094ff" text-color="red">加载中...</gourd-loading>

    <h2>平滑旋转</h2>
    <gourd-loading size="36" smooth color="#0094ff">加载中...</gourd-loading>

    <h2>垂直排序</h2>
    <div class="vertical">
      <gourd-loading size="36" type="smooth" vertical color="#0094ff">加载中...</gourd-loading>

    </div>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.vertical {
	margin: 0 10px;
}
</style>