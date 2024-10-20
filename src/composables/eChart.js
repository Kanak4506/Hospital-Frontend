import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   GridComponent,
} from "echarts/components";

export function setUpEcharts() {
   use([
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      PieChart,
      GridComponent,
      LineChart,
      BarChart,
      CanvasRenderer,
   ]);
}
