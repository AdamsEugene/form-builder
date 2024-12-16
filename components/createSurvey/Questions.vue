<script setup lang="ts">
import { ref } from 'vue';
import YourFormComponent from './YourFormComponent';
import BaseButton from '../ui/BaseButton.vue';
import Popover from './Popover.vue';
// console.log('====================================');
// console.log(YourFormComponent);
// console.log('====================================');
console.log(BaseButton);
const customCSS = ref(`
  /* Add any custom styles here */
  .preview-container {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
`);
</script>

<template>
    <div class="grid grid-cols-1 gap-4">
        <div>
            <SharedIframePreview :component="Popover" />
        </div>
    </div>
</template>
