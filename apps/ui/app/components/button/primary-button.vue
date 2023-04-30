<template>
  <Button class="button-primary" :class="classes" :to="to">
      <slot />
  </Button>
</template>

<script setup>
import Button from "./button.vue";
import {computed} from "vue";

const props = defineProps({
    to: {
        type: [Object, String],
        required: false,
        default: ''
    },
    size: {
        type: String,
        required: false,
        default: 'md'
    }
});

const classes = computed(() => [
    `button-primary--${props.size}`
]);
</script>

<style scoped>
.button-primary {}

.button-primary--md {
    font-size: 14px;
    padding: 8px 16px;
}

.button-primary--lg {
    font-size: 18px;
    padding: 16px 24px;
}
</style>
