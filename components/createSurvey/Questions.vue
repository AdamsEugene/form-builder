<script setup lang="ts">
const selectedOption = ref<string | number | null>(null);

const questionTypes = [
    {
        id: 'reaction',
        label: 'Reaction',
        icon: '👍',
        description: 'Simple reaction feedback',
    },
    {
        id: 'short_text',
        label: 'Short text answer',
        icon: '✍️',
        description: 'Brief text response',
    },
    {
        id: 'long_text',
        label: 'Long text answer',
        icon: '📝',
        description: 'Detailed text response',
    },
    {
        id: 'email',
        label: 'Email',
        icon: '📧',
        description: 'Collect email addresses',
    },
    {
        id: 'yes_no',
        label: 'Yes / No',
        icon: '✅',
        description: 'Binary choice question',
    },
    {
        id: 'radio',
        label: 'Radio options',
        icon: '⭕',
        description: 'Single choice from multiple options',
    },
    {
        id: 'checkbox',
        label: 'Checkbox options',
        icon: '☑️',
        description: 'Multiple choice selection',
    },
    {
        id: 'rating_5',
        label: '1 - 5 Rating scale',
        icon: '⭐',
        description: 'Five-point rating scale',
    },
];

const handleChange = (option: any) => {
    console.log('Selected option:', option);
};
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="grid grid-cols-3 gap-4 w-full">
            <UiBaseButton size="md" class="col-span-1">Done</UiBaseButton>
            <UiBaseDropdown
                v-model="selectedOption"
                :options="questionTypes"
                placeholder="Select a question type"
                :searchable="true"
                @change="handleChange"
                class="col-span-2"
            />
        </div>
        <UiBaseButton size="md">Done</UiBaseButton>
        <!-- <Preview /> -->
    </div>
</template>
