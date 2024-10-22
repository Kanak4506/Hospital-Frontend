<script setup>
import axios from "axios";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";
import dayjs from "dayjs";

import { onMounted, ref, watch } from "vue";
import { color } from "echarts";

// date filter
const selectedDate = ref();
const startDate = ref("2011-01-02");
const endDate = ref("2022-02-05");
const minDate = ref(new Date("2011-01-02"));
const maxDate = ref(new Date("2022-02-05"));

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
         startDate: startDate.value || "2011-01-02",
         endDate: endDate.value || "2022-02-05",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/kpi`,
         params,
      );
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

async function getGenderByMarriedStatus() {
   try {
      const params = {
         startDate: startDate.value || "2011-01-02",
         endDate: endDate.value || "2022-02-05",
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
               show: true, // Show the label
               position: "inside", // Position the label outside the pie slices
               formatter: "{b}:\n{c}", // Label format (Name: Value)
               fontSize: 12, // Font size of the label
               color: "#fff", // Set the default color of the label
            },
            emphasis: {
               label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#000",
               },
            },
            labelLine: {
               show: true,
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
async function getClaimCostByDisease() {
   try {
      const params = {
         startDate: startDate.value || "2011-01-02",
         endDate: endDate.value || "2022-02-05",
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
            label: {
               show: true,
            },
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
            label: {
               show: true,
            },
            emphasis: {
               focus: "series",
            },
            data: claimCostAmountPaidValues,
         },
         {
            name: "Base Counter",
            type: "bar",
            stack: "total",
            label: {
               show: true,
            },
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
 * # Encounter Reason By Patients Date Wise Start
 */

const encounterReasonByPatients = ref(null);
const encounterReasonByPatientsChartOptions = ref();

async function getEncounterReasonData(selMonth) {
   try {
      const params = {
         startDate: startDate.value || "2011-01-02",
         endDate: endDate.value || "2022-02-05",
      };
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/encounter-reason`,
         params,
      );
      encounterReasonByPatients.value = result.data;
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
   // console.log(encounterWisePatients.value);
   encounterReasonByPatientsChartOptions.value = {
      tooltip: {},
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
            label: {
               show: true,
            }, 
         },
      ],
   };
}

/**
 * # Encounter Reason By Patients End
 */

//  **********************************************************

watch(selectedDate, async (newValue, oldValue) => {
   startDate.value = dayjs(newValue[0]).format("YYYY-MM-DD");
   endDate.value = dayjs(newValue[1]).format("YYYY-MM-DD");
   await getEncounterReasonData();
   await getGenderByMarriedStatus();
   await getClaimCostByDisease();
});

onMounted(async () => {
   await getAppointmentData();
   await getGenderByMarriedStatus();
   await getClaimCostByDisease();
   await getEncounterReasonData();
   // await getPatientsByRaceData();
});
</script>

<template>
   <div class="tw-bg-[#faf6e1] tw-p-4">
      <!-- # Date Selection -->
      <div class="tw-my-4">
         <FloatLabel>
            <label id="datepicker">Select Date</label>
            <DatePicker
               v-model="selectedDate"
               :maxDate="maxDate"
               :minDate="minDate"
               selectionMode="range"
               for="datepicker"
               :manualInput="false" />
         </FloatLabel>
      </div>
      <div class="tw-my-5">
         <!-- # KPI Section -->
         <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-around tw-gap-3 md:tw-flex-row">
            <div
               class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold md:tw-w-1/5">
               <img src="/assets/icons/appointment.svg" alt="" />
               <span class="tw-text-lg">Appointments</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#fb8cb1]">
                  {{ totalAppointments }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold md:tw-w-1/5">
               <img src="/assets/icons/decrease.svg" alt="" />
               <span class="tw-text-lg">Death Rate</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#c19dde]">
                  {{ deathRate }}%
               </span>
            </div>
            <div
               class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold md:tw-w-1/5">
               <img src="/assets/icons/registered.svg" alt="" />
               <span class="tw-text-lg">Registered Patients</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#2bcbb5]">
                  {{ registeredPatients }}
               </span>
            </div>
            <div
               class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-white tw-p-5 tw-font-semibold md:tw-w-1/5">
               <img src="/assets/icons/emergency.svg" alt="" />
               <span class="tw-text-lg">Emergency</span>
               <span class="tw-text-2xl tw-font-semibold tw-text-[#f24822]">
                  {{ emergencyPatients }}
               </span>
            </div>
         </div>

         <div
            class="tw-my-5 tw-flex tw-flex-col tw-items-center tw-justify-center md:tw-flex-row xl:tw-justify-between">
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
      </div>
   </div>
</template>

<style scoped></style>
