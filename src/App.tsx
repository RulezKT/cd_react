import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ReqDataForm } from "./components/ReqDataForm";

import { UseCdInfo, useCdInfo } from "./components/cdInfo";
import { UseTypeOfChart, useTypeOfChart } from "./components/typeOfChart";
import { BodyGraph } from "./components/BodyGraph";

function App() {
  const cdInfo: UseCdInfo = useCdInfo();
  const typeOfChart: UseTypeOfChart = useTypeOfChart();

  return (
    <>
      <div className="flex flex-col container mx-auto border-solid border-2 border-slate-950 w-full justify-center items-center  p-2   gap-5 m-2 space-x-4">
        <div className="w-full">
          {/* <div className="flex flex-row justify-center h-96 items-center">
        <Button onClick={handleClick}>Fetch data </Button>
      </div> */}
          <ReqDataForm />

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
                <RadioGroupItem
                  value="bodytransits"
                  id="option-five"
                  disabled
                />
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

            <BodyGraph
              data={cdInfo.cdInfo}
              radiobutt={typeOfChart.typeOfChart}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
