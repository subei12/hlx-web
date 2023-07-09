<template>
  <div class="space">
    <gourd-nav-bar>
      <img src="../../assets/navbar/ic_profile_setting.png" slot="left" alt="">
      <img src="../../assets/navbar/ic_message.png" slot="right" alt="">
    </gourd-nav-bar>
    <header>
      <div class="space-header-info">
        <gourd-image width="68" height="68" :src="userInfo.avatar" round></gourd-image>
        <template v-if="$store.getters.isLogin">
          <span class="nick">{{userInfo.nick}}</span>
          <span class="autograph">{{userInfo.signature ? userInfo.signature : '这位葫芦丝还没有签名'}}</span>
        </template>
        <span v-else @click="$router.push('/login')">登录/注册</span>
      </div>
      <div class="space-card">
        <div>
          <em>{{userInfo.followingCount ? userInfo.followingCount : 0}}</em>
          <span>关注</span>
        </div>
        <div>
          <em>{{userInfo.followerCount ? userInfo.followerCount : 0}}</em>
          <span>粉丝</span>
        </div>
      </div>
    </header>

    <div class="space-cell">
      <gourd-cell-group>
        <gourd-cell v-for="(item,index) in cells" :key="index" :title="item.title" link :to="item.to" size="medium">
          <img :src="item.icon" slot="prefix" alt="">
          <span slot="suffix">{{item.value}}</span>
        </gourd-cell>
        <gourd-cell title="浏览历史" link size="medium">
          <img :src="require('../../assets/space/cell/profile_history.png')" slot="prefix" alt="">
        </gourd-cell>
      </gourd-cell-group>
    </div>

    <div class="space-cell">
      <gourd-cell-group>
        <gourd-cell title="账号与安全" link size="medium">
          <img :src="require('../../assets/space/cell/ic_account_security.png')" slot="prefix" alt="">
        </gourd-cell>
      </gourd-cell-group>
    </div>

  </div>
</template>

<script>
let messageCells = [
	{
		title: '我的帖子',
		icon: require('../../assets/space/cell/profile_topic.png'),
		value: 0,
		attr: 'postCount'
	},
	{
		title: '我的回复',
		icon: require('../../assets/space/cell/profile_comment.png'),
		value: 0,
    to: "/myComments",
		attr: 'commentCount'
	},
	{
		title: '游戏评论',
		icon: require('../../assets/space/cell/ic_special_white.png'),
		value: 0,
		attr: 'gameCommentCount'
	},
	{
		title: '我的收藏',
		icon: require('../../assets/space/cell/profile_favorite.png'),
		value: 0,
		attr: 'favoriteCount'
	}
];

// {
// 	title: '浏览历史',
// 	icon: require('../../assets/space/cell/profile_history.png'),
// 	value: 0
// }

import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	mounted() {
	},
	computed: {
		...mapState(['userInfo']),
		cells() {
			return messageCells.map(item => {
				item.value = this.userInfo[item.attr];
				return item;
			});
		}
	},
	activated() {
		this.$parent.updateActive(this.$route.path);
	}
};
</script>

<style scoped lang="less">
.space {
	height: 100%;
	overflow: auto;
	background-color: #f0f0f0;
}

header {
	position: relative;
	top: -1px;
	z-index: 11;
	margin-bottom: 40px;
	padding: 1px 0 0;
	background-color: #11cc61;
}

.space-card {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	margin: 0 4vw;
	background-color: #fff;
	border-radius: 4px;
	transform: translateY(50%);

	& > div {
		flex: 1;
		padding: 16px 0;
		text-align: center;
		font-size: 12px;

		em {
			margin-right: 4px;
			color: #16d166;
			font-style: normal;
			font-size: 16px;
		}

		&:active {
			background-color: #eeeeee;
		}
	}
}

.space-header-info {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 10px;
	color: #fff;
	transform: translateY(-40%);

	.gourd-image {
		margin-bottom: 4px;
		background-color: #fff;
		border-radius: 50%;
	}

	.nick,
	.autograph {
		font-size: 14px;
	}
	.autograph {
		margin-top: 4px;
	}
}

.space-cell {
	padding: 0 0 10px;
}
</style>