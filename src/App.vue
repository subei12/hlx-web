<template>
  <div id="app">

    <keep-alive :include="keepComponent">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
  computed:{
    ...mapState(['keepComponent'])
  }
};
</script>

<style>
</style>
