import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";

import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { CalcTypeRadio } from "./components/CalcTypeRadio";
import { UseCalcType, useCalcType } from "./components/calcType";

function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();

  const loc = cdInfo.cdInfo.time.pers_time_utc;
  const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;

  const des = cdInfo.cdInfo.time.des_time;
  const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;

  const dataString: string = `${cdInfo.cdInfo.name} - Pers.Time: "${loc_time}" Des.Time:  "${des_time}"`;

  return (
    <div className="flex flex-col container mx-auto border-solid border-2 border-slate-950 w-full justify-center items-center  p-1  gap-1 m-1 space-x-4 space-y-0">
      <div className="w-full space-y-0">
        <div className="flex flex-row justify-center items-center space-x-2 space-y-2">
          <ReqDataForm />
        </div>
        <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-0">
          <TypeOfChartRadio />
        </div>
        <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-2 h-6">
          <p className="flex  justify-center items-center text-blue-600 text-base font-extralight space-x-2 space-y-0 m-0">
            {dataString}
          </p>
          <div className="flex flex-row justify-center items-center space-y-0 m-0">
            <CalcTypeRadio />
          </div>
        </div>
        <div className="flex  w-full justify-center items-center  space-y-0 m-0">
          <BodyGraph
            data={cdInfo.cdInfo}
            chart={typeOfChart.typeOfChart}
            calc={calcType.calcType}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
