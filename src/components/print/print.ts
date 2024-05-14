import type { CDinfo } from "../cd_consts";

export function printCD(cdInfo: CDinfo): void {
  const persPlanets = cdInfo.hd.personality.planetsData;
  const designPlanets = cdInfo.hd.design.planetsData;

  const si = cdInfo.hd.specialInfo;
  const gi = cdInfo.hd.generalInfo;

  // console.clear();
  console.log(`Type: ${gi.type}`);
  console.log(`Profile: ${si.profile}`);
  console.log(`Authority: ${gi.authority}`);
  console.log(`Definition: ${gi.definition}`);

  console.log("===================");
  console.log(`PHS and Nutrition:`);
  console.log(`Theme: ${si.theme}`);
  console.log(`${si.nutr_type}`);
  console.log(`${si.cognition}`);
  console.log("===================");

  console.log(`Psychology:`);
  console.log(`Motivation: ${si.motivation}`);
  console.log(`Mind: ${si.mind}`);
  console.log("===================");
  console.log(`Variable: ${si.variable}`);
  console.log(
    `Cross: ${si.cross.first}/${si.cross.second}|${si.cross.third}/${si.cross.fourth}`
  );

  const planetNumOrder = [10, 3, 12, 13, 11, 1, 2, 4, 5, 6, 7, 8, 9];

  for (const i of planetNumOrder) {
    // for (let i = 1; i < persPlanets.length; i++) {
    console.log(
      ` ${designPlanets[i].name.slice(0, 3)}: ${
        designPlanets[i].hex
      }.${Math.ceil(designPlanets[i].line)}.${Math.ceil(
        designPlanets[i].color
      )}.${Math.ceil(designPlanets[i].tone)}.${Math.ceil(
        designPlanets[i].base
      )} ${designPlanets[i].direction}${
        designPlanets[i].power
      }  ||     ${persPlanets[i].name.slice(0, 3)}: ${
        persPlanets[i].hex
      }.${Math.ceil(persPlanets[i].line)}.${Math.ceil(
        persPlanets[i].color
      )}.${Math.ceil(persPlanets[i].tone)}.${Math.ceil(persPlanets[i].base)} ${
        persPlanets[i].direction
      }${persPlanets[i].power}  `
    );
  }
}
