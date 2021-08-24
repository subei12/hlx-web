<template>
  <div class="main">
    <h2>基本使用</h2>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读" author="孤独">
    </gourd-title>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读" time="6分钟前"></gourd-title>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读"></gourd-title>

    <h2>添加标题前缀标签</h2>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读">
      <template slot="title-prefix">
        <gourd-tag type="danger">公告</gourd-tag>
      </template>
    </gourd-title>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读">
      <template slot="title-prefix">
        <gourd-tag type="warning">置顶</gourd-tag>

      </template>
    </gourd-title>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读">
      <template slot="title-prefix">
        <gourd-tag type="success">新</gourd-tag>
      </template>
    </gourd-title>

    <h2>带有描述的</h2>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读" describe="我轻轻的走了，正如我轻轻的来，挥手一拍，不带走一片云彩！">
      <template slot="title-prefix">
        <gourd-tag type="success">新</gourd-tag>
      </template>
    </gourd-title>

    <h2>带有图片封面的（covers是一个数组里面存放着图片地址）</h2>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读" describe="我轻轻的走了，正如我轻轻的来，挥手一拍，不带走一片云彩！" :covers="arr">
      <template slot="title-prefix">
        <gourd-tag type="success">新</gourd-tag>
      </template>
    </gourd-title>

    <h2>完整标题</h2>
    <gourd-title title="我是一名web前端工程师免费 无广告 无需注册登录 功能强大 星际阅读" describe="我轻轻的走了，正如我轻轻的来，挥手一拍，不带走一片云彩！" :covers="arr" author="孤独" see="98878" info="89553" time="10分钟前">
      <template slot="title-prefix">
        <gourd-tag type="success">新</gourd-tag>
      </template>
    </gourd-title>

  </div>
</template>

<script>
export default {
	data() {
		return {
			arr: ['https://img2.baidu.com/it/u=755743609,134665558&fm=26&fmt=auto&gp=0.jpg', 'https://img1.baidu.com/it/u=3434029944,1140928988&fm=26&fmt=auto&gp=0.jpg', 'https://img2.baidu.com/it/u=2744736067,2605463816&fm=26&fmt=auto&gp=0.jpg', 'https://img2.baidu.com/it/u=4242660948,680633067&fm=26&fmt=auto&gp=0.jpg']
		};
	}
};
</script>

<style scoped>
.main {
	padding: 0 6px;
}
</style>