"use client";

import { useParams } from "next/navigation";

const ChartPage = () => {
  const param = useParams();

  if (!param.ticker) return <div>loading</div>;

  return <div>This is the {param.ticker}</div>;
};

export default ChartPage;
