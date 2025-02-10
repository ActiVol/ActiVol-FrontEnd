<template>
  <div class="common-layout">
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('App mounted');
  }
};
</script>

<style scoped lang="less">
.common-layout{
  width: 100%;
  height: 100%;
}
</style>
