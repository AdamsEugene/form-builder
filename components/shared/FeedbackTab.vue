// FeedbackTab.vue
<script setup lang="ts">
import type { CSSProperties } from "vue";
import type { PopoverPlacement, SidePlacement } from "~/types";

type FeedBackTab =
  | "popover"
  | "button"
  | "bubble"
  | "embedded"
  | "fullScreen"
  | "link";

interface Props {
  modelValue?: boolean;
  placement?: SidePlacement | PopoverPlacement;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  offset?: string;
  showIcon?: boolean;
  contentWidth?: string;
  feedbackType?: FeedBackTab;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  placement: "right",
  backgroundColor: "#C4432A",
  textColor: "#FFFFFF",
  width: "120px",
  height: "40px",
  borderRadius: "8px 8px 0 0",
  offset: "50%",
  showIcon: true,
  contentWidth: "400px",
  feedbackType: "popover",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  click: [];
}>();

const tabStyles = computed<CSSProperties>(() => {
  const isRight = props.placement === "right";

  return {
    position: "relative",
    right: isRight ? "-58px" : "58px",
    // [props.placement]: "0",
    // top: props.offset,
    transform: `translateY(-50%) ${
      isRight ? "rotate(-90deg)" : "rotate(90deg)"
    }`,
    transformOrigin: isRight ? "center bottom" : "center bottom",
    backgroundColor: props.backgroundColor,
    color: props.textColor,
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    zIndex: 50,
    boxShadow:
      "0px 0px 12px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };
});

const containerStyles = computed<CSSProperties>(() => {
  const forButton = props.feedbackType === "button";

  const buttonPlacement: CSSProperties = forButton
    ? {
        position: "absolute",
        [props.placement]: "0",
        top: "50%",
        transform: "translate(0px, -50%)",
      }
    : {};

  return {
    ...buttonPlacement,
    display: "flex",
    alignItems: "center",
    zIndex: 40,
  };
});

// Placement styles
const positionStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    position: "absolute",
  };

  const forPopover = props.feedbackType === "bubble";

  if (forPopover)
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

const contentStyles = computed<CSSProperties>(() => {
  const isRight = props.placement === "right";
  const translateX = isRight ? "76%" : "-76%";

  return {
    position: "relative",
    width: props.contentWidth,
    transform: props.modelValue ? "translateX(0)" : `translateX(${translateX})`,
    transition: "transform 0.3s ease-in-out",
    flexDirection: isRight ? "row" : "row-reverse",
  };
});

const handleClick = () => {
  emit("update:modelValue", !props.modelValue);
  emit("click");
};

watch(
  () => props,
  (newValue) => {
    console.log(newValue);
  }
);
</script>

<template>
  <div class="flex items-center" :style="[containerStyles, positionStyles]">
    <!-- Content Slot with Transition -->
    <div class="flex items-center" :style="contentStyles">
      <!-- Tab Button -->
      <button
        v-if="feedbackType === 'button'"
        class="feedback-tab"
        :style="tabStyles"
        @click="handleClick"
      >
        <span>Feedback</span>
        <span
          v-if="showIcon"
          class="transform"
          :class="{
            '-rotate-90': placement === 'right',
            'rotate-90': placement === 'left',
          }"
          >›</span
        >
      </button>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.feedback-tab:hover {
  filter: brightness(1.1);
}

.feedback-tab:active {
  filter: brightness(0.9);
}
</style>
