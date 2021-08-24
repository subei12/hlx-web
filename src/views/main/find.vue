<template>
    <h1>发现</h1>
</template>

<script>
export default {
	activated() {
		this.$parent.updateActive(this.$route.path);
	}
};
</script>