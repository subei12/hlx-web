<template>
  <section>
    <gourd-cell-group>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
    </gourd-cell-group>

    <gourd-cell-group>
      <gourd-cell title="实用软件" link>
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link>
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link>
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link>
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
    </gourd-cell-group>
    <h1>网格排序</h1>
    <gourd-cell-group title="我的模块" align="grid">
      <gourd-cell title="实用软件" link :arrow="false">
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="1" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link :arrow="false">
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link :arrow="false">
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
      <gourd-cell title="实用软件" link :arrow="false">
        <img src="../../assets/icon.jpg" slot="prefix" alt="">
        <gourd-badge value="10" :max="5" slot="suffix"></gourd-badge>
      </gourd-cell>
    </gourd-cell-group>

    <h1>网格排序(中等尺寸)</h1>
    <gourd-cell-group title="我的模块" align="grid">
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
      <gourd-cell title="我的帖子" link size="medium">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>
    </gourd-cell-group>

    <h1>网格排序(自适应)</h1>
    <gourd-cell-group title="我的模块" align="grid">

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

      <gourd-cell title="我的帖子" link size="adapt">
        <img src="../../assets/帖子管理.png" slot="prefix" alt="">
        <span slot="suffix">10</span>
      </gourd-cell>

    </gourd-cell-group>

  </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
	padding: 5px 0;
	background-color: pink;
}
</style>