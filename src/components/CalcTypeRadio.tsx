import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

import { UseCalcType, useCalcType } from "./calcType";

export const CalcTypeRadio = () => {
  const calcType: UseCalcType = useCalcType();
  return (
    <RadioGroup
      className="flex flex-row gap-5 m-1"
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
        <Label htmlFor="option-two">Personality</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="design" id="option-three" />
        <Label htmlFor="option-three">Design</Label>
      </div>
    </RadioGroup>
  );
};
