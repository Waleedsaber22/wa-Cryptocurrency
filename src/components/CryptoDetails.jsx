import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Row, Col, Select } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import millify from "millify";
import LineChart from "./LineChart";
import {
  DollarCircleOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  CheckOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import { nanoid } from "@reduxjs/toolkit";

const CryptoDetails = () => {
  const { coinid } = useParams();
  const { data, isFetching } = useGetCryptosQuery({
    path: `coin/${coinid}`,
  });
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data: coinHistory, isFetching: isHistoryFetching } =
    useGetCryptosQuery({
      path: `coin/${coinid}/history`,
      timePeriod,
    });
  const coinDetails = data?.data?.coin;
  const { Option } = Select;
  const { Title, Text } = Typography;
  if (isFetching || isHistoryFetching) return <Loader />;
  const objectHistory = coinHistory?.data?.history;
  const timeStampArr = [];
  const priceArr = [];
  for (const key in objectHistory) {
    const dateFormat =
      timePeriod === "3h" || timePeriod === "24h" || timePeriod === "7d"
        ? new Date(objectHistory?.[key]?.timestamp * 1000).toLocaleString(
            "en",
            {
              year: "2-digit",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              hour12: true,
              second: timePeriod === "3h" ? "numeric" : undefined,
              minute: "numeric",
            }
          )
        : new Date(objectHistory?.[key]?.timestamp * 1000).toLocaleDateString();
    timeStampArr.unshift(dateFormat);
    priceArr.unshift(objectHistory?.[key]?.price);
  }
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        coinDetails?.["24hVolume"] && millify(coinDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high (daily avg)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coinDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        coinDetails?.supply?.total && millify(coinDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinDetails?.supply?.circulating &&
        millify(coinDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin--details--container">
      <Col className="coin--header">
        <Title
          className="coin--header--name"
          level={1}
        >{`${coinDetails.name} (${coinDetails.symbol}) Price`}</Title>
        <p className="coin--header--subject">
          {coinDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        className="timeperiod--list"
        defaultValue="7d"
        value={timePeriod}
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((time) => (
          <Option key={time}>{time}</Option>
        ))}
      </Select>
      <Row justify="center">
        <Col span={24}>
          <LineChart
            coinDetails={coinDetails}
            timeStampArr={timeStampArr}
            priceArr={priceArr}
          />
        </Col>
      </Row>
      <Row className="statistics--container" justify="space-between">
        <Col className="coin--statistics--details--container" xs={24} lg={11}>
          <Col className="coin--statistics--header">
            <Title level={2}>{coinDetails?.name} Value Statistics</Title>
            <p>An overview showing the stats of Bitcoin</p>
          </Col>
          <Col className="coin--statistics--details">
            {stats.map(({ icon, value, title }) => (
              <Row
                className="coin--statisics"
                justify="space-between"
                key={nanoid()}
              >
                <Col>
                  <Text>{icon}</Text>
                  <Text> {title}</Text>
                </Col>
                <Title level={5}>{value}</Title>
              </Row>
            ))}
          </Col>
        </Col>
        <Col
          className="generic--statistics--details--container"
          xs={24}
          lg={11}
        >
          <Col className="generic--statistics--header">
            <Title level={2}>Generic Statistics</Title>
            <p>An overview showing the stats of All Generic Coins</p>
          </Col>
          <Col className="generic--statistics--details">
            {genericStats.map(({ icon, value, title }) => (
              <Row
                className="coin--statisics"
                justify="space-between"
                key={nanoid()}
              >
                <Col>
                  <Text>{icon}</Text>
                  <Text> {title}</Text>
                </Col>
                <Title level={5}>{value}</Title>
              </Row>
            ))}
          </Col>
        </Col>
      </Row>
      <Row className="coin--description--container" justify="space-between">
        <Col xs={24} lg={11} className="coin--description--wrapper">
          <Title level={3}>
            What is{" "}
            <span style={{ color: "green", fontSize: "30px" }}>
              {coinDetails?.name}
            </span>{" "}
            ?
          </Title>
          <div className="coin--description">
            {HTMLReactParser(coinDetails?.description)}
          </div>
        </Col>
        <Col xs={24} lg={11} className="coin--description--links">
          <Title level={2}>{coinDetails.name} Links</Title>
          {coinDetails?.links?.map(({ name, type, url }) => (
            <Row
              key={nanoid()}
              justify="space-between"
              wrap={false}
              className="coins--description--link"
            >
              <Col>{type}</Col>
              <a href={url} target="_blank" rel="noreferrer">
                {name}
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </Col>
  );
};

export default CryptoDetails;
