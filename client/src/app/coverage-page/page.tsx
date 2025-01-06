"use client";
import { useState } from "react";
import { MapCustomizations, USAMap } from "react-usa-map-fc";

const CoveragePage = () => {
  const [customize, setCustomize] = useState<MapCustomizations>({
    MT: { fill: "#1c911b" },
  });

  // when this is clicked make it open a dialog that has all the info about the coverage
  const mapHandler = (event: string) => {
    console.log(event);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <div>
        <h1>Hunt Regs Coverage</h1>
        <div></div>
      </div>
      <USAMap
        title="USA Map"
        width={960}
        height={600}
        defaultFill="#d3d3d3"
        customize={customize}
        onClick={mapHandler}
      />
    </div>
  );
};

export default CoveragePage;
