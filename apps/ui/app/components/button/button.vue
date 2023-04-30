<template>
    <Render />
</template>

<script setup>
import {h, normalizeClass, useSlots} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps({
    to: {
        type: [Object, String],
        required: false,
        default: ''
    }
});

const emit = defineEmits(['click']);

const slots = useSlots();

function Render(_, context) {
    if (props.to) {
        const attrs = {
            ...context.attrs,
            to: props.to,
            class: normalizeClass([context.attrs.class, 'link'])
        };
        return h(RouterLink, attrs, slots.default);
    }
    const attrs = {
        type: 'button',
        ...context.attrs,
        onClick: (event) => emit('click', event),
        class: normalizeClass([context.attrs.class, 'button'])
    }
    return h('button', attrs, slots.default());
}
</script>

<style scoped>
.button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
}

.link {
    color: inherit;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
        color: inherit;
    }
}
</style>
