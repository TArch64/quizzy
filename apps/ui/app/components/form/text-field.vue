<template>
    <div class="text-field">
        <Field :name="name" :type="type" />
    </div>
</template>

<script setup>
import {ErrorMessage, Field} from "vee-validate";

defineProps({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    }
})
</script>

<style scoped>
.text-field {
    display: flex;
    flex-direction: column;
}
</style>
