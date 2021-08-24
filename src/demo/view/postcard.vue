<template>
  <div>
    <h2>基本使用(此组件依赖image组件)</h2>
    <gourd-post-card uname="孤独的小丑" floor="楼主" time="15:51" :avatar="require('../../assets/post/moderator/4.jpg')">

    </gourd-post-card>

    <h2>通过tag指定明信片标签</h2>
    <gourd-post-card uname="孤独的小丑" floor="楼主" time="2017年09天01日" :avatar="require('../../assets/post/moderator/4.jpg')">
      <template slot="tag">
        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>18</gourd-tag>
        <gourd-tag type="success" small>孤独</gourd-tag>
      </template>
    </gourd-post-card>

    <h2>有时候floor有着不同的含义，可以通过call指定称呼</h2>

    <gourd-post-card uname="孤独的小丑" call="楼主" floor="1楼" time="2017年09天01日" :avatar="require('../../assets/post/moderator/4.jpg')">
      <template slot="tag">
        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>18</gourd-tag>
        <gourd-tag type="success" small>孤独</gourd-tag>
      </template>
    </gourd-post-card>

    <h3>含有文本描述的（通过默认插槽或者text属性绑定都可以）默认优先于text</h3>

    <gourd-post-card uname="孤独的小丑" call="楼主" floor="1楼" time="2017年09天01日" :avatar="require('../../assets/post/moderator/4.jpg')">
      <template slot="tag">
        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>18</gourd-tag>
        <gourd-tag type="success" small>孤独</gourd-tag>
      </template>
      <span>喜欢一匹野马，可是我的家没有草原！</span>
    </gourd-post-card>

    <h3>带有勋章图标（medal是一个数组，里面存放着图片地址）</h3>

    <gourd-post-card uname-color="red" uname="孤独的小丑" :medal="medalList | arr" call="楼主" floor="1楼" time="2017年09天01日" :avatar="require('../../assets/post/moderator/4.jpg')">
      <template slot="tag">
        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>18</gourd-tag>
        <gourd-tag type="success" small>孤独</gourd-tag>
      </template>
      <span>喜欢一匹野马，可是我的家没有草原！</span>
    </gourd-post-card>

    <h3>利用默认插槽将明信片内容达到更丰富</h3>

    <gourd-post-card uname-color="red" uname="孤独的小丑" :medal="medalList | arr" call="楼主" floor="1楼" time="2017年09天01日" :avatar="require('../../assets/post/moderator/4.jpg')">
      <template slot="tag">
        <gourd-tag type="primary" small><i class="iconfont icon-nan"></i>18</gourd-tag>
        <gourd-tag type="success" small>孤独</gourd-tag>
      </template>
       <div class="demo-post-card">
           <blockquote class="demo-post-card--ref">
               <em>回复</em>
               <span>孤独</span>
               <div class="demo-post-card--row">
                   你总不能一辈子呆在一个破县城里面吧！
               </div>
           </blockquote>
           <div class="demo-post-card--row">
               到目前为止，我仍然以为我接受高等教育是为了帮助家乡脱离贫穷，而不是脱离贫穷的家乡。
           </div>
       </div>
    </gourd-post-card>
  </div>
</template>

<script>
export default {
	data() {
		return {
			medalList: [
				{
					name: '两周年勋章',
					url: 'http://cdn.u1.huluxia.com/g2/M02/26/3F/wKgBa1kVKuuAOkcfAAAwuzYCNBE803.png'
				},
				{
					name: '实用软件版块热度突破10亿专属纪念勋章',
					url: 'http://cdn.u1.huluxia.com/g2/M02/26/40/wKgBa1kVKzOAeTjLAAB7HkmL3Eo101.png'
				},
				{
					name: '三周年纪念勋章',
					url: 'http://cdn.u1.huluxia.com/g2/M01/30/D3/wKgBa1mmffKAXBMxAAAcO3ahkEc925.png'
				},
				{
					name: '一周年纪念勋章',
					url: 'http://cdn.u1.huluxia.com/g2/M03/26/3E/wKgBa1kVKmaAaSlRAAA7nSERplk044.png'
				},
				{
					name: '蓝V官方认证',
					url: 'http://cdn.u1.huluxia.com/g3/M00/68/A3/wKgBOVsaczSAUx9yAAAYvDrkGVQ563.png'
				},
				{
					name: '优秀版主',
					url: 'http://cdn.u1.huluxia.com/g3/M02/11/58/wKgBOVuM-c6ADi_9AABHU9dxp7Q188.png'
				},
				{
					name: '五周年纪念勋章',
					url: 'http://cdn.u1.huluxia.com/g3/M01/97/49/wKgBOV1t2NaANhV3AABwPCOaur0088.png'
				},
				{
					name: '六周年纪念勋章',
					url: 'http://cdn.u1.huluxia.com/g4/M02/33/FC/rBAAdl9SRCmAF69SAABt3JJfP38223.png'
				},
				{
					name: '视频',
					url: 'http://cdn.u1.huluxia.com/g3/M02/47/D8/wKgBOVyCU_2AAT98AAAHdCoBoQY024.png'
				}
			]
		};
	},
	filters: {
		arr(val) {
			return val.map(item => item.url);
		}
	}
};
</script>

<style scoped>
.demo-post-card{
    flex: 1;
}

.demo-post-card--ref{
    padding: 10px;
    color: #a9a9a9;
    background-color: #f0f0f0;
    border-radius: 2px;
}

.demo-post-card--ref em{
    font-style: normal;
    margin-right: 4px;
}

.demo-post-card--ref .demo-post-card--row{
    margin-top: 10px;
    color: #646464;
}

.demo-post-card--row{
    margin-top: 6px;
}
</style>