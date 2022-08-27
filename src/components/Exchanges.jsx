import React from "react";
import { Typography, Row, Col, Avatar } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import millify from "millify";
import { nanoid } from "@reduxjs/toolkit";
import { useMediaQuery } from "@mui/material";
const Exchanges = () => {
  const { data, isFetching } = useGetCryptosQuery({
    path: "coin/Qwsogvtv82FCd/exchanges",
    limit: 50,
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  // const fetchCoinDetails = async (coinid, divElement) => {
  //   const URL = `https://coinranking1.p.rapidapi.com/coin/${
  //     coinid || "Qwsogvtv82FCd"
  //   }`;
  //   try {
  //     divElement.innerHTML = "loading...";
  //     if (window.getComputedStyle(divElement.parentElement).height !== "0px") {
  //       divElement.parentElement.style.height = "0px";
  //       divElement.parentElement.style.padding = "0px";
  //     } else {
  //       divElement.parentElement.style.height = `${divElement.offsetHeight}px`;
  //       divElement.parentElement.style.padding = "10px";
  //     }
  //     const res = await axios.request(URL, {
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "87e344fd17mshdd40da9033fd90ep1e2367jsn6c240e713694",
  //         "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  //       },
  //     });
  //     return { data: res.data, coinid };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  /* ###################### after rendering page ########################## */
  if (isFetching) return <Loader />;
  // const fetchData = async (coinid, divElement, coinId) => {
  //   await fetchCoinDetails(coinid, divElement).then(({ data, coinid }) => {
  //     divElement.innerHTML = data?.data?.coin?.description;
  //   });
  // };
  const font =
    "cursive,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
  const bodyHandler = async (e, order, coinid) => {
    const bodyElement = document.getElementById(`exchange--body--${order + 1}`);
    const pragraphElement = document.getElementById(
      `exchange--pragraph--${order + 1}`
    );
    if (window.getComputedStyle(bodyElement).height !== "0px") {
      bodyElement.style.height = "0px";
      bodyElement.style.padding = "0px";
    } else {
      // if (pragraphElement.innerText.length < 20) {
      //   await fetchData("Qwsogvtv82FCd", pragraphElement, coinid);
      //   bodyElement.style.height = "0px";
      //   bodyElement.style.padding = "0px";
      // }
      bodyElement.style.height = `${pragraphElement.offsetHeight}px`;
      bodyElement.style.padding = "10px";
    }
  };
  const { Title, Text } = Typography;
  const coinsExchanges = data?.data?.exchanges;
  return (
    <Col className="exchanges--container">
      <Row
        className="exchanges--header"
        justify="space-between"
        align="center"
        style={{ fontFamily: "roboto mono,monospace" }}
      >
        <Col span={9}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Exhanges
          </Title>
        </Col>
        <Col span={7}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            24h Trade Volume
          </Title>
        </Col>
        <Col span={5}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Markets
          </Title>
        </Col>
        <Col span={3}>
          <Title
            level={5}
            style={{ fontSize: `${isMobile ? "13.5" : "16"}px` }}
          >
            Ranking
          </Title>
        </Col>
      </Row>
      {coinsExchanges?.map((exchanges, order) => (
        <Col key={nanoid()} className="exchange--container">
          <Row
            justify="space-between"
            align="center"
            className="exchange--header"
            onClick={(e) => bodyHandler(e, order, exchanges.uuid)}
            style={{ fontSize: `${isMobile ? "12px" : "inherit"}` }}
          >
            <Col span={9}>
              <Text strong> {order + 1}. </Text>{" "}
              <Avatar src={exchanges?.iconUrl} size="small"></Avatar>{" "}
              <Text strong>{exchanges?.name}</Text>
            </Col>
            <Col span={7} style={{ fontFamily: font }}>
              {millify(parseFloat(exchanges?.["24hVolume"]))}
            </Col>
            <Col span={5} style={{ fontFamily: font }}>
              {exchanges?.numberOfMarkets}
            </Col>
            <Col span={3} style={{ fontFamily: font }}>
              {exchanges?.rank}
            </Col>
          </Row>
          <Col className="exchange--body" id={`exchange--body--${order + 1}`}>
            <div id={`exchange--pragraph--${order + 1}`}>
              this is {exchanges.name} exchange there's now information provided
              right now
            </div>
          </Col>
        </Col>
      ))}
    </Col>
  );
};

export default Exchanges;
