<script setup>
import { useRouter } from 'vue-router';

defineOptions({
  name: '404'
});

const router = useRouter();
</script>

<template>
  <div class="error-page h-screen">
    <div class="content">
      <svg-icon iconClass="404" class="image"/>
      <div class="ml-12">
        <div class="text-3xl font-bold px-4 py-4">404</div>
        <div class="text-xl px-4 py-4">{{ $t('error.notFindPage') }}</div>
        <el-button type="primary" @click="router.push('/')">
          {{ $t('error.backHome') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.error-page{
  .content{
    display:grid;
    place-items: center;
    flex-wrap: wrap;
    height: 100%;
    .image{
      width:252px;
      height:294px;
    }
    .ml-12{
      text-align: center;
    }
  }
}
</style>