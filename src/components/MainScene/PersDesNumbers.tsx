export const PersDesNumbers = (props) => {
  //   console.log(props.data);

  if (!props.data.Planet) {
    return <div>No Data</div>;
  }

  let planetsData = props.data.Planet.filter((item) => item.Number > 0).map(
    (item) => {
      if (item.Number > 0) {
        item =
          item.Name.slice(0, 3) +
          ":    " +
          item.Hex +
          "." +
          Math.ceil(item.Line) +
          "." +
          Math.ceil(item.Color) +
          "." +
          Math.ceil(item.Tone) +
          "." +
          Math.ceil(item.Base);
      }
      return item;
    }
  );

  //   console.log(planetsData);

  planetsData = [
    planetsData[9],
    planetsData[2],
    planetsData[11],
    planetsData[12],
    planetsData[10],
    planetsData[0],
    planetsData[1],
    planetsData[3],
    planetsData[4],
    planetsData[5],
    planetsData[6],
    planetsData[7],
    planetsData[8],
  ];

  //   console.log(planetsData);

  return (
    <div>
      <h1>{props.calc_type}</h1>

      <ul className="flex flex-col">
        {planetsData.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
