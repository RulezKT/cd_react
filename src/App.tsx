import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";

function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();

  return (
    <div className="flex flex-col container mx-auto border-solid border-2 border-slate-950 w-full justify-center items-center  p-2   gap-5 m-2 space-x-4">
      <div className="w-full">
        <ReqDataForm />

        <TypeOfChartRadio />

        <div className="flex flex-col w-full justify-center items-center h-auto">
          <BodyGraph data={cdInfo.cdInfo} radiobutt={typeOfChart.typeOfChart} />
        </div>
      </div>
    </div>
  );
}

export default App;
