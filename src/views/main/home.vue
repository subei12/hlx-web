<template>
    <h1>home 首页</h1>
</template>

<script>
export default {
	activated() {
		this.$parent.updateActive(this.$route.path);
	}
};
</script>