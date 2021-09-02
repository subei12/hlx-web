<template>
  <div>
    <groud-image-group>
      <gourd-image width="50" height="50" round :text="500" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="5" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="6" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="20" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
    </groud-image-group>

    <h2 @click="ck">动态添加</h2>

    <groud-image-group>
      <gourd-image round v-for="(item,index) in lists" width="100" height="100" :key="index" :text="index" :src="item.path"></gourd-image>
    </groud-image-group>

    <h2>更多固定在右侧</h2>

    <groud-image-group more-fixed>
      <gourd-image width="50" height="50" round :text="500" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="5" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="6" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="20" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round :text="500" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="5" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="6" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="20" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>
      <gourd-image width="50" height="50" round text="50" src="666"></gourd-image>

    </groud-image-group>

    <h2>禁止滚动条(overflow原生属性值)</h2>

    <groud-image-group more-fixed overflow="hidden">
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
      <gourd-image width="22" height="22" round src="666"></gourd-image>
    </groud-image-group>
  </div>
</template>

<script>
export default {
	data() {
		return {
			lists: [
				{
					path: require('../../assets/post/moderator/1.png')
				},
				{
					path: require('../../assets/post/moderator/2.jpg')
				},
				{
					path: require('../../assets/post/moderator/1.png')
				},
				{
					path: require('../../assets/post/moderator/3.jpg')
				},
				{
					path: require('../../assets/post/moderator/5.jpg')
				},
				{
					path: require('../../assets/post/moderator/4.jpg')
				}
			]
		};
	},
	methods: {
		ck() {
			var image = ['1.png', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];

			var num = Math.random() * image.length;

			this.lists.push({
				path: require('../../assets/post/moderator/' + image[Math.floor(num)])
			});
		}
	}
};
</script>

<style>
</style>
