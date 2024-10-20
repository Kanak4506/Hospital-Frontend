<script setup>
import axios from "axios";
import Select from "primevue/select";

import { onMounted, ref, watch } from "vue";
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
 * # Encounter Reason By Patients Start
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
   const claimCostXValues = ref([]);
   const encounterWisePatients = ref([]);

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
 * # Encounter Reason By Patients End
 */

//  **********************************************************
/**
 * TOdo Working on it
 */
/**
 * # Patients By Race Start
 */
const patientsByRaceData = ref(null);
const patientsByRaceChartOptions = ref();

async function getPatientsByRaceData() {
   try {
      const result = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/patients-by-race`,
      );
      patientsByRaceData.value = result.data;
      console.log(patientsByRaceData.value);
      await renderPatientsByRaceChart();
   } catch (error) {
      console.log(error);
   }
}

async function renderPatientsByRaceChart() {
   const patientsByRaceGraphData = ref([]);
   const whiteRacePatientsData = ref([]);
   const XValuePatientsData = ref([]);
   const blackRacePatientsData = ref([]);

   patientsByRaceData.value.forEach((element) => {
      if (element.patientRace === "white") {
         whiteRacePatientsData.value.push(element.totalPatients);
      } else if (element.patientRace === "native") {
         whiteRacePatientsData.value.push(element.totalPatients);
      } else if (element.patientRace === "asian") {
         whiteRacePatientsData.value.push(element.totalPatients);
      } else if (element.patientRace === "black") {
         blackRacePatientsData.value.push(element.totalPatients);
      } else if (element.patientRace === "hawaiian") {
         whiteRacePatientsData.value.push(element.totalPatients);
      } else {
         whiteRacePatientsData.value.push(element.totalPatients);
      }
   });
   console.log(whiteRacePatientsData._rawValue);

   patientsByRaceChartOptions.value = {
      title: {
         text: "Stacked Line",
      },
      legend: {
         data: ["White", "Black", "Video Ads", "Direct", "Search Engine"],
      },
      grid: {
         left: "3%",
         right: "4%",
         bottom: "3%",
         containLabel: true,
      },

      xAxis: {
         type: "category",
         boundaryGap: false,
         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
         type: "value",
      },
      series: [
         {
            name: "White",
            type: "line",
            stack: "Total",
            data: whiteRacePatientsData,
         },
         {
            name: "Black",
            type: "line",
            stack: "Total",
            data: blackRacePatientsData,
         },
         {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
         },
         {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
         },
         {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
         },
      ],
   };
}

/**
 * # Patients By Race End
 */
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
   await getPatientsByRaceData();
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
            class="tw-flex tw-gap-3 tw-flex-col tw-items-center tw-justify-around md:tw-flex-row">
            <div
               class="tw-flex tw-w-full md:tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/appointment.svg" alt="" />
               <span class="tw-text-lg">Appointments</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#fb8cb1]">
                  {{ totalAppointments }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-full md:tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/decrease.svg" alt="" />
               <span class="tw-text-lg">Death Rate</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#c19dde]">
                  {{ deathRate }}%
               </span>
            </div>
            <div
               class="tw-flex tw-w-full md:tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/registered.svg" alt="" />
               <span class="tw-text-lg">Registered Patients</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#2bcbb5]">
                  {{ registeredPatients }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-full md:tw-w-1/5 tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold">
               <img src="/assets/icons/emergency.svg" alt="" />
               <span class="tw-text-lg">Emergency</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#f24822]">
                  {{ emergencyPatients }}
               </span>
            </div>
         </div>

         <div
            class="tw-my-5 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center xl:tw-justify-between">
            <!--# Gender Wise Patients pie-chart -->
            <div>
               <div class="tw-text-xl tw-font-bold xl:tw-text-2xl">
                  Gender By Maritial Status Wise Patients
               </div>
               <div class="tw-h-[400px] lg:tw-h-[500px] lg:tw-w-[500px]">
                  <v-chart
                     :option="genderByMarriedStatusChartOptions"></v-chart>
               </div>
            </div>

            <!-- # Encounter Class Bar Chart -->
            <div>
               <span class="tw-text-xl tw-font-bold xl:tw-text-2xl">
                  Encounter Reason Of Patients
               </span>
               <div class="tw-h-[400px] lg:tw-h-[500px] lg:tw-w-[800px]">
                  <v-chart
                     :option="encounterReasonByPatientsChartOptions"></v-chart>
               </div>
            </div>
         </div>
         <!-- # Claim Cost Bar Chart -->
         <div>
            <span class="tw-text-xl tw-font-bold xl:tw-text-2xl">
               Total Claim Cost
            </span>

            <div class="tw-h-[400px] lg:tw-h-[700px] lg:tw-w-[1000px]">
               <v-chart :option="claimCostByDiseaseChartOptions"></v-chart>
            </div>
         </div>
         <!-- ! Working on it -->
         <!-- # Patients By Race Bar Chart
         <div class="tw-h-[700px] tw-w-[1000px]">
            <v-chart :option="patientsByRaceChartOptions"></v-chart>
         </div> -->
      </div>
   </div>
</template>

<style scoped></style>
