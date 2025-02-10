<template>
  <div>
    <template v-for="(item, index) in options" :key="item.value">
      <template v-if="values.includes(item.value)">
        <span
          v-if="(item.elTagType == 'default' || item.elTagType == '') && (item.elTagClass == '' || item.elTagClass == null)"
          :index="index"
          :class="item.elTagClass"
        >{{ item.label + " " }}</span>
        <el-tag
          v-else
          :disable-transitions="true"
          :index="index"
          :type="item.elTagType"
          :class="item.elTagClass"
        >{{ item.label + " " }}</el-tag>
      </template>
    </template>
    <template v-if="unmatch && showValue">
      {{ unmatchArray.join(' ') }}
    </template>
  </div>
</template>

<script setup>
import {ref, computed,defineProps,watch} from 'vue';

// 引入响应式引用
const unmatchArray = ref([]);

const props = defineProps({
  options: {
    type: Array,
    default: null,
  },
  value: [Number, String, Array],
  showValue: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: String,
    default: ',',
  }
});

const values = computed(() => {
  if (props.value === null || typeof props.value === 'undefined' || props.value === '') {
    return [];
  }
  return Array.isArray(props.value) ? props.value.map(item => '' + item) : String(props.value).split(props.separator);
});

// 用来判断是否有未匹配的项
const unmatch = computed(() => unmatchArray.value.length > 0);

// 使用 watch 来处理未匹配项的逻辑
watch([values, () => props.options], () => {
  unmatchArray.value = []; // 清空未匹配项
  if (props.value === null || typeof props.value === 'undefined' || props.value === '' || !Array.isArray(props.options) || props.options.length === 0) {
    return;
  }

  // 判断未匹配的项
  values.value.forEach(item => {
    if (!props.options.some(v => v.value === item)) {
      unmatchArray.value.push(item);
    }
  });
});
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
