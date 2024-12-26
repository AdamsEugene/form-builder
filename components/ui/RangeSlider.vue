# UiRangeSlider.vue
<script setup lang="ts">
interface Props {
    modelValue: number;
    min?: number;
    max?: number;
    step?: number;
    showLabels?: boolean;
    showValue?: boolean;
    trackColor?: string;
    thumbColor?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 10,
    step: 1,
    showLabels: true,
    showValue: true,
    trackColor: '#ef4444', // Tailwind red-500
    thumbColor: '#ffffff',
    disabled: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: number];
    change: [value: number];
}>();

// Generate labels array for the scale
const labels = computed(() => {
    const result = [];
    for (let i = props.min; i <= props.max; i += props.step) {
        result.push(i);
    }
    return result;
});

// Calculate progress percentage for coloring the track
const progressPercentage = computed(() => {
    return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

// Handle value changes
const handleInput = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value);
    emit('update:modelValue', value);
    emit('change', value);
};
</script>

<template>
    <div class="w-full">
        <!-- Slider Input -->
        <div class="relative w-full h-6 flex items-center">
            <input
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :value="modelValue"
                :disabled="disabled"
                @input="handleInput"
                class="w-full h-1 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed"
                :style="{
                    background: `linear-gradient(to right, ${trackColor} ${progressPercentage}%, #e5e7eb ${progressPercentage}%)`,
                }"
            />
        </div>

        <!-- Labels -->
        <div v-if="showLabels" class="relative w-full mt-1 flex justify-between text-sm text-gray-600">
            <span
                v-for="label in labels"
                :key="label"
                class="flex-1 text-center"
                :class="{ 'font-medium': label === modelValue }"
            >
                {{ label }}
            </span>
        </div>
    </div>
</template>

<style scoped>
input[type='range'] {
    -webkit-appearance: none;
    background: transparent;
}

/* Thumb styles */
input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: v-bind(thumbColor);
    border: 2px solid v-bind(trackColor);
    cursor: pointer;
    margin-top: -7px; /* Center thumb vertically */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type='range']::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: v-bind(thumbColor);
    border: 2px solid v-bind(trackColor);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Track styles */
input[type='range']::-webkit-slider-runnable-track {
    height: 2px;
    border-radius: 1px;
    cursor: pointer;
}

input[type='range']::-moz-range-track {
    height: 2px;
    border-radius: 1px;
    cursor: pointer;
}

/* Disabled state */
input[type='range']:disabled::-webkit-slider-thumb {
    background: #e5e7eb;
    border-color: #9ca3af;
    cursor: not-allowed;
}

input[type='range']:disabled::-moz-range-thumb {
    background: #e5e7eb;
    border-color: #9ca3af;
    cursor: not-allowed;
}
</style>
