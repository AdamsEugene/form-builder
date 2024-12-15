<script setup lang="ts">
import Appearance from "~/components/createSurvey/Appearance.vue";
import Behavior from "~/components/createSurvey/Behavior.vue";
import Details from "~/components/createSurvey/Details.vue";
import ForwardResponse from "~/components/createSurvey/ForwardResponse.vue";
import Popover from "~/components/createSurvey/Popover.vue";
import Questions from "~/components/createSurvey/Questions.vue";
import Summary from "~/components/createSurvey/Summary.vue";
import Targeting from "~/components/createSurvey/Targeting.vue";
import SurveyStepsSidebar from "~/components/shared/SurveyStepsSidebar.vue";

const activeStep = ref(0);

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
      <SurveyStepsSidebar v-if="true" @step-change="handleStepChange" />
    </div>
    <div class="w-full">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Collect feedback
      </h1>

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
  </div>
</template>
