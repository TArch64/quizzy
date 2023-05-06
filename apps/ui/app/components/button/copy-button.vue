<template>
    <Button look="link" size="md" @click="copy">
        {{ buttonText }}
    </Button>
</template>

<script setup>
import {computed, ref} from "vue";
import Button from "@/components/button/button.vue";

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    copyText: {
        type: [String, URL],
        required: true
    }
});

const isCopied = ref(false);
const buttonText = computed(() => isCopied.value ? 'Copied' : props.text);

function copy() {
    isCopied.value = true;
    navigator.clipboard.writeText(props.copyText);
    setTimeout(() => isCopied.value = false, 1000);
}
</script>
