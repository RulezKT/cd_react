import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";

export const TypeOfChartRadio = () => {
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  return (
    <RadioGroup
      className="flex flex-row gap-5 m-1"
      onValueChange={(value) => {
        typeOfChart.set(value);
      }}
      defaultValue={typeOfChart.typeOfChart}
      value={typeOfChart.typeOfChart}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bodygraph" id="option-1" />
        <Label htmlFor="option-1">HD</Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="numerology" id="option-2" />
        <Label htmlFor="option-2">Numerology</Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="fd" id="option-3" />
        <Label htmlFor="option-3">FD</Label>
      </div>
    </RadioGroup>
  );
};
