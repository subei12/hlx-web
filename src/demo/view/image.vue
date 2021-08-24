<template>
  <div>

    <gourd-image text="基本实用" :src="require('../../assets/post/moderator/3.jpg')"></gourd-image>

    <gourd-image width="80px" height="80px" text="自定义大小" :src="require('../../assets/post/moderator/3.jpg')"></gourd-image>

    <h2>不带文字</h2>
    <gourd-image width="50px" height="50px" :src="require('../../assets/post/moderator/3.jpg')"></gourd-image>
    <h2>支持objectFit</h2>
    <gourd-image text="支持objectFit" fit="none" :src="require('../../assets/post/moderator/3.jpg')"></gourd-image>

    <h2>圆形round</h2>
    <gourd-image width="80px" height="80px" round text="孤独的小丑" :src="require('../../assets/post/moderator/3.jpg')"></gourd-image>

    <h2>加载失败</h2>
    <gourd-image width="100" height="100" text="孤独的小丑" src="666"></gourd-image>

    <gourd-image width="20" height="20" round text="孤独的小丑" src="666"></gourd-image>

    <gourd-image width="50" height="50" round text="孤独的小丑" src="666"></gourd-image>

  </div>
</template>

<script>
export default {};
</script>

<style>
</style>