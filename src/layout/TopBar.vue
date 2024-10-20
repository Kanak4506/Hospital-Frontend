<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
const { logout } = useAuth0();

const handleLogout = () => {
   logout({
      logoutParams: {
         returnTo: window.location.origin,
      }
   })
}
</script>

<template>
   <div class="tw-flex  tw-text-[#364636] tw-bg-[#bed7ca] tw-items-center tw-justify-between tw-p-2">
      <div class="tw-flex  tw-items-center">
         <img src="/assets/icons/logo.svg" alt="" />
         <span class="tw-font-serif tw-text-3xl">
            KNK<span class="tw-text-base">Global</span>
         </span>
      </div>
      <ul class="tw-hidden md:tw-flex tw-font-semibold tw-text-lg   tw-gap-16 tw-cursor-pointer">
         <li>Home</li>
         <li>Dashboard</li>
         <li>Profile</li>
         <li @click="handleLogout">LogOut</li>
      </ul>
      <div>
         <div>icon</div>
      </div>
   </div>
</template>

<style scoped></style>
   