import { Radio } from "antd";

import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";

export const TypeOfChartRadio = () => {
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  return (
    <Radio.Group
      className="flex flex-row gap-5 m-1"
      onChange={(e) => {
        typeOfChart.set(e.target.value);
      }}
      value={typeOfChart.typeOfChart}
    >
      <div className="flex items-center space-x-2 text-black">
        <Radio value="bodygraph" id="option-one">
          <label htmlFor="option-one">HD</label>
        </Radio>
      </div>
      <div className="flex items-center space-x-2  text-black">
        <Radio value="numerology" id="option-two">
          <label htmlFor="option-two">Numerology</label>
        </Radio>
      </div>

      <div className="flex items-center space-x-2  text-black">
        <Radio value="fd" id="option-three">
          <label htmlFor="option-three">FD</label>
        </Radio>
      </div>
    </Radio.Group>
  );
};
