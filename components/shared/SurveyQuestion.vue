<!-- components/SurveyQuestion.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { Image, Plus, Trash2 } from 'lucide-vue-next';
import { questionTypes, ReactionType, type Question } from '~/types/survey';

interface Props {
    modelValue: Question;
    index: number;
}

interface Emits {
    (e: 'update:modelValue', value: Question): void;
    (e: 'delete'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const question = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const reactionTypes = [
    { id: ReactionType.SMILEYS, label: 'Smileys', icon: '😊' },
    { id: ReactionType.EMOJIS, label: 'Emojis', icon: '🌟' },
    { id: ReactionType.STARS, label: 'Stars', icon: '⭐' },
    { id: ReactionType.BUDDIES, label: 'Buddies', icon: '🤖' },
];

const isBusinessFeature = computed(() => {
    return ['buddies'].includes(question.value.type);
});
</script>

<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg"
    >
        <!-- Question Header -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 bg-gray-400 p-1 h-8 w-8 justify-center rounded-full">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-200">{{ index + 1 }}</span>
            </div>
            <div class="flex items-center gap-2">
                <UiBaseButton variant="ghost" size="sm" class="text-red-500" @click="$emit('delete')">
                    <Trash2 class="w-4 h-4" />
                </UiBaseButton>
            </div>
        </div>

        <!-- Question Type Selection -->
        <div class="grid grid-cols-3 gap-4 mb-4">
            <UiBaseDropdown
                v-model="question.type"
                :options="questionTypes"
                searchable
                class="col-span-2"
                placeholder="Select question type"
            />
            <div class="flex items-center">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="question.required" class="form-checkbox" />
                    <span class="text-sm text-gray-700 dark:text-gray-200">Required</span>
                </label>
            </div>
        </div>

        <!-- Question Title -->
        <UiFormTextarea v-model="question.title" placeholder="How would you rate your experience?" class="mb-4" />

        <!-- Image Upload -->
        <div class="mb-4">
            <UiBaseButton variant="outline" size="sm" class="gap-2">
                <Image class="w-4 h-4" />
                Add image
            </UiBaseButton>
            <p class="mt-1 text-xs text-gray-500">
                Up to 2MB. JPG, PNG, GIF, or WebP files only. Images will rescale to 300x200 px.
            </p>
        </div>

        <!-- Reaction Type Selection (for reaction questions) -->
        <div v-if="question.type === 'reaction'" class="space-y-4">
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="type in reactionTypes"
                    :key="type.id"
                    class="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                    :class="{ 'border-primary-500': question.reactionType === type.id }"
                    @click="question.reactionType = type.id"
                >
                    <span class="text-lg">{{ type.icon }}</span>
                    <span class="text-sm">{{ type.label }}</span>
                    <span
                        v-if="type.id === 'buddies'"
                        class="px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded"
                    >
                        BUSINESS
                    </span>
                </button>
            </div>

            <!-- Score Labels -->
            <div v-if="question.lowScoreLabel && question.highScoreLabel" class="space-y-2">
                <UiFormInput v-model="question.lowScoreLabel" placeholder="Low score label" label="Low score label" />
                <UiFormInput
                    v-model="question.highScoreLabel"
                    placeholder="High score label"
                    label="High score label"
                />
            </div>
        </div>

        <!-- Logic Section -->
        <div v-if="question.logic?.nextQuestion" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Logic</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">After this question, go to:</p>
            <UiBaseDropdown
                v-model="question.logic.nextQuestion"
                :options="[{ id: 1, label: 'Next question' }]"
                placeholder="Select next question"
            />
        </div>
    </div>
</template>
