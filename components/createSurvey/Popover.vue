<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import type { FeedbackTab } from '~/types';
import { ArrowRight } from 'lucide-vue-next';

interface SurveyType {
    id: FeedbackTab;
    name: string;
    icon: string;
    description?: string;
    badge?: string;
}

const { survey, setSurvey } = useGlobal();

const selectedType = ref(survey.value?.type);

const surveyTypes: SurveyType[] = [
    {
        id: 'popover',
        name: 'Popover',
        icon: '📝',
        description: 'Appears as a popup on your website',
    },
    {
        id: 'button',
        name: 'Button',
        icon: '🔘',
        description: 'Opens from a button click',
    },
    {
        id: 'bubble',
        name: 'Bubble',
        icon: '💬',
        description: 'Float on the corner of your page',
    },
    {
        id: 'embedded',
        name: 'Embedded',
        icon: '📌',
        description: 'Embed directly in your page',
        badge: 'BUSINESS',
    },
    {
        id: 'fullScreen',
        name: 'Full screen',
        icon: '🖥️',
        description: 'Takes up the entire screen',
    },
    {
        id: 'link',
        name: 'Link',
        icon: '🔗',
        description: 'Share via a direct link',
    },
];

const handleTypeSelect = (typeId: FeedbackTab) => {
    setSurvey({ type: typeId });
    selectedType.value = typeId; // Update the local ref
};

// Watch for changes in the global survey state
watch(
    () => survey.value?.type,
    (newType) => {
        selectedType.value = newType;
    }
);
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="space-y-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Choose survey type</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <button
                    v-for="type in surveyTypes"
                    :key="type.id"
                    @click="handleTypeSelect(type.id)"
                    :class="[
                        'relative p-4 rounded-2xl border-2 text-left transition-all duration-200',
                        'hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10',
                        selectedType === type.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 dark:border-primary-400'
                            : 'border-gray-200 bg-white dark:bg-dark-surface dark:border-gray-700',
                    ]"
                >
                    <!-- Badge -->
                    <span
                        v-if="type.badge"
                        class="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded"
                    >
                        {{ type.badge }}
                    </span>

                    <div class="flex items-start gap-3">
                        <!-- Icon -->
                        <div
                            class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800"
                        >
                            <span class="text-xl">{{ type.icon }}</span>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <h3 class="font-medium text-gray-900 dark:text-white">
                                {{ type.name }}
                            </h3>
                            <p v-if="type.description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {{ type.description }}
                            </p>
                        </div>
                    </div>

                    <!-- Selected indicator -->
                    <div
                        v-if="selectedType === type.id"
                        class="absolute inset-0 border-2 border-primary-500 dark:border-primary-400 rounded-2xl pointer-events-none"
                    />
                </button>
            </div>
        </div>
        <BaseButton size="md" class="w-max self-end">Next <ArrowRight /></BaseButton>
    </div>
</template>
