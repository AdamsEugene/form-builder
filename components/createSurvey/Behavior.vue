# Behavior.vue
<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import type { Behavior } from '~/types';

interface Props {
    modelValue: Behavior;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({
        reuseBehavior: false,
        timing: 'immediate',
        frequency: 'untilSubmit',
        includeScreenshot: false,
    }),
});

const {
    updateSurveySettings,
    surveySettings: { value },
} = useGlobal();

// Create a fresh reactive copy to avoid circular refs
const settings = ref<Behavior>({
    reuseBehavior: value?.behavior?.reuseBehavior ? value?.behavior?.reuseBehavior : props.modelValue.reuseBehavior,
    timing: value?.behavior?.timing ? value?.behavior?.timing : props.modelValue.timing,
    frequency: value?.behavior?.frequency ? value?.behavior?.frequency : props.modelValue.frequency,
    includeScreenshot: value?.behavior?.includeScreenshot
        ? value?.behavior?.includeScreenshot
        : props.modelValue.includeScreenshot,
});

const timingOptions = [
    {
        id: 'immediate',
        label: 'Immediately after the page loads',
        description: '',
    },
    {
        id: 'delay',
        label: 'After a delay on the page',
        description: '',
    },
    {
        id: 'abandon',
        label: 'When a user is about to abandon the page on a desktop device',
        description: 'Show this survey when the cursor leaves the top of the page',
    },
    {
        id: 'scroll',
        label: 'When a user scrolls halfway down the page',
        description: '',
    },
] as const;

const frequencyOptions = [
    {
        id: 'untilSubmit',
        label: 'Until they submit a response',
        description: 'If users minimize the survey without responding, it will show again the next session',
    },
    {
        id: 'once',
        label: 'Only once, even if they do not respond',
        description: "If users close the survey, they won't see it again",
    },
    {
        id: 'always',
        label: 'Always, even after they submit a response',
        description: 'If users minimize the survey or respond to it, it will still show again the next session',
    },
] as const;

// Watch for changes and update parent using non-reactive copy
watch(
    settings,
    (newSettings) => {
        const plainSettings: Behavior = {
            reuseBehavior: newSettings.reuseBehavior,
            timing: newSettings.timing,
            frequency: newSettings.frequency,
            includeScreenshot: newSettings.includeScreenshot,
        };

        updateSurveySettings('behavior', plainSettings);
    },
    { deep: true }
);
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            class="bg-white w-full dark:bg-gray-800 flex flex-col gap-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-shadow"
        >
            <!-- Reuse Behavior Section -->
            <section class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Reuse Behavior settings</h3>
                <p class="text-sm text-gray-500">Autofill the same Behavior from the most recent survey saved:</p>
                <p class="text-sm text-gray-500">Feedback button</p>

                <UiBaseButton
                    variant="outline"
                    size="sm"
                    :class="settings.reuseBehavior ? 'text-blue-600' : 'text-gray-700'"
                    @click="settings.reuseBehavior = !settings.reuseBehavior"
                >
                    Reuse Behavior
                </UiBaseButton>
            </section>

            <!-- Timing Section -->
            <section class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Timing</h3>
                <p class="text-sm text-gray-500">Select when to show this survey to users</p>

                <div class="space-y-3">
                    <div v-for="option in timingOptions" :key="option.id" class="space-y-1">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <UiBaseRadio
                                v-model="settings.timing"
                                :value="option.id"
                                :label="option.label"
                                :description="option.description"
                                name="timing"
                            />
                        </label>
                    </div>
                </div>
            </section>

            <!-- Frequency Section -->
            <section class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Frequency</h3>
                <p class="text-sm text-gray-500">Select how often users should see this survey</p>

                <div class="space-y-3">
                    <div v-for="option in frequencyOptions" :key="option.id" class="space-y-1">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <UiBaseRadio
                                v-model="settings.frequency"
                                :value="option.id"
                                :label="option.label"
                                :description="option.description"
                                name="frequency"
                            />
                        </label>
                    </div>
                </div>
            </section>

            <!-- Screenshot Section -->
            <section class="space-y-4">
                <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">Screenshot</h3>
                <p class="text-sm text-gray-500">
                    See exactly what your users see when responding to surveys. You'll get one per response.
                </p>

                <label class="flex items-center gap-3 cursor-pointer">
                    <UiBaseCheckbox v-model="settings.includeScreenshot" />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                        Automatically include a screenshot with each response
                    </span>
                </label>
            </section>
        </div>
        <UiBaseButton size="md" class="w-max self-end mb-4"> Next <ArrowRight /> </UiBaseButton>
    </div>
</template>
