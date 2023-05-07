<template>
    <Render :class="classes" />
</template>

<script setup>
import {computed, h, normalizeClass, useSlots} from "vue";
import {RouterLink} from "vue-router";

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
    },
    look: {
        type: String,
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

const classes = computed(() => ({
    [`button--${props.size}`]: !!props.size,
    [`button--${props.look}`]: !!props.look
}));
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

.button--md {
    font-size: 14px;
    padding: 8px 16px;
}

.button--lg {
    font-size: 18px;
    padding: 16px 24px;
}

.button--link:hover {
    text-decoration: underline;
}

.button--primary {
    background-color: #000;
    color: #FFF;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: #FFF;
    }
}
</style>
