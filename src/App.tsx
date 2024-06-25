import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";

import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { CalcTypeRadio } from "./components/CalcTypeRadio";
import { UseCalcType, useCalcType } from "./components/calcType";
import { FullTechInfo } from "./components/FullTechInfo";




function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();

  const loc = cdInfo.cdInfo.time.pers_time_utc;
  const loc_time = `${loc.day}.${loc.month}.${loc.year} ${loc.hours}:${loc.minutes}`;
  const des = cdInfo.cdInfo.time.des_time;
  const des_time = `${des.day}.${des.month}.${des.year} ${des.hours}:${des.minutes}`;
  const timeString: string = `${cdInfo.cdInfo.name.slice(0, 10)} - Time:${loc_time} Design:${des_time} `;
  let cross_text = `${cdInfo.cdInfo.hd.specialInfo.cross.first}/${cdInfo.cdInfo.hd.specialInfo.cross.second}|${cdInfo.cdInfo.hd.specialInfo.cross.third}/${cdInfo.cdInfo.hd.specialInfo.cross.fourth}`;
  const varCross: string = ` ${cdInfo.cdInfo.hd.specialInfo.variable} ` + cross_text;


  return (
    <div className="flex flex-col container mx-auto  w-full justify-center items-center  sm:bg-red-300 md:bg-gray-500">

      <div className="w-full space-y-0">
        <div className="flex flex-row justify-center items-center space-x-2 space-y-2">
          <ReqDataForm />
        </div>
        <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-0">
          <TypeOfChartRadio />
        </div>
        <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-2 h-6">

          <div className="flex flex-row justify-center items-center space-y-0 m-0">
            <CalcTypeRadio />
          </div>
        </div>
        <p className="flex  justify-center items-center text-black text-base font-extralight space-x-2 space-y-0 m-0">
          {timeString}
        </p>
        <p className="flex  justify-center items-center text-black text-base font-extralight space-x-2 space-y-0 m-0">
          {varCross}
        </p>
        <div className="flex  w-full justify-center items-center">
          <div className="flex  flex-col md:flex-row">
            <BodyGraph
              data={cdInfo.cdInfo}
              chart={typeOfChart.typeOfChart}
              calc={calcType.calcType}
            />

            <div className="TechInfo w-full">
              <FullTechInfo data={cdInfo.cdInfo} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
