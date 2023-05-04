<template>
    <div class="welcome">
        <Heading level="1" class="welcome__heading">
            Welcome to Quizzy
        </Heading>

        <Button class="welcome__create" look="primary" size="lg" :to="{ name: 'new' }">
            Create Quiz
        </Button>
    </div>
</template>

<script setup>
import Heading from "@/components/heading.vue";
import Button from "@/components/button/button.vue";
</script>

<style scoped>
.welcome {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    padding: 20% 32px;
}

.welcome__heading {
    font-size: 48px;
    margin-bottom: 48px;

    @media (width <= 768px) {
        font-size: 40px;
    }
}

.welcome__create {
    @media (width <= 768px) {
        width: 100%;
    }

    @media (width > 768px) {
        width: 400px;
    }
}
</style>
