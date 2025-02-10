<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
});
const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : 'svg-icon');
</script>

<style lang="less" scoped>

.svg-icon {
  position: relative;
  fill: currentColor;
}
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
