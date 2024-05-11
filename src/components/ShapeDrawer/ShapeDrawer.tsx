import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const ShapeDrawer = () => {
  const [shapeType, setShapeType] = useState("circle");
  const [shapeSize, setShapeSize] = useState(50);
  const svgRef = useRef(null);

  useEffect(() => {
    const drawShape = () => {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

      if (shapeType === "circle") {
        svg
          .append("circle")
          .attr("cx", 100)
          .attr("cy", 100)
          .attr("r", shapeSize)
          .attr("fill", "blue");
      } else if (shapeType === "rectangle") {
        svg
          .append("rect")
          .attr("x", 50)
          .attr("y", 50)
          .attr("width", shapeSize)
          .attr("height", shapeSize)
          .attr("fill", "red");
      }
      // Add more shapes as needed
    };
    drawShape();
  }, [shapeType, shapeSize]);

  const width = 300;
  const height = 700;

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShapeType(e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShapeSize(+e.target.value); // Convert to number
  };

  return (
    <div>
      <select value={shapeType} onChange={handleShapeChange}>
        <option value="circle">Circle</option>
        <option value="rectangle">Rectangle</option>
        {/* Add more shape options if needed */}
      </select>
      <input type="number" value={shapeSize} onChange={handleSizeChange} />
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default ShapeDrawer;
