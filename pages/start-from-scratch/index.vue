<script setup lang="ts">
import Appearance from '~/components/createSurvey/Appearance.vue';
import Behavior from '~/components/createSurvey/Behavior.vue';
import Details from '~/components/createSurvey/Details.vue';
import ForwardResponse from '~/components/createSurvey/ForwardResponse.vue';
import Popover from '~/components/createSurvey/Popover.vue';
import Questions from '~/components/createSurvey/Questions.vue';
import Summary from '~/components/createSurvey/Summary.vue';
import Targeting from '~/components/createSurvey/Targeting.vue';
import Preview from '~/components/shared/Preview.vue';
import SurveyStepsSidebar from '~/components/shared/SurveyStepsSidebar.vue';

const activeStep = ref(0);

const deviceType = ref<'mobile' | 'desktop' | 'tablet'>('desktop');
const shouldRefresh = ref(false);

const handleRefresh = () => {
    shouldRefresh.value = true;
    // Reset the refresh flag after a brief delay
    setTimeout(() => {
        shouldRefresh.value = false;
    }, 100);
};

const handleStepChange = (index: number) => {
    activeStep.value = index;
};

const getStepComponent = computed(() => {
    switch (activeStep.value) {
        case 0:
            return Details;
        case 1:
            return Popover;
        case 2:
            return Questions;
        case 3:
            return Appearance;
        case 4:
            return Targeting;
        case 5:
            return Behavior;
        case 6:
            return ForwardResponse;
        case 7:
            return Summary;
        default:
            return Details;
    }
});
</script>

<template>
    <div class="flex gap-6">
        <div>
            <div class="sticky top-0">
                <SurveyStepsSidebar v-if="true" @step-change="handleStepChange" />
            </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full">
            <div class="w-full">
                <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Start from scratch</h1>

                <transition
                    mode="out-in"
                    enter-active-class="transition-opacity duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <keep-alive>
                        <component :is="getStepComponent" class="mt-6" />
                    </keep-alive>
                </transition>
            </div>
            <div class="flex flex-col gap-8">
                <div class="sticky top-6">
                    <SharedSurveyPreview v-model:deviceType="deviceType" @refresh="handleRefresh">
                        <SharedIframePreview :component="Preview" :refresh="shouldRefresh" />
                    </SharedSurveyPreview>
                </div>
            </div>
        </div>
    </div>
</template>
