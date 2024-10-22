<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

import "primeicons/primeicons.css";

const { loginWithRedirect } = useAuth0();

const handleLogin = () => {
    loginWithRedirect({
        appState:{
            target: "/home"
        }
    })
} 

</script>

<template>
    <div class="tw-m-10 tw-flex tw-justify-center">
       <div
          class="tw-flex tw-select-none tw-cursor-pointer tw-items-center tw-rounded-md tw-border-2 tw-border-[#13214d] tw-p-3 tw-text-xl tw-font-semibold tw-text-[#13214d]">
          <i class="pi pi-ethereum" style="font-size: 2rem"></i>
          <span @click="handleLogin">Log In</span>
       </div>
    </div>
 </template>