DrawFormulaClass.prototype.saveIMG = function () {
  const doctype =
    '<?xml version="1.0" standalone="no"?>' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

  // serialize our SVG XML to a string.
  const source = new XMLSerializer().serializeToString(d3.select("svg").node());

  // create a file blob of our SVG.
  const blob = new Blob([doctype + source], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = window.URL.createObjectURL(blob);

  // Put the svg into an image tag so that the Canvas element can read it in.
  const img = d3
    .select("body")
    .append("img")
    .attr("width", svg.attr("width"))
    .attr("height", svg.attr("height"))
    .node();

  img.onload = function () {
    // Now that the image has loaded, put the image into a canvas element.
    const canvas = d3.select("body").append("canvas").node();
    canvas.width = svg.attr("width");
    canvas.height = svg.attr("height");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const canvasUrl = canvas.toDataURL("image/png");
    const img2 = d3
      .select("body")
      .append("img")
      .attr("width", svg.attr("width"))
      .attr("height", svg.attr("height"))
      .node();

    // this is now the base64 encoded version of our PNG! you could optionally
    // redirect the user to download the PNG by sending them to the url with

    // `window.location.href= canvasUrl`.
    img2.src = canvasUrl;

    /*
          const dlLink = document.createElement('a');
          dlLink.download = "RR";
          dlLink.href = canvasUrl;
          dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');
          document.body.appendChild(dlLink);
          dlLink.click();
          document.body.removeChild(dlLink);
  */

    // Or you might want to download the image
    // I did not use this method, so you might want to refine it a bit
    //window.location.href = canvasUrl.replace("image/png", "image/octet-stream");
  };
  // start loading the image.
  img.src = url;
  //window.location.href = url.replace("image/png", "image/octet-stream");

  /*
  
       */
};
