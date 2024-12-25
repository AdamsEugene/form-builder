/* eslint-disable @typescript-eslint/no-explicit-any */
// directives/clickOutside.ts
export const vClickOutside = {
    mounted(el: any, binding: any) {
        el._clickOutside = (event: MouseEvent) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el._clickOutside);
    },
    unmounted(el: any) {
        document.removeEventListener('click', el._clickOutside);
    },
};
