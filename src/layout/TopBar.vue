<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
const { logout } = useAuth0();

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
</script>

<template>
   <div
      class="tw-flex tw-items-center tw-justify-between tw-bg-[#bed7ca] tw-p-3 tw-text-[#364636]">
      <div class="tw-flex tw-items-center">
         <img src="/assets/icons/logo.svg" alt="" />
         <span class="tw-font-serif tw-text-3xl">
            KNK<span class="tw-text-base">Global</span>
         </span>
      </div>
      <ul
         class="tw-hidden tw-cursor-pointer tw-gap-16 tw-text-lg tw-font-semibold md:tw-flex">
         <RouterLink class="hover:tw-text-[#071907]" to="/home">Home</RouterLink>
         <RouterLink class="hover:tw-text-[#071907]" to="/dashboard">Dashboard</RouterLink>
         <RouterLink class="hover:tw-text-[#071907]" to="/profile">Profile</RouterLink>
         <li class="hover:tw-text-[#071907]" @click="handleLogout">LogOut</li>
      </ul>
      <div @click="toggleDarkMode()">
         <img src="/assets/icons/dark.svg" alt="" />
      </div>
   </div>
</template>

<style scoped></style>
