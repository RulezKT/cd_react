export const PersNumbers = (props) => {
  // console.log(props.data);

  const persPlanets = props.data;
  const planetNumOrder = [10, 3, 12, 13, 11, 1, 2, 4, 5, 6, 7, 8, 9];

  const planetsToDisplay: string[] = [];

  for (const i of planetNumOrder) {
    // for (let i = 1; i < persPlanets.length; i++) {
    const planet_string = `${persPlanets[i].name.slice(0, 3)}: ${
      persPlanets[i].hex
    }.${Math.ceil(persPlanets[i].line)}.${Math.ceil(
      persPlanets[i].color
    )}.${Math.ceil(persPlanets[i].tone)}.${Math.ceil(persPlanets[i].base)} ${
      persPlanets[i].direction
    }${persPlanets[i].power}  `;
    planetsToDisplay.push(planet_string);
  }

  return (
    <div>
      <h1>{props.calc_type}</h1>

      <ul className="flex flex-col">
        {planetsToDisplay.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
