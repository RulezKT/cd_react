import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { UseCalcType, useCalcType } from "./calcType";

export const CalcTypeRadio = () => {
  const calcType: UseCalcType = useCalcType();
  return (
    <div className="flex flex-col w-full justify-center items-center h-auto">
      <RadioGroup
        className="flex flex-row gap-5 m-10"
        onValueChange={(value) => {
          calcType.set(value);
        }}
        defaultValue={calcType.calcType}
        value={calcType.calcType}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="full" id="option-one" />
          <Label htmlFor="option-one">Full</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="personality" id="option-two" />
          <Label htmlFor="option-three">Personality</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="design" id="option-three" />
          <Label htmlFor="option-two">Design</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
