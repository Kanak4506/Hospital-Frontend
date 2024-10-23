<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";

// Patient Id Select
const patientIdOptions = ref([
   "9fd941d1-a6a1-a223-c359-757c37d5eae6",
   "97f1818a-c70b-db16-3418-2c3c89196401",
   "57e9bf0d-8231-61a8-7474-58568e0bc96c",
   "9f51b7a3-7ce7-9e9f-113d-c021cac67c38",
   "a40ec84a-0f89-f0e7-dfe1-0a3ad3e0f1f6",
]);
const selectedPatientId = ref()

const patientProfile = ref(); // fetched patient data
const isLoading = ref(false);

async function patientData() {
   const params = {
      id: selectedPatientId.value || "e0f9b98c-f983-cba1-9095-0e48d10f0195",
   };
   try {
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/patient`,
         params,
      );
      console.log(result.data[0]);
      patientProfile.value = result.data[0];
      isLoading.value = true;
   } catch (error) {
      console.log(error);
   }
}
onMounted(async () => {
   await patientData();
});


watch(selectedPatientId, async() => {
await patientData()
})
</script>

<template>
   <div>
      <div class="tw-flex tw-items-center tw-gap-5 tw-p-10">
         <FloatLabel >
            <label for="over_label" style="z-index: 10;">Patient Id</label> 
            <Select id="over_label" v-model="selectedPatientId" :options="patientIdOptions"  class="tw-w-96" />
         </FloatLabel>
      </div>
      <div v-if="isLoading" class="tw-border-8 tw-p-5">
         <div class="tw-flex tw-gap-2 sm:tw-gap-10">
            <!-- # Main Details -->
            <div
               class="tw-flex tw-w-64 tw-h-fit tw-flex-col tw-items-center tw-gap-2 tw-border tw-p-4">
               <div>
                  <img
                     class="tw-h-36"
                     v-if="patientProfile.gender === 'Male'"
                     src="/assets/images/malePatient.png"
                     alt="gender" />
                  <img
                     v-else
                     class="tw-h-36"
                     src="/assets/images/femalePatient.png"
                     alt="gender" />
               </div>
               <span class="tw-text-center tw-text-[#364636]">
                  {{ patientProfile.firstName }} {{ patientProfile.lastName }}
               </span>
               <span
                  v-if="patientProfile.status !== 'Alive'"
                  class="tw-text-red-500">
                  Inactive
               </span>
               <span v-else class="tw-text-green-500">Active</span>
               <div>
                  <div class="tw-flex tw-justify-between">
                     <span class="tw-font-semibold tw-text-gray-400">
                        Gender
                     </span>
                     <span>{{ patientProfile.gender }}</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                     <span class="tw-w-40 tw-font-semibold tw-text-gray-400">
                        Status
                     </span>
                     <span>{{ patientProfile.status }}</span>
                  </div>
                  <div
                     class="tw-flex tw-justify-between"
                     v-if="patientProfile.status !== 'Alive'">
                     <span class="tw-font-semibold tw-text-gray-400">
                        Death Date
                     </span>
                     <span>{{ patientProfile.deathDate }}</span>
                  </div>
                  <div class="tw-flex tw-justify-between">
                     <span class="tw-font-semibold tw-text-gray-400">
                        Total
                        <br />
                        Appointments
                     </span>
                     <span>{{ patientProfile.totalAppointments }}</span>
                  </div>
               </div>
            </div>
            <!-- # More Details -->
            <div class="tw-p-5">
               <!-- # Personal Details -->
               <div>
                  <span class="tw-text-lg tw-font-semibold tw-text-slate-600">
                     PERSONAL DETAILS
                  </span>

                  <div class="tw-mt-3 tw-flex sm:tw-flex-row tw-flex-col sm:tw-gap-20">
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Last Name
                        </span>
                        <span>{{ patientProfile.lastName }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           First Name
                        </span>
                        <span>{{ patientProfile.firstName }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Date Of Birth
                        </span>
                        <span>{{ patientProfile.birthday }}</span>
                     </div>
                  </div>

                  <div class="sm:tw-my-5 tw-flex tw-flex-wrap sm:tw-flex-row tw-flex-col sm:tw-gap-20">
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Marital Status
                        </span>
                        <span>{{ patientProfile.martialStatus }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Total Appointments
                        </span>
                        <span>{{ patientProfile.totalAppointments }}</span>
                     </div>
                  </div>
               </div>
               <!-- # Home Town Details -->
               <div class="tw-my-5">
                  <span class="tw-text-lg tw-font-semibold tw-text-slate-600">
                     Home Town Details
                  </span>
                  <div class="tw-mb-5 tw-mt-3 tw-flex sm:tw-flex-row tw-flex-col sm:tw-gap-20">
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Address
                        </span>
                        <span>{{ patientProfile.Address }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           City
                        </span>
                        <span>{{ patientProfile.City }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           State
                        </span>
                        <span>{{ patientProfile.State }}</span>
                     </div>
                  </div>
               </div>

               <!-- # Cultural Background -->
               <div>
                  <span class="tw-text-lg tw-font-semibold tw-text-slate-600">
                     Cultural Background
                  </span>
                  <div class="tw-mt-3 tw-flex sm:tw-flex-row tw-flex-col sm:tw-gap-20">
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Address
                        </span>
                        <span>{{ patientProfile.Race }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           State
                        </span>
                        <span>{{ patientProfile.Ethnicity }}</span>
                     </div>
                     <div class="tw-flex tw-flex-col">
                        <span class="tw-font-semibold tw-text-gray-400">
                           Address
                        </span>
                        <span>{{ patientProfile.birthPlace }}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap");
div {
   font-family: "SUSE", sans-serif;
}
</style>
