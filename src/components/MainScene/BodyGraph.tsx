import ShapeDrawer from "../ShapeDrawer/ShapeDrawer";

export const BodyGraph = (props) => {
  // console.log(props.data.Centers.Center);

  const centers = props.data.Centers.Center;
  console.log(centers.Throat);
  return (
    <>
      <div>
        <ShapeDrawer />
      </div>

      <div className="flex flex-col">
        <div className="div">Head : {centers.Head}</div>
        <div className="div">Ajna : {centers.Ajna} </div>

        <div className="div">Throat : {centers.Throat}</div>

        <div className="div">G : {centers.G}</div>

        <div className="div">Ego : {centers.Ego}</div>

        <div className="div">
          Spleen : {centers.Spleen} Sacral : {centers.Sacral} Emo :{" "}
          {centers.Emo}{" "}
        </div>

        <div className="div">Root : {centers.Root}</div>
      </div>

      {/* <div className="div">{JSON.stringify(props.data)}</div> */}
    </>
  );
};
