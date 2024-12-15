<script setup lang="ts">
import FormInput from '../ui/FormInput.vue';
import FormTextarea from '../ui/FormTextarea.vue';

const email = ref("");
const emailError = ref("");
const description = ref("");
</script>

<template>
  <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full">
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
  </div>
</template>
