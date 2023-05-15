<template>
    <input :type="type" v-model="model">
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    }
});

const emit = defineEmits(['update:model-value']);

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:model-value', value),
});
</script>
