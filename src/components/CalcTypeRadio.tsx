import { Radio } from "antd";

import { UseCalcType, useCalcType } from "./calcType";

export const CalcTypeRadio = () => {
  const calcType: UseCalcType = useCalcType();
  return (
    <Radio.Group
      className="flex flex-row gap-5 m-1"
      onChange={(e) => {
        calcType.set(e.target.value);
      }}
      value={calcType.calcType}
    >
      <div className="flex items-center space-x-2">
        <Radio value="full" id="option-one">
          <label htmlFor="option-one">Full</label>
        </Radio>
      </div>
      <div className="flex items-center space-x-2">
        <Radio value="personality" id="option-two">
          <label htmlFor="option-two">Personality</label>
        </Radio>
      </div>

      <div className="flex items-center space-x-2">
        <Radio value="design" id="option-three">
          <label htmlFor="option-three">Design</label>
        </Radio>
      </div>
    </Radio.Group>
  );
};
