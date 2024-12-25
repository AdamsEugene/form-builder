<!-- components/SurveyQuestion.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { Image, MessageCircle, Plus, Trash2 } from 'lucide-vue-next';
import { QuestionType, questionTypes, ReactionType, type DropdownOption, type Question } from '~/types/survey';

interface Props {
    modelValue: Question;
    index: number;
}

interface Emits {
    (e: 'update:modelValue', value: Question): void;
    (e: 'delete' | 'add-question'): void;
    (e: 'change', type: DropdownOption | null): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const addQuestion = () => {
    emit('add-question');
};

const handleChange = (type: DropdownOption | null) => {
    emit('change', type);
};
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
    <div class="flex gap-4 w-full">
        <div class="flex items-center gap-2 bg-gray-400 p-1 h-8 w-8 justify-center rounded-full">
            <span class="text-lg font-medium text-gray-700 dark:text-gray-200">{{ index + 1 }}</span>
        </div>

        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg"
        >
            <div class="grid grid-cols-3 gap-4 w-full">
                <UiBaseButton @click="addQuestion" class="gap-2">
                    <Plus class="w-6 h-6" />
                    Add question
                    <BrainCog class="w-6 h-6" />
                </UiBaseButton>
                <UiBaseDropdown
                    v-model="question.type"
                    :options="questionTypes"
                    placeholder="Select a question type"
                    :searchable="true"
                    @change="handleChange"
                    class="col-span-2"
                />
            </div>
            <!-- Question Header -->
            <div class="flex items-center justify-between"></div>

            <!-- Question Type Selection -->
            <div class="flex items-center gap-4">
                <UiBaseDropdown
                    v-model="question.type"
                    :options="questionTypes"
                    searchable
                    class="col-span-2"
                    placeholder="Select question type"
                />
                <div class="flex items-center">
                    <UiBaseCheckbox v-model="question.required" label="Required" size="lg" />
                </div>
                <div class="flex items-center gap-2">
                    <UiBaseButton variant="ghost" size="sm" class="text-red-500" @click="$emit('delete')">
                        <Trash2 class="w-4 h-4" />
                    </UiBaseButton>
                </div>
            </div>

            <!-- Question Title -->
            <UiFormInput v-model="question.title" placeholder="How would you rate your experience?" label="" class="" />

            <!-- Image Upload -->
            <div class="flex flex-col gap-2">
                <UiBaseButton variant="outline" size="sm" class="gap-2 w-max">
                    <Image class="w-4 h-4" />
                    Add image
                </UiBaseButton>
                <p class="mt-1 text-xs text-gray-500">
                    Up to 2MB. JPG, PNG, GIF, or WebP files only. Images will rescale to 300x200 px.
                </p>
            </div>

            <!-- Radio and checkbox answers -->
            <div
                v-if="question.type === QuestionType.RADIO || question.type === QuestionType.CHECKBOX"
                class="flex flex-col gap-6"
            >
                <div class="flex items-center gap-2 w-full">
                    <UiFormInput
                        v-model="question.title"
                        placeholder="answer here"
                        label="Answer 1"
                        label-placement="right"
                        class="w-full"
                    />
                    <UiBaseButton variant="ghost" size="sm" class="" @click="$emit('delete')">
                        <MessageCircle class="w-4 h-4" />
                    </UiBaseButton>
                    <UiBaseButton variant="ghost" size="sm" class="text-red-500" @click="$emit('delete')">
                        <Trash2 class="w-4 h-4" />
                    </UiBaseButton>
                </div>
                <div class="flex items-center gap-2 w-full">
                    <UiFormInput
                        v-model="question.title"
                        placeholder="answer here"
                        label="Answer 2"
                        label-placement="right"
                        class="w-full"
                    />
                    <UiBaseButton variant="ghost" size="sm" class="" @click="$emit('delete')">
                        <MessageCircle class="w-4 h-4" />
                    </UiBaseButton>
                    <UiBaseButton variant="ghost" size="sm" class="text-red-500" @click="$emit('delete')">
                        <Trash2 class="w-4 h-4" />
                    </UiBaseButton>
                </div>
                <div class="flex items-center gap-4">
                    <UiBaseButton size="sm" variant="outline"><Plus class="w-6 h-6" />Add answer</UiBaseButton>
                    <UiBaseCheckbox v-model="question.required" label="Randomized" size="lg" />
                </div>
            </div>

            <!-- Reaction Type Selection (for reaction questions) -->
            <div v-if="question.type === QuestionType.REACTION" class="flex flex-col gap-6">
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="type in reactionTypes"
                        :key="type.id"
                        class="px-3 py-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
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
            </div>

            <!-- Score Labels -->
            <div
                v-if="
                    question.type === QuestionType.REACTION ||
                    question.type === QuestionType.RATING_5 ||
                    question.type === QuestionType.RATING_7 ||
                    question.type === QuestionType.NPS
                "
                class="flex flex-col gap-6"
            >
                <UiFormInput
                    v-model="question.lowScoreLabel"
                    placeholder="Low score label"
                    label="Low score label"
                    label-placement="right"
                />
                <UiFormInput
                    v-model="question.highScoreLabel"
                    placeholder="High score label"
                    label="High score label"
                    label-placement="right"
                />
            </div>

            <UiFormTextarea
                v-if="question.type === QuestionType.STATEMENT"
                v-model="question.content"
                placeholder="Enter description here... (optional)"
                label-placement="right"
                class="w-full"
            />

            <!-- Logic Section -->
            <div v-if="question.logic?.options" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Logic</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">After this question, go to:</p>
                <UiBaseDropdown
                    v-model="question.logic.nextQuestion"
                    :options="question.logic?.options"
                    placeholder="Select next question"
                />
            </div>
        </div>
    </div>
</template>
