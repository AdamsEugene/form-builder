<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  autocomplete?: string;
  min?: number;
  max?: number;
  pattern?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: string;
  rightIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  disabled: false,
  size: "md",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputId = computed(
  () => props.id || `input-${Math.random().toString(36).slice(2)}`
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-2 py-1 text-sm";
    case "lg":
      return "px-4 py-3 text-lg";
    default:
      return "px-3 py-2 text-base";
  }
});

const inputClasses = computed(() => [
  "form-input-base",
  sizeClasses.value,
  "transition-colors duration-200",
  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  props.error
    ? "border-error-light focus:border-error-light focus:ring-error-light/20 dark:border-error-dark dark:focus:border-error-dark"
    : "border-gray-300 dark:border-gray-600",
  props.disabled &&
    "bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-dark-surface/60",
  props.leftIcon && "pl-10",
  props.rightIcon && "pr-10",
]);

const containerClasses = computed(() => [
  "group relative w-full",
  props.disabled && "opacity-75",
]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value =
    props.type === "number" ? parseFloat(target.value) : target.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="form-label-base">
      {{ label }}
      <span v-if="required" class="text-error-light dark:text-error-dark ml-1"
        >*</span
      >
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Left Icon -->
      <div
        v-if="leftIcon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      >
        <i :class="leftIcon"></i>
      </div>

      <!-- Input -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :name="name"
        :autocomplete="autocomplete"
        :min="min"
        :max="max"
        :pattern="pattern"
        :class="inputClasses"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <!-- Right Icon -->
      <div
        v-if="rightIcon"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      >
        <i :class="rightIcon"></i>
      </div>
    </div>

    <!-- Helper Text or Error Message -->
    <div
      v-if="helper || error"
      :class="[
        'mt-1 text-sm',
        error
          ? 'text-error-light dark:text-error-dark'
          : 'text-gray-500 dark:text-gray-400',
      ]"
    >
      {{ error || helper }}
    </div>
  </div>
</template>
