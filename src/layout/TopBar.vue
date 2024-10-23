<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
const { logout } = useAuth0();

import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const handleLogout = () => {
   logout({
      logoutParams: {
         returnTo: window.location.origin,
      },
   });
};
function toggleDarkMode() {
   document.documentElement.classList.toggle("my-app-dark");
}
function menuToggle() {
   global.toggleMenu = !global.toggleMenu;
}
document.addEventListener("click", (event) => {
   const menu = document.querySelector(".menu");
   const menu_btn = document.querySelector(".menu_toggle_btn");

   if (!menu.contains(event.target) && !menu_btn.contains(event.target)) {
      menu.style.display = "none";
      global.toggleMenu = false;
   }
});
</script>

<template>
   <div class="tw-bg-[#bed7ca]">
      <!-- # TopBar for large screens -->
      <div
         class="tw-hidden tw-items-center tw-justify-between tw-p-3 tw-text-[#364636] md:tw-flex">
         <div class="tw-flex tw-items-center">
            <img src="/assets/icons/logo.svg" alt="" />
            <span class="tw-font-serif tw-text-3xl">
               KNK
               <span class="tw-text-base">Global</span>
            </span>
         </div>
         <ul
            class="tw-hidden tw-cursor-pointer tw-gap-16 tw-text-lg tw-font-semibold md:tw-flex">
            <RouterLink class="hover:tw-text-[#071907]" to="/home">
               Home
            </RouterLink>
            <RouterLink class="hover:tw-text-[#071907]" to="/dashboard">
               Dashboard
            </RouterLink>
            <RouterLink class="hover:tw-text-[#071907]" to="/profile">
               Profile
            </RouterLink>
            <li class="hover:tw-text-[#071907]" @click="handleLogout">
               LogOut
            </li>
         </ul>
         <div @click="toggleDarkMode()">
            <img src="/assets/icons/dark.svg" alt="" />
         </div>
      </div>

      <!--# Bro for small screens-->
      <div
         class="tw-flex tw-items-center tw-justify-between tw-p-4 md:tw-hidden">
         <div class="menu_toggle_btn" @click="menuToggle">
            <img src="/assets/icons/menu.svg" alt="" />
         </div>
         <!-- </div> -->
         <div class="tw-flex tw-items-center">
            <img src="/assets/icons/logo.svg" alt="" />
            <span class="tw-font-serif tw-text-3xl">
               KNK
               <span class="tw-text-base">Global</span>
            </span>
         </div>
         <div @click="toggleDarkMode()">
            <img src="/assets/icons/dark.svg" alt="" />
         </div>
      </div>
      <!-- # SideBar On Toggle -->
      <div
         v-if="global.toggleMenu"
         class="menu tw-fixed tw-top-[68px]  tw-h-[90vh] tw-overflow-auto tw-bg-[#fcf9ec] tw-p-4 lg:tw-hidden" style="z-index: 1000;">
         <ul
            class="tw-flex tw-w-1/4 tw-cursor-pointer tw-flex-col tw-justify-center tw-gap-8 tw-text-lg tw-font-semibold md:tw-flex">
            <RouterLink class="hover:tw-text-[#071907]" to="/home">
               Home
            </RouterLink>
            <RouterLink class="hover:tw-text-[#071907]" to="/dashboard">
               Dashboard
            </RouterLink>
            <RouterLink class="hover:tw-text-[#071907]" to="/profile">
               Profile
            </RouterLink>
            <li class="hover:tw-text-[#071907]" @click="handleLogout">
               LogOut
            </li>
         </ul>
      </div>
   </div>
</template>


<style scoped>
.menu {
   animation: moveMenu 1s ease-in;
}

@keyframes moveMenu {
   0% { left: -50; opacity: 0; }      
   100% { left:10; opacity: 1; }        
}
</style>
