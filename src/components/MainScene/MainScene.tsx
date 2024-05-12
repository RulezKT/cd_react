import { BodyGraph } from "./BodyGraph";
import { PersDesNumbers } from "./PersDesNumbers";
// import type { CD } from "../../types/cd_types_ts/cd_types";

export const MainScene = (props) => {
  let data = {};
  if (props.data == null) {
    data.Design = "";
    data.Personality = "";
  } else {
    data = props.data;
  }

  return (
    <div className="flex flex-row justify-between gap-5 m-10">
      <PersDesNumbers calc_type="Design" data={data.Design} />
      <BodyGraph data={props} />
      <PersDesNumbers calc_type="Personality" data={data.Personality} />
    </div>
  );
};
