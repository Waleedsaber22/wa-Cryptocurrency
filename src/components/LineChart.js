import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import millify from "millify";
ChartJS.register(...registerables);

const LineChart = ({ coinDetails, timeStampArr, priceArr }) => {
  const { Title, Text } = Typography;
  return (
    <>
      <Row justify="center">
        <Col style={{ textAlign: "center", marginBlock: "30px" }}>
          <Title level={2}>{coinDetails?.name} Price Chart</Title>
          <Text strong>
            Current {coinDetails?.name} Price{" "}
            {millify(parseFloat(coinDetails?.price))}
            <hr />
            Change Precentage {coinDetails?.change}%
          </Text>
        </Col>
      </Row>
      <Line
        data={{
          labels: timeStampArr,
          datasets: [
            {
              label: `${coinDetails?.name} Price`,
              backgroundColor: "#0000008a",
              borderColor: "#7ab6e6",
              data: priceArr,
              fill: false,
            },
          ],
        }}
        // options={{
        //   scales: {
        //     y: [
        //       {
        //         ticks: {
        //           beginAtZero: true,
        //         },
        //       },
        //     ],
        //   },
        // }}
      ></Line>
    </>
  );
};

export default LineChart;
