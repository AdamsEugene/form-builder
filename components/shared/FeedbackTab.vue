// FeedbackTab.vue
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { PopoverPlacement, SidePlacement } from '~/types';
import ToggleButton from './ToggleButton.vue';

type FeedBackTab = 'popover' | 'button' | 'bubble' | 'embedded' | 'fullScreen' | 'link';

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
    placement: 'right',
    backgroundColor: '#C4432A',
    textColor: '#FFFFFF',
    width: '120px',
    height: '40px',
    borderRadius: '8px 8px 0 0',
    offset: '0',
    showIcon: true,
    contentWidth: '400px',
    feedbackType: 'popover',
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    click: [];
}>();

const tabStyles = computed<CSSProperties>(() => {
    const isRight = props.placement === 'right';

    return {
        position: 'relative',
        right: isRight ? '-58px' : '58px',
        // [props.placement]: "0",
        // top: props.offset,
        transform: `translateY(-50%) ${isRight ? 'rotate(-90deg)' : 'rotate(90deg)'}`,
        transformOrigin: isRight ? 'center bottom' : 'center bottom',
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        zIndex: 50,
        boxShadow: '0px 0px 12px 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    };
});

const containerStyles = computed<CSSProperties>(() => {
    const forButton = props.feedbackType === 'button';
    const forFullScreen = props.feedbackType === 'fullScreen' || props.feedbackType === 'link';

    const buttonPlacement: CSSProperties = forButton
        ? {
              position: 'absolute',
              [props.placement]: '0',
              top: '50%',
              transform: 'translate(0px, -50%)',
          }
        : {};

    const centerItem: CSSProperties = forFullScreen
        ? {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
          }
        : {};

    const flexDirection: CSSProperties =
        props.feedbackType === 'bubble'
            ? { flexDirection: 'column', alignItems: 'end' }
            : { flexDirection: 'row', alignItems: 'center' };

    return {
        ...buttonPlacement,
        ...flexDirection,
        ...centerItem,
        display: 'flex',
        zIndex: 99,
    };
});

// Placement styles
const positionStyles = computed<CSSProperties>(() => {
    const styles: CSSProperties = {
        position: 'absolute',
    };

    let _offset = props.offset;

    const forPopover =
        props.feedbackType === 'popover' || props.feedbackType === 'bubble' || props.feedbackType === 'embedded';

    if (props.feedbackType === 'bubble') _offset = '16';

    if (forPopover)
        switch (props.placement) {
            case 'top-left':
                styles.top = `${_offset}px`;
                styles.left = `${_offset}px`;
                break;
            case 'top-right':
                styles.top = `${_offset}px`;
                styles.right = `${_offset}px`;
                break;
            case 'bottom-left':
                styles.bottom = `${_offset}px`;
                styles.left = `${_offset}px`;
                break;
            case 'bottom-right':
                styles.bottom = `${_offset}px`;
                styles.right = `${_offset}px`;
                break;
            case 'center':
                styles.top = '50%';
                styles.left = '50%';
                styles.transform = 'translate(-50%, -50%)';
                break;
        }

    return styles;
});

const contentStyles = computed<CSSProperties>(() => {
    const isRight = props.placement === 'right';
    const isLeft = props.placement === 'left';
    const isTopLeft = props.placement === 'top-left';
    const isTopRight = props.placement === 'top-right';
    const isBottomLeft = props.placement === 'bottom-left';
    const isBottomRight = props.placement === 'bottom-right';

    // Base styles that apply to both types
    const baseStyles: CSSProperties = {
        position: 'relative',
        width: props.contentWidth,
        flexDirection: isRight || isBottomRight || isBottomLeft ? 'row' : 'row-reverse',
    };

    // If it's bubble type, handle fade animation
    if (props.feedbackType === 'bubble' || props.feedbackType === 'fullScreen' || props.feedbackType === 'link') {
        return {
            ...baseStyles,
            marginBottom: '16px',
            opacity: props.modelValue ? 1 : 0,
            visibility: props.modelValue ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        };
    }

    // Otherwise, handle slide animations
    let translateX = '0';
    let translateY = '0';

    if (isRight) translateX = '76%';
    else if (isLeft) translateX = '-76%';
    else if (isTopLeft || isTopRight) translateY = '-80%';
    else if (isBottomLeft || isBottomRight) translateY = '80%';

    return {
        ...baseStyles,
        transform: props.modelValue ? 'translate(0, 0)' : `translate(${translateX}, ${translateY})`,
        transition: 'transform 0.3s ease-in-out',
    };
});

const handleClick = () => {
    emit('update:modelValue', !props.modelValue);
    emit('click');
};

watch(
    () => props,
    (newValue) => {
        // console.log(newValue);
    },
    { deep: true, immediate: true }
);
</script>

<template>
    <div class="flex" :style="[containerStyles, positionStyles]">
        <!-- Content Slot with Transition -->
        <div class="flex items-center" :style="contentStyles">
            <!-- Tab Button -->
            <button v-if="feedbackType === 'button'" class="feedback-tab" :style="tabStyles" @click="handleClick">
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

        <div v-if="feedbackType === 'bubble'" class="">
            <ToggleButton :handle-click="handleClick" :is-open="modelValue" />
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
