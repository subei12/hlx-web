<template>
  <section>
    <div class="box">
      <gourd-cell title="默认尺寸" link icon="el-icon-user-solid">
      </gourd-cell>

      <gourd-cell title="中等尺寸" size="medium" link icon="el-icon-user-solid">
      </gourd-cell>

      <gourd-cell title="自适应尺寸" size="adapt" link icon="el-icon-user-solid">
      </gourd-cell>
    </div>

    <h1>自定义前缀内容</h1>
    <div class="box">
      <gourd-cell title="默认尺寸" link>
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
      </gourd-cell>

      <gourd-cell title="中等尺寸" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
      </gourd-cell>

      <gourd-cell title="自适应尺寸" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
      </gourd-cell>
    </div>

    <h1>自定义后缀内容</h1>
    <div class="box">
      <gourd-cell title="实用软件" link :arrow="false">
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
	padding: 5px;
	background-color: pink;
}
</style>