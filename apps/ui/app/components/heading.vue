<template>
  <Render class="heading" />
</template>

<script setup>
import {h, useSlots} from "vue";

const props = defineProps({
    level: {
        type: [String, Number],
        required: true
    }
});

const slots = useSlots();

function Render(_, context) {
    return h(`h${props.level}`, context.attrs, slots.default());
}
</script>

<style scoped>
.heading {
    margin: 0;
    font-family: var(--font-cursive);
}
</style>
