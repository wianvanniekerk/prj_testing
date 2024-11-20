import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const PieChartSection = ({ expedition }) => {
  if (!expedition || !expedition.gasStats) {
    return;
  }

  const { gasStats } = expedition;
  const pieData = [
    { id: 0, value: gasStats?.carbonMonoxide|| 0, label: "Carbon Monoxide", color: "#FFB3B3" },
    { id: 1, value: gasStats?.methane || 0, label: "Methane", color: "#FF6666" },
    { id: 2, value: gasStats?.butane || 0, label: "Butane", color: "#CC0000" },
    { id: 2, value: gasStats?.liquefiedPetroleumGas || 0, label: "Liquiefied Petroleum Gas", color: "#A60000" },
  ];

  return (
    <section className="piChart">
      <PieChart
        series={[{ data: pieData }]}
        width={600}
        height={150}
      />
    </section>
  );
};

export default PieChartSection;
