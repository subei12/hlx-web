<template>
  <div class="demo-badge">
    <h2>基本使用</h2>
    <gourd-badge value="11" :max="10"></gourd-badge>
    <h3>大小</h3>
    <gourd-badge value="1" :max="10" small></gourd-badge>

    <h2>方形类型square</h2>

    <gourd-badge value="+11" :max="10" square small></gourd-badge>
    <gourd-badge value="1" :max="10" square></gourd-badge>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.demo-badge {
	margin: 0 10px;
}
</style>