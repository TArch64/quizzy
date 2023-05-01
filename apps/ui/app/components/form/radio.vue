<template>
    <label>
        <input type="radio" :value="option" v-model="model">
        <slot />
    </label>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    option: {
        type: [String, Number],
        required: true
    }
});

const emit = defineEmits(['update:model-value']);

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:model-value', value),
});
</script>
