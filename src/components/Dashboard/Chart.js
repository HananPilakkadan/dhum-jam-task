import React from "react";
import { useSelector } from "react-redux";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";

const Chart = ({ values }) => {
  const { userDetails } = useSelector((state) => state.dashboard);

  const data = [
    {
      x: 1,
      y:
        values.custom.length > 1
          ? values.custom
          : userDetails?.amount?.category_6,
    },
    {
      x: 2,
      y:
        values.category_6.length > 1
          ? values.category_6
          : userDetails?.amount?.category_6,
    },
    {
      x: 3,
      y:
        values.category_9.length > 1
          ? values.category_8
          : userDetails?.amount?.category_8,
    },
    {
      x: 4,
      y:
        values.category_9.length > 1
          ? values.category_9
          : userDetails?.amount?.category_9,
    },
    {
      x: 5,
      y:
        values.category_10.length > 1
          ? values.category_10
          : userDetails?.amount?.category_10,
    },
  ];

  return (
    <div>
      <VictoryChart domainPadding={{ x: 15, y: 50 }} maxDomain={{ x: 6 }}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={[
            "Custom",
            "Category 1",
            "Category 2",
            "Category 3",
            "Category 4",
          ]}
          style={{
            tickLabels: { fontSize: 12, fill: "#fff" },
            axis: { stroke: "#fff" },
          }}
        />
        <VictoryBar
          barWidth={({ index }) => index * 2 + 20}
          barRatio={0.8}
          style={{ data: { fill: "#F0C3F1" } }}
          alignment="start"
          data={data}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3, 4, 5]}
          style={{
            axis: { stroke: "#fff" },
            tickLabels: { fill: "#fff", fontSize: 12 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Chart;
