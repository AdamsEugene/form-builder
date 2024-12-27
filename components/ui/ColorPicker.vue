<script setup lang="ts">
interface Props {
    modelValue: string;
    label?: string;
    predefinedColors?: string[];
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Background color',
    predefinedColors: () => [
        '#E0E0E0', // Light Gray
        '#FF9800', // Orange
        '#FFC107', // Amber
        '#4CAF50', // Green
        '#03A9F4', // Light Blue
        '#9C27B0', // Purple
        '#F44336', // Red
        '#E91E63', // Pink
    ],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const selectedColor = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const customColorHex = ref('');
const colorPickerValue = ref('#000000');
const isCustom = ref(false);
const hoveredColor = ref('');
const tooltipPosition = ref({ x: 0, y: 0 });

const selectColor = (color: string) => {
    selectedColor.value = color;
    isCustom.value = false;
};

// const enableCustom = () => {
//     isCustom.value = true;
//     if (customColorHex.value) {
//         selectedColor.value = customColorHex.value;
//         colorPickerValue.value = customColorHex.value;
//     }
// };

const handleCustomInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (!value.startsWith('#')) {
        value = '#' + value;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        customColorHex.value = value;
        colorPickerValue.value = value;
        if (isCustom.value) {
            selectedColor.value = value;
        }
    }
};

const handleColorPickerInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    customColorHex.value = value;
    if (isCustom.value) {
        selectedColor.value = value;
    }
};

const resetColor = () => {
    customColorHex.value = '';
    colorPickerValue.value = '#000000';
    if (isCustom.value) {
        selectedColor.value = '';
    }
};

// Update the showTooltip function to handle positioning better
const showTooltip = (event: MouseEvent, color: string) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    hoveredColor.value = color;
    selectedColor.value = color;
    tooltipPosition.value = {
        x: rect.left + rect.width / 2, // Center horizontally
        y: rect.top - 10, // Position above the color swatch
    };
};

// Update tooltipStyle computed property
const tooltipStyle = computed(() => ({
    left: `${tooltipPosition.value.x}px`,
    top: `${tooltipPosition.value.y}px`,
    transform: 'translate(-50%, -100%)', // Center the tooltip
}));

const hideTooltip = () => {
    hoveredColor.value = '';
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue && isCustom.value) {
            customColorHex.value = newValue;
            colorPickerValue.value = newValue;
        }
    }
);
</script>

<template>
    <div class="inline-flex flex-wrap flex-col items-start gap-4 p-2 rounded-lg w-max">
        <p class="text-sm font-medium text-left text-gray-700 dark:text-gray-300">{{ label }}</p>

        <!-- Predefined Colors -->
        <div class="grid grid-cols-5 gap-4">
            <button
                v-for="color in predefinedColors"
                :key="color"
                class="w-8 h-8 rounded-full border-2 border-transparent cursor-pointer transition-all hover:border-gray-300 relative"
                :class="{ 'ring-2 ring-blue-500 ring-offset-2': selectedColor === color }"
                :style="{ backgroundColor: color }"
                @mouseenter="showTooltip($event, color)"
                @mouseleave="hideTooltip"
                @click="selectColor(color)"
            ></button>
        </div>

        <!-- Custom Color Input -->
        <div class="flex items-center gap-4 w-full h-8 mt-2">
            <UiBaseCheckbox v-model="isCustom" label="Custom" class="w-full" />

            <div v-show="isCustom" class="flex items-center gap-2 w-full">
                <input
                    type="color"
                    v-model="colorPickerValue"
                    class="w-8 h-8 p-0 border-0 rounded cursor-pointer [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded"
                    @input="handleColorPickerInput"
                />
                <input
                    type="text"
                    v-model="customColorHex"
                    placeholder="#ffffff"
                    class="w-20 px-2 py-1 text-sm !border-none !outline-none rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                    @input="handleCustomInput"
                    maxlength="7"
                />
                <UiBaseButton v-show="customColorHex" variant="ghost" @click="resetColor"> Reset </UiBaseButton>
            </div>
        </div>

        <!-- Enhanced Tooltip -->
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div
                v-if="hoveredColor"
                class="fixed z-50 px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-700 rounded shadow-lg pointer-events-none"
                :style="tooltipStyle"
            >
                {{ hoveredColor }}
            </div>
        </Transition>
    </div>
</template>
