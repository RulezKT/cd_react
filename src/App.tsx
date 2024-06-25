import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";

import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { CalcTypeRadio } from "./components/CalcTypeRadio";
import { UseCalcType, useCalcType } from "./components/calcType";
import { FullTechInfo } from "./components/FullTechInfo";
import { ShortInfo } from "./components/ShortInfo";




function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();


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

        <div className="flex  justify-center items-center text-black text-base font-extralight space-x-2 space-y-0 m-0">
          <ShortInfo data={cdInfo.cdInfo}
            chart={typeOfChart.typeOfChart}
            calc={calcType.calcType} />
        </div>
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
