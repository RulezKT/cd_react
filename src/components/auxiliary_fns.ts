import * as d3 from "d3";

interface D3lineData {
  x: number;
  y: number;
}

export const lineFunction = d3
  .line<D3lineData>()
  .x((d) => d.x)
  .y((d) => d.y);

export const appendText = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: number,
  y: number,
  text: string,
  color: string = "black",
  text_anchor: string = "start",
  size: number = 14
) => {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text)
    .attr("font-family", "futura, sans-serif")
    .attr("font-size", size || 14)
    .attr("font-weight", 700)
    .attr("fill", color || "black")
    .attr("text-anchor", text_anchor || "start");
};

//Здесь используется техника разделения текста тире для определения разного цвета для разных данных
export const appendTextPlanets = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  x: number,
  y: number,
  text: string,
  color: string,
  text_anchor: string
) => {
  svg
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text.split("-")[0])
    .attr("font-family", "futura, sans-serif")
    .attr("font-size", 14)
    .attr("font-weight", 700)
    .attr("fill", color || "black")
    .attr("text-anchor", text_anchor || "start")

    .append("tspan")
    .style("fill", "blue")
    .text(text.split("-")[1])
    .attr("font-size", 12)

    .append("tspan")
    .style("fill", "green")
    .text(text.split("-")[2])
    .attr("font-size", 10)
    .append("tspan")


    .append("tspan")
    // .attr("fill", color || "black")
    .style("fill", color || "black")
    .text(text.split("-")[3])
    .attr("font-size", 24)


    .append("tspan")
    // .attr("fill", color || "black")
    .style("fill", color || "black")
    .text(text.split("-")[4])
    .attr("font-size", 14)

    .append("tspan")
    // .attr("fill", color || "black")
    .style("fill", color || "black")
    .text(text.split("-")[5])
    .attr("font-size", 16);


};
