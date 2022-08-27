import React, { useEffect, useState } from "react";
import { Row, Col, Card, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useMediaQuery } from "@mui/material";
import millify from "millify";
import Loader from "./Loader";
import { nanoid } from "@reduxjs/toolkit";
const filterData = (data, search) => {
  if (search === "") return { check: true, indexHighlightChar: [] };
  if (typeof data === "string" && typeof search === "string") {
    data = data.toLowerCase();
    search = search.toLowerCase().trim();
    let char = 0;
    const indexChar = [];
    for (let j = 0; j < data.length; j++) {
      if (data[j] === search[char]) {
        char++;
        indexChar.push(j);
        if (char === search.length) {
          const indexHighlightChar = indexChar;
          return { check: true, indexHighlightChar };
        }
      }
    }
  } else return { check: false, indexHighlightChar: [] };
  return { check: false, indexHighlightChar: [] };
};
const Cryptocurrencies = ({ simplified }) => {
  const { data: cryptoList, isFetching } = useGetCryptosQuery({
    path: "coins",
    limit: simplified ? 10 : 100,
  });
  const [coinslist, setCoinsList] = useState({
    data: [],
    indexHighlightChar: [],
  });
  const [searchCurrency, setSearchCurrency] = useState("");
  const isMobile = useMediaQuery("(max-width:690px)");
  const color = ["rgb(255 239 102 / 50%)", "#8adad86e", "rgb(255 0 0 / 30%)"];
  let index = 0;
  useEffect(() => {
    const indexHighlightChar = [];
    const filteredList =
      cryptoList?.data?.coins?.filter((coin) => {
        const result = filterData(coin.name, searchCurrency);
        if (result.check) {
          indexHighlightChar.push(result.indexHighlightChar);
          return true;
        }
      }) || [];
    setCoinsList({ data: filteredList, indexHighlightChar });
  }, [cryptoList, searchCurrency]);
  if (isFetching) return <Loader />;
  return (
    <div className="currencies--container">
      {simplified || (
        <div className="search--currencies">
          <Input
            placeholder="search currency"
            className="input--search"
            onChange={(e) => setSearchCurrency(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[24, 24]} style={{ marginInline: "0px" }}>
        {coinslist?.data?.map((coin, i) => (
          <Col xs={24} sm={12} lg={8} key={coin.uuid}>
            <Link to={`/Crypto/${coin.uuid}`}>
              <Card
                title={coin?.name?.split("")?.map((char, j, arr) => {
                  if (coinslist?.indexHighlightChar?.[i]?.[index] === j) {
                    index++;
                    if (j === arr.length - 1) index = 0;
                    return (
                      <span
                        style={{ backgroundColor: color[index % 3] }}
                        key={nanoid()}
                      >
                        {char}
                      </span>
                    );
                  } else {
                    if (j === arr.length - 1) index = 0;
                    return char;
                  }
                })}
                extra={
                  <img src={coin.iconUrl} alt="coin" className="coin--icon" />
                }
                hoverable
              >
                <div className="coin--prices">
                  <p className="price--text">{`Price: ${
                    isMobile ? millify(parseFloat(coin.price) || 0) : coin.price
                  }`}</p>
                  <p className="price--text">{`Market Cap Price: ${
                    isMobile
                      ? millify(parseFloat(coin.marketCap) || 0)
                      : coin.marketCap
                  }`}</p>
                  <p className="price--text">{`Daily Change Price: ${
                    isMobile
                      ? millify(parseFloat(coin.change) || 0)
                      : coin.change
                  }`}</p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* ) : (
         <Col

          style={{
            height: "40vh",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <Title level={isMobile ? 3 : 1}>Cannot Find Any Coins</Title>
        </Col>
        )} */}
    </div>
  );
};

export default Cryptocurrencies;
