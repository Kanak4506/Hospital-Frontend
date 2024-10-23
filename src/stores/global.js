import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
    const toggleMenu = ref(false);
    const menuClass = computed(() => (toggleMenu.value ? 'tw-opacity-20' : ''));
    return {toggleMenu, menuClass};
})