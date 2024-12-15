<script setup lang="ts">
import type { CSSProperties } from "vue";
import { ChevronUp, ChevronDown } from "lucide-vue-next";

interface EmojiRating {
  emoji: string;
  value: number;
}

type Placement =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";
type DeviceType = "mobile" | "desktop" | "tablet";

interface Props {
  // Content
  question?: string;
  leftLabel?: string;
  rightLabel?: string;
  nextButtonText?: string;

  // Rating configuration
  modelValue: number | null;
  ratings?: EmojiRating[];

  // Placement and visibility
  placement?: Placement;
  offset?: number;
  isOpen?: boolean;
  deviceType?: DeviceType;

  // Colors
  backgroundColor?: string;
  questionColor?: string;
  labelColor?: string;
  emojiBackgroundColor?: string;
  emojiHoverColor?: string;
  emojiActiveColor?: string;
  nextButtonBgColor?: string;
  nextButtonTextColor?: string;

  // Styling
  maxWidth?: string;
  borderRadius?: string;
  padding?: string;
  gap?: string;

  // Button configuration
  showNextButton?: boolean;
  nextButtonDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  // Default content
  question: "How would you rate your experience?",
  leftLabel: "Not good at all",
  rightLabel: "Very good",
  nextButtonText: "Next",
  modelValue: null,

  // Default configuration
  ratings: () => [
    { emoji: "😠", value: 1 },
    { emoji: "☹️", value: 2 },
    { emoji: "😐", value: 3 },
    { emoji: "🙂", value: 4 },
    { emoji: "😍", value: 5 },
  ],

  // Default placement and visibility
  placement: "bottom-right",
  offset: 0,
  isOpen: true,
  deviceType: "desktop",

  // Default colors
  backgroundColor: "white",
  questionColor: "#000000",
  labelColor: "#666666",
  emojiBackgroundColor: "#FFB800",
  emojiHoverColor: "#FFD700",
  emojiActiveColor: "#FFA500",
  nextButtonBgColor: "#F3F4F6",
  nextButtonTextColor: "#4B5563",

  // Default styling
  maxWidth: "400px",
  borderRadius: "8px",
  padding: "24px",
  gap: "20px",

  // Default button configuration
  showNextButton: true,
  nextButtonDisabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
  "update:isOpen": [value: boolean];
  next: [];
  click: [];
}>();

// Computed styles based on device type and placement
const containerStyles = computed<CSSProperties>(() => ({
  position: "relative",
  width: props.deviceType === "mobile" ? "100%" : "auto",
  maxWidth: props.deviceType === "mobile" ? "100%" : props.maxWidth,
  backgroundColor: props.backgroundColor,
  borderRadius: props.borderRadius,
  padding: props.padding,
  boxShadow:
    "0px 0px 12px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
}));

// Placement styles
const positionStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    position: "relative",
  };

  switch (props.placement) {
    case "top-left":
      styles.top = `${props.offset}px`;
      styles.left = `${props.offset}px`;
      break;
    case "top-right":
      styles.top = `${props.offset}px`;
      styles.right = `${props.offset}px`;
      break;
    case "bottom-left":
      styles.bottom = `${props.offset}px`;
      styles.left = `${props.offset}px`;
      break;
    case "bottom-right":
      styles.bottom = `${props.offset}px`;
      styles.right = `${props.offset}px`;
      break;
    case "center":
      styles.top = "50%";
      styles.left = "50%";
      styles.transform = "translate(-50%, -50%)";
      break;
  }

  return styles;
});

// Compute emoji container styles
const getEmojiContainerStyle = (value: number): CSSProperties => ({
  backgroundColor:
    props.modelValue === value
      ? props.emojiActiveColor
      : props.emojiBackgroundColor,
});

// Event handlers
const updateRating = (value: number) => {
  emit("update:modelValue", value);
};

const handleNext = () => {
  emit("next");
};

const handleClick = () => {
  emit("update:isOpen", !props.isOpen);
  emit("click");
};
</script>

<template>
  <div
    class="feedback-preview shadow-lg"
    :style="[containerStyles, positionStyles]"
  >
    <div
      class="w-full flex gap-2 justify-between items-center mb-6"
      @click="handleClick"
    >
      <ChevronUp v-if="!isOpen" />
      <ChevronDown v-else />
    </div>
    <!-- Preview Header -->
    <div class="w-full flex gap-2 justify-between items-center mb-6">
      <h3 class="text-lg font-medium" :style="{ color: questionColor }">
        {{ question }}
      </h3>
    </div>

    <!-- Rating Section -->
    <div class="space-y-6">
      <!-- Emojis -->
      <div class="flex justify-between items-center" :style="{ gap }">
        <div
          v-for="rating in ratings"
          :key="rating.value"
          @click="updateRating(rating.value)"
          class="cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <div
            class="w-12 h-12 flex items-center justify-center rounded-md text-2xl transition-colors duration-200"
            :class="{
              'transform scale-110': modelValue === rating.value,
            }"
            :style="getEmojiContainerStyle(rating.value)"
          >
            {{ rating.emoji }}
          </div>
        </div>
      </div>

      <!-- Labels -->
      <div class="flex justify-between text-sm" :style="{ color: labelColor }">
        <span>{{ leftLabel }}</span>
        <span>{{ rightLabel }}</span>
      </div>

      <!-- Next Button -->
      <div v-if="showNextButton" class="flex justify-end mt-6">
        <button
          @click="handleNext"
          :disabled="nextButtonDisabled || !modelValue"
          class="px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :style="{
            backgroundColor: nextButtonBgColor,
            color: nextButtonTextColor,
          }"
        >
          {{ nextButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>
