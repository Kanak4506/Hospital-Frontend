<script setup>
import axios from "axios";
import Select from "primevue/select";

import { onMounted, reactive, ref, watch } from "vue";
const selectedMonth = ref(null);
const monthOptions = ref([
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
]);
/**
 * # Kpi Start
 */

const totalAppointments = ref(null);
const registeredPatients = ref(null);
const emergencyPatients = ref(null);
const deathRate = ref(null);

async function getAppointmentData(selMonth) {
   try {
      const params = {
         month: selMonth || "May",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/kpi`,
         params,
      );
      // console.log(result.data[0]);
      totalAppointments.value = result.data[0].totalAppointments;
      registeredPatients.value = result.data[0].totalPatients;
      emergencyPatients.value = result.data[0].emergencyPatients;
      deathRate.value = result.data[0].deathRate;
   } catch (error) {
      console.error(error);
   }
}

/**
 * # Kpi End
 */

//  **********************************************************
/**
 * # Gender Data Fetch Start
 */
const genderWisePatientsData = ref(null);
const genderByMarriedStatusChartOptions = ref();

async function getGenderByMarriedStatus(selMonth) {
   try {
      const params = {
         month: selMonth || "May",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/gender-by-maritial`,
         params,
      );
      genderWisePatientsData.value = result.data[0];
      await renderGenderByMarriedStatusChart();
   } catch (error) {
      console.log(error);
   }
}

async function renderGenderByMarriedStatusChart() {
   const genderGraphData = ref([]);

   for (const each in genderWisePatientsData.value) {
      if (genderWisePatientsData.value.hasOwnProperty(each)) {
         genderGraphData.value.push({
            name: each,
            value: genderWisePatientsData.value[each],
         });
      }
   }

   genderByMarriedStatusChartOptions.value = {
      tooltip: {
         trigger: "item",
      },
      legend: {
         top: "5%",
         left: "center",
      },
      series: [
         {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
               borderRadius: 10,
               borderColor: "#fff",
               borderWidth: 2,
            },
            label: {
               show: false,
               position: "center",
            },
            emphasis: {
               label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
               },
            },
            labelLine: {
               show: false,
            },
            data: genderGraphData.value,
         },
      ],
   };
}

/**
 * #  Gender Data Fetch End
 */

//  **********************************************************

/**
 * # Claim Cost By Disease Start
 */

const claimCostByDiseaseData = ref(null);
const claimCostDiseases = ref([]);
const claimCostByDiseaseChartOptions = ref();
async function getClaimCostByDisease(selMonth) {
   try {
      const params = {
         month: selMonth || "May",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/claim-cost-by-disease`,
         params,
      );
      claimCostByDiseaseData.value = result.data;
      await renderClaimCostByDiseaseChart();
   } catch (error) {
      console.log(error);
   }
}

async function renderClaimCostByDiseaseChart() {
   claimCostDiseases.value = claimCostByDiseaseData.value.slice(0, 7);
   const claimCostYValues = ref([]);
   const totalClaimCostValues = ref([]);
   const claimCostBaseEncounterValues = ref([]);
   const claimCostAmountPaidValues = ref([]);

   claimCostDiseases.value.forEach((element) => {
      claimCostYValues.value.push(`${element.disease.slice(0, 10)}..`);
      totalClaimCostValues.value.push(element.totalClaim);
      claimCostBaseEncounterValues.value.push(element.baseEncounterCost);
      claimCostAmountPaidValues.value.push(element.amountGiven);
   });
   // console.log(claimCostDiseases.value);
   claimCostByDiseaseChartOptions.value = {
      tooltip: {
         trigger: "axis",
         axisPointer: {
            type: "shadow",
         },
      },
      legend: {},
      grid: {
         left: "3%",
         right: "4%",
         bottom: "3%",
         containLabel: true,
      },
      xAxis: {
         type: "value",
      },
      yAxis: {
         type: "category",
         data: claimCostYValues.value,
      },
      series: [
         {
            name: "Total Claim Cost",
            type: "bar",
            stack: "total",
            emphasis: {
               focus: "series",
            },
            data: totalClaimCostValues,
         },
         {
            name: "Amount Paid",
            type: "bar",
            stack: "total",
            emphasis: {
               focus: "series",
            },
            data: claimCostAmountPaidValues,
         },
         {
            name: "Base Counter",
            type: "bar",
            stack: "total",
            emphasis: {
               focus: "series",
            },
            data: claimCostBaseEncounterValues,
         },
      ],
   };
}

/**
 * # Claim Cost By Disease End
 */

//  **********************************************************

/**
 * # Gender Data Fetch Start
 */

const encounterReasonByPatients = ref(null);
const encounterReasonByPatientsChartOptions = ref();

async function getEncounterReasonData(selMonth) {
   try {
      const params = {
         month: selMonth || "May",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/encounter-reason`,
         params,
      );
      encounterReasonByPatients.value = result.data;
      console.log(encounterReasonByPatients._rawValue);
      await renderEncounterReasonChart();
   } catch (error) {
      console.log(error);
   }
}

async function renderEncounterReasonChart() {
   // claimCostDiseases.value = claimCostByDiseaseData.value.slice(0, 7);
   const claimCostXValues = ref([]);
   const encounterWisePatients = ref([]);
   // const claimCostBaseEncounterValues = ref([]);
   // const claimCostAmountPaidValues = ref([]);

   for (const each of encounterReasonByPatients.value) {
      claimCostXValues.value.push(each.encounterClass);
      encounterWisePatients.value.push(each.Patients);
   }
   console.log(encounterWisePatients.value);
   encounterReasonByPatientsChartOptions.value = {
      xAxis: {
         type: "category",
         data: claimCostXValues,
      },
      yAxis: {
         type: "value",
      },
      series: [
         {
            data: encounterWisePatients,
            type: "bar",
         },
      ],
   };
}

/**
 * # Claim Cost By Disease End
 */

//  **********************************************************

watch(selectedMonth, async (newValue, oldValue) => {
   await getAppointmentData(newValue);
   await getGenderByMarriedStatus(newValue);
   await getClaimCostByDisease(newValue);
   await getEncounterReasonData(newValue);
});

onMounted(async () => {
   await getAppointmentData();
   await getGenderByMarriedStatus();
   await getClaimCostByDisease();
   await getEncounterReasonData();
});
</script>

<template>
   <div class="tw-bg-[#faf6e1] tw-p-4">
      <!-- # Month Selection -->
      <Select
         v-model="selectedMonth"
         :options="monthOptions"
         placeholder="Select Month" />

      <div class="tw-my-5">
         <!-- # KPI Section -->
         <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-around md:tw-flex-row">
            <div
               class="tw-flex tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/appointment.svg" alt="" />
               <span class="tw-text-lg">Appointments</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#fb8cb1]">
                  {{ totalAppointments }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/decrease.svg" alt="" />
               <span class="tw-text-lg">Death Rate</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#c19dde]">
                  {{ deathRate }}%
               </span>
            </div>
            <div
               class="tw-flex tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/registered.svg" alt="" />
               <span class="tw-text-lg">Registered Patients</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#2bcbb5]">
                  {{ registeredPatients }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/emergency.svg" alt="" />
               <span class="tw-text-lg">Emergency</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#f24822]">
                  {{ emergencyPatients }}
               </span>
            </div>
         </div>

         <div class="tw-flex tw-items-center tw-justify-between">
            <!--# Gender Wise Patients pie-chart -->
            <div class="tw-h-[500px] tw-w-[500px]">
               <v-chart :option="genderByMarriedStatusChartOptions"></v-chart>
            </div>
            <!-- # Encounter Class Bar Chart -->
            <div class="tw-h-[500px] tw-w-[800px]">
               <v-chart
                  :option="encounterReasonByPatientsChartOptions"></v-chart>
            </div>
         </div>

         <!-- # Claim Cost Bar Chart -->
         <div class="tw-h-[700px] tw-w-[1000px]">
            <v-chart :option="claimCostByDiseaseChartOptions"></v-chart>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
