import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { UseTypeOfChart, useTypeOfChart } from "./typeOfChart";

export const TypeOfChartRadio = () => {
  const typeOfChart: UseTypeOfChart = useTypeOfChart();
  return (
    <div className="flex flex-col w-full justify-center items-center h-auto">
      <RadioGroup
        className="flex flex-row gap-5 m-10"
        onValueChange={(value) => {
          typeOfChart.set(value);
        }}
        defaultValue={typeOfChart.typeOfChart}
        value={typeOfChart.typeOfChart}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bodygraph" id="option-one" />
          <Label htmlFor="option-one">Body</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="design" id="option-two" />
          <Label htmlFor="option-two">Design</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="personality" id="option-three" />
          <Label htmlFor="option-three">Personality</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bodytransits" id="option-five" disabled />
          <Label htmlFor="option-five">Body+Transits</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mandala" id="option-six" disabled />
          <Label htmlFor="option-six">Mandala</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="composite" id="option-seven" disabled />
          <Label htmlFor="option-seven">Composite</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="numerology" id="option-eight" />
          <Label htmlFor="option-eight">Numerology</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fd" id="option-nine" />
          <Label htmlFor="option-nine">FD</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
