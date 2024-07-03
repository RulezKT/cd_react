import { Radio } from "antd";

import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";

export const TypeOfChartRadio = () => {
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  return (
    <Radio.Group
      className="flex flex-row gap-0 m-1 justify-start items-start"
      onChange={(e) => {
        typeOfChart.set(e.target.value);
      }}
      value={typeOfChart.typeOfChart}
      size="small"

    >

      <Radio value="bodygraph" id="option-one">
        <label htmlFor="option-one">HD</label>
      </Radio>

      <Radio value="numerology" id="option-two">
        <label htmlFor="option-two">NM</label>
      </Radio>

      <Radio value="fd" id="option-three">
        <label htmlFor="option-three">FD</label>
      </Radio>

      <Radio value="fdNew" id="option-4">
        <label htmlFor="option-4">FDnew</label>
      </Radio>



    </Radio.Group>
  );
};
