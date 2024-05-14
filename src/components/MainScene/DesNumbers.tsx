export const DesNumbers = (props) => {
  // console.log(props.data);

  const designPlanets = props.data;
  const planetNumOrder = [10, 3, 12, 13, 11, 1, 2, 4, 5, 6, 7, 8, 9];

  const planetsToDisplay: string[] = [];

  for (const i of planetNumOrder) {
    // for (let i = 1; i < persPlanets.length; i++) {
    const planet_string = ` ${designPlanets[i].name.slice(0, 3)}: ${
      designPlanets[i].hex
    }.${Math.ceil(designPlanets[i].line)}.${Math.ceil(
      designPlanets[i].color
    )}.${Math.ceil(designPlanets[i].tone)}.${Math.ceil(
      designPlanets[i].base
    )} ${designPlanets[i].direction}${designPlanets[i].power}    `;
    planetsToDisplay.push(planet_string);
  }

  return (
    <div>
      <ul className="flex flex-col">
        {planetsToDisplay.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
