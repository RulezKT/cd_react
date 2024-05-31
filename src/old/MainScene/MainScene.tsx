import { BodyGraph } from "../BodyGraph";
import { DesNumbers } from "./DesNumbers";
import { PersNumbers } from "./PersNumbers";
// import type { CD } from "../../types/cd_types_ts/cd_types";

export const MainScene = (props) => {
  // console.log(props);

  return (
    <div className="flex flex-row justify-center">
      {/* <DesNumbers calc_type="Design" data={props.data.hd.design.planetsData} /> */}
      <BodyGraph data={props.data} radiobutt={props.radiobutt} />
      {/* <PersNumbers
        calc_type="Personality"
        data={props.data.hd.personality.planetsData}
      /> */}
    </div>
  );
};
