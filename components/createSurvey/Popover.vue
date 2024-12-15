<script setup lang="ts">
import PopoverTypes from "~/components/shared/PopoverTypes.vue";
import BaseButton from "../ui/BaseButton.vue";
import SurveyPreview from "../shared/SurveyPreview.vue";
import SurveyRating from "../shared/SurveyRating.vue";
import type { FeedbackTab as FBT } from "~/types";
import FeedbackTab from "../shared/FeedbackTab.vue";

const rating = ref<number>(0);
const deviceType = ref<"mobile" | "desktop" | "tablet">("desktop");
const feedbackType = ref<FBT>("popover");
const isOpen = ref(true);

const customRatings = [
  { emoji: "😡", value: 1 },
  { emoji: "😕", value: 2 },
  { emoji: "😐", value: 3 },
  { emoji: "😊", value: 4 },
  { emoji: "🥰", value: 5 },
];

const handleNext = () => {
  console.log("Selected rating:", rating.value);
};
</script>

<template>
  <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full">
    <div class="flex flex-col gap-8">
      <PopoverTypes v-model:feedbackType="feedbackType" />
      <BaseButton size="md">Done</BaseButton>
    </div>
    <div>
      <SurveyPreview>
        <!-- Your survey content goes here -->
        <div class="p-4 relative h-[calc(100%-18px)] w-full">
          <!-- Survey content -->
          <!-- <FeedbackTab v-model="isOpen" placement="right" /> -->
          <FeedbackTab
            v-model="isOpen"
            placement="bottom-right"
            content-width="max-content"
            :device-type="deviceType"
            :feedback-type="feedbackType"
            @next="handleNext"
          >
            <SurveyRating
              v-model="rating"
              :device-type="deviceType"
              v-model:isOpen="isOpen"
              placement="bottom-right"
              question="How satisfied are you with our service?"
              leftLabel="Not satisfied"
              rightLabel="Very satisfied"
              :ratings="customRatings"
              nextButtonText="Submit"
              @next="handleNext"
            />
          </FeedbackTab>
        </div>
      </SurveyPreview>
    </div>
  </div>
</template>

<!-- <SurveyRating
              v-model="rating"
              :device-type="deviceType"
              :is-open="isOpen"
              placement="bottom-right"
              question="How satisfied are you with our service?"
              leftLabel="Not satisfied"
              rightLabel="Very satisfied"
              :ratings="customRatings"
              backgroundColor="#F8F9FA"
              questionColor="#1F2937"
              emojiBackgroundColor="#4F46E5"
              emojiHoverColor="#4338CA"
              emojiActiveColor="#3730A3"
              nextButtonText="Submit"
              @next="handleNext"
            /> -->
