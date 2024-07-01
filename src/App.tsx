import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";

import { BodyGraph } from "./components/BodyGraph";
import { TypeOfChartRadio } from "./components/TypeOfChartRadio";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { CalcTypeRadio } from "./components/CalcTypeRadio";
import { UseCalcType, useCalcType } from "./components/calcType";
import { FullTechInfo } from "./components/FullTechInfo";
import { ShortInfo } from "./components/ShortInfo";
import { PlanetsInfo } from "./components/PlanetsInfo";




function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  const calcType: UseCalcType = useCalcType();


  return (


    <div className="flex w-full flex-col space-y-0 mt-1 px-1 ">
      <div className="flex flex-row  space-x-2 space-y-2  justify-start items-start md:justify-between md:items-center md:w-full">
        <ReqDataForm />
      </div>
      {/* <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-0">
        <TypeOfChartRadio />
      </div> */}
      <div className="flex flex-row justify-center items-center space-x-2 space-y-0 m-2 h-6">

        <div className="flex flex-row justify-center items-center space-y-0 m-0">
          <CalcTypeRadio />
        </div>
      </div>

      {/* <div className="flex  justify-center items-center text-black text-base font-extralight space-x-2 space-y-0 m-0">
        <ShortInfo data={cdInfo.cdInfo}
          chart={typeOfChart.typeOfChart}
          calc={calcType.calcType} />
      </div> */}
      <div className="flex  w-full flex-row justify-start items-start space-x-0 space-y-0">
        <div className="w-full flex  flex-col md:flex-row  ">
          <div className="order-1 md:order-1 lg:order-2">
            <BodyGraph
              data={cdInfo.cdInfo}
              chart={typeOfChart.typeOfChart}
              calc={calcType.calcType}
            />
          </div>

          <div className="TechInfo w-80 order-2 md:order-2 lg:order-1">
            <FullTechInfo data={cdInfo.cdInfo} calc={calcType.calcType} />

          </div>

          <div className="TechInfo w-80  order-3 md:order-3 lg:order-3">
            <PlanetsInfo data={cdInfo.cdInfo} />

          </div>
          <div className="TechInfo w-80 invisible order-4 2xl:visible lg:order-4">
            <FullTechInfo data={cdInfo.cdInfo} calc={calcType.calcType} />

          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
