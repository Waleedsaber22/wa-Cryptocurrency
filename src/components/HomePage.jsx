import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";
const { Title } = Typography;
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery({
    path: "coins",
    limit: 100,
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={isMobile ? 4 : 1} className="home--header">
        Global Crypto Stats
      </Title>
      <Row style={{ marginBottom: "15px", marginLeft: "10px" }}>
        <Col span={12} className="home--col--1">
          {" "}
          <Statistic
            title="Total CryptoCurrencies"
            className="statistics--name"
            value={
              isMobile
                ? millify(parseFloat(globalStats?.total) || 0)
                : globalStats?.total
            }
          />{" "}
        </Col>
        <Col span={12} className="home--col--2">
          {" "}
          <Statistic
            title="Total Exchanges"
            className="statistics--name"
            value={
              isMobile
                ? millify(parseFloat(globalStats?.totalExchanges) || 0)
                : globalStats?.totalExchanges
            }
          />{" "}
        </Col>
        <Col span={12} className="home--col--3">
          {" "}
          <Statistic
            title="Total Market Cap"
            className="statistics--name"
            value={
              isMobile
                ? millify(parseFloat(globalStats?.totalMarketCap) || 0)
                : globalStats?.totalMarketCap
            }
          />{" "}
        </Col>
        <Col span={12} className="home--cols--4">
          {" "}
          <Statistic
            title="Total 24h Volume"
            className="statistics--name"
            value={
              isMobile
                ? millify(parseFloat(globalStats?.totalMarketCap) || 0)
                : globalStats?.totalMarketCap
            }
          />{" "}
        </Col>
        <Col span={12} className="home--cols">
          {" "}
          <Statistic
            title="Total Markets"
            className="statistics--name"
            value={
              isMobile
                ? millify(parseFloat(globalStats?.totalMarkets) || 0)
                : globalStats?.totalMarkets
            }
          />{" "}
        </Col>
      </Row>
      <div className="showmore--container">
        <div className="showmore--currencies">
          <Title
            level={isMobile ? 5 : 2}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Top 10 Cryptocurrencies
          </Title>
          <Title
            level={isMobile ? 5 : 3}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <Link to="/cryptocurrencies">Show More</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
        <div className="showmore--news">
          <Title
            level={isMobile ? 5 : 2}
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            Read The Most popular News
          </Title>{" "}
          <Title
            level={isMobile ? 5 : 3}
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            <Link to="/news">Show More</Link>
          </Title>{" "}
        </div>
        <News simplified />
      </div>
    </>
  );
};

export default HomePage;
