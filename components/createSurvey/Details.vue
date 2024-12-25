<script setup lang="ts">
import FormInput from '../ui/FormInput.vue';
import FormTextarea from '../ui/FormTextarea.vue';
import { useGlobal } from '@/composables/useGlobal';

const { survey, setSurvey } = useGlobal();

const email = ref(survey.value?.email || '');
const emailError = ref('');
const description = ref(survey.value?.description || '');

// Watch for changes and update global state
watch(email, (newValue) => {
    setSurvey({
        email: newValue,
    });
});

watch(description, (newValue) => {
    setSurvey({
        description: newValue,
    });
});

const isAccepted = ref(false);
const isChecked1 = ref(false);
const isChecked2 = ref(false);
const isChecked3 = ref(false);
const isChecked4 = ref(false);
const isChecked5 = ref(false);
const isChecked6 = ref(false);
const isChecked7 = ref(false);

const size = ref('medium');
const placement = ref('right');
const withHelpers = ref('');
const withError = ref('');

const isSelected = ref(false);
const isDisabled = ref(false);

const selectedOption = ref('option1');
</script>

<template>
    <div class="flex flex-col gap-8">
        <FormInput
            v-model="email"
            label="Email Address"
            type="search"
            placeholder="Enter your email"
            helper="We'll never share your email"
            required
            leftIcon="i-heroicons-envelope"
            :size="'sm'"
            :error="emailError"
        />

        <FormTextarea
            v-model="description"
            label="Description"
            placeholder="Enter your description"
            helper="Maximum 500 characters"
            :maxlength="500"
            autogrow
            required
        />

        <UiBaseCheckbox
            v-model="isAccepted"
            label="Accept terms and conditions"
            description="By accepting, you agree to our terms of service and privacy policy"
            helper-text="You can change this later in settings"
            required
        />

        <!-- Different sizes -->
        <UiBaseCheckbox v-model="isChecked1" label="Small checkbox" size="sm" />

        <UiBaseCheckbox v-model="isChecked2" label="Medium checkbox (default)" size="md" />

        <UiBaseCheckbox v-model="isChecked3" label="Large checkbox" size="lg" />

        <!-- Different label placements -->
        <UiBaseCheckbox v-model="isChecked4" label="Label on right (default)" labelPlacement="right" />

        <UiBaseCheckbox v-model="isChecked5" label="Label on left" labelPlacement="left" />

        <UiBaseCheckbox v-model="isChecked6" label="Label on top" labelPlacement="top" />

        <UiBaseCheckbox v-model="isChecked7" label="Label on bottom" labelPlacement="bottom" />

        <div class="space-y-4">
            <!-- Basic radio group -->
            <div class="space-y-2">
                <UiBaseRadio v-model="selectedOption" name="options" value="option1" label="Option 1" />
                <UiBaseRadio v-model="selectedOption" name="options" value="option2" label="Option 2" />
                <UiBaseRadio v-model="selectedOption" name="options" value="option3" label="Option 3" />
            </div>

            <!-- Different sizes -->
            <div class="space-y-2">
                <UiBaseRadio v-model="size" name="sizes" value="small" label="Small radio" size="sm" />
                <UiBaseRadio v-model="size" name="sizes" value="medium" label="Medium radio" size="md" />
                <UiBaseRadio v-model="size" name="sizes" value="large" label="Large radio" size="lg" />
            </div>

            <!-- Different label placements -->
            <div class="space-y-2">
                <UiBaseRadio
                    v-model="placement"
                    name="placements"
                    value="right"
                    label="Label on right"
                    labelPlacement="right"
                />
                <UiBaseRadio
                    v-model="placement"
                    name="placements"
                    value="left"
                    label="Label on left"
                    labelPlacement="left"
                />
                <UiBaseRadio
                    v-model="placement"
                    name="placements"
                    value="top"
                    label="Label on top"
                    labelPlacement="top"
                />
                <UiBaseRadio
                    v-model="placement"
                    name="placements"
                    value="bottom"
                    label="Label on bottom"
                    labelPlacement="bottom"
                />
            </div>

            <!-- With description and helper text -->
            <UiBaseRadio
                v-model="withHelpers"
                name="withHelpers"
                value="detailed"
                label="Detailed option"
                description="This is a more detailed description of the option"
                helperText="Additional information about this choice"
            />

            <!-- With error state -->
            <UiBaseRadio
                v-model="withError"
                name="withError"
                value="error"
                label="Error state"
                error="This field is required"
                required
            />
        </div>

        <div class="space-y-4">
            <!-- Basic usage -->
            <UiBasePillCheckbox v-model="isSelected" label="label text" />

            <!-- Disabled state -->
            <UiBasePillCheckbox v-model="isDisabled" label="Disabled option" disabled />
        </div>

        <div class="space-y-2">
            <!-- Basic radio group -->
            <UiBasePillRadio v-model="selectedOption" name="options" value="option1" label="Option 1" />
            <UiBasePillRadio v-model="selectedOption" name="options" value="option2" label="Option 2" />
            <UiBasePillRadio v-model="selectedOption" name="options" value="option3" label="Option 3" />

            <!-- Disabled option -->
            <UiBasePillRadio v-model="selectedOption" name="options" value="option4" label="Disabled option" disabled />
        </div>
    </div>
</template>
