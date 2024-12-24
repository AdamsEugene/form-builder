<script setup lang="ts">
import FormInput from '../ui/FormInput.vue';
import FormTextarea from '../ui/FormTextarea.vue';
import { useGlobal } from '@/composables/useGlobal';

const { survey, setSurvey } = useGlobal();

const email = ref(survey.value?.email || '');
const emailError = ref('');
const description = ref(survey.value?.description || '');

// Watch for changes and update global state
watch(email, (newValue) => {
    setSurvey({
        email: newValue,
    });
});

watch(description, (newValue) => {
    setSurvey({
        description: newValue,
    });
});
</script>

<template>
    <div class="flex flex-col gap-8">
        <FormInput
            v-model="email"
            label="Email Address"
            type="search"
            placeholder="Enter your email"
            helper="We'll never share your email"
            required
            leftIcon="i-heroicons-envelope"
            :size="'sm'"
            :error="emailError"
        />

        <FormTextarea
            v-model="description"
            label="Description"
            placeholder="Enter your description"
            helper="Maximum 500 characters"
            :maxlength="500"
            autogrow
            required
        />
    </div>
</template>
