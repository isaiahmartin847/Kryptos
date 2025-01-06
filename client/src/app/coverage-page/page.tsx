"use client";
import Navbar from "@/components/landingPage/navbar";
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
    <div className="border-2 ">
      <Navbar />
      <div className="border-2 mt-8 flex flex-col">
        <h1 className="text-[40px]">Hunt Regs Coverage</h1>
        <div>
          <div className="flex space-x-2">
            <span className="h-5 w-5 bg-green-600 inline-block"></span>
            <p className="text-xl">Full Coverage</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <USAMap
          title="USA Map"
          width={960}
          height={600}
          defaultFill="#d3d3d3"
          customize={customize}
          onClick={mapHandler}
        />
      </div>
    </div>
  );
};

export default CoveragePage;
