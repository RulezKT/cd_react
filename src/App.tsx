import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";

function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();

  const loc = cdInfo.cdInfo.time.pers_time_utc;
  const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;

  const des = cdInfo.cdInfo.time.des_time;
  const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;

  const dataString: string = `${cdInfo.cdInfo.name} - Pers.Time: "${loc_time}" Des.Time:  "${des_time}"`;

  return (
    <div className="flex flex-col container mx-auto border-solid border-2 border-slate-950 w-full justify-center items-center  p-2   gap-5 m-2 space-x-4">
      <div className="w-full">
        <ReqDataForm />

        <TypeOfChartRadio />
        <p className="flex flex-col w-full justify-center items-center h-auto text-blue-600 text-base font-extralight">
          {dataString}
        </p>
        <div className="flex flex-col w-full justify-center items-center h-auto">
          <BodyGraph data={cdInfo.cdInfo} radiobutt={typeOfChart.typeOfChart} />
        </div>
      </div>
    </div>
  );
}

export default App;
