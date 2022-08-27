import React, { useState } from "react";
import { Select, Row, Col, Avatar, Card, Typography } from "antd";
import { useGetNewsQuery } from "../services/newsApi";
import moment from "moment";
import newsImage from "../images/newsImage.jpg";
import { nanoid } from "@reduxjs/toolkit";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState();
  const { data: newsList, isFetching: isNewsFetching } = useGetNewsQuery({
    path: "news/search",
    category: newsCategory || "Cryptocurrency",
    count: simplified ? 10 : 100,
  });
  const { data: coinsList, isFetching: isCoinsFetching } = useGetCryptosQuery({
    path: "coins",
    limit: 100,
  });
  const { Option } = Select;
  const { Title, Text } = Typography;
  if (isNewsFetching || (!simplified && isCoinsFetching)) return <Loader />;
  return (
    <div className="news--container">
      {simplified || (
        <Select
          value={newsCategory}
          style={{
            display: "block",
            margin: "10px auto",
          }}
          placeholder="Select a Crypto"
          onChange={(value) => {
            setNewsCategory(value.toLowerCase());
          }}
          optionFilterProp="children"
          filterOption={(input, option) => {
            return option.children.toLowerCase().indexOf(input.toLowerCase());
          }}
        >
          {coinsList?.data?.coins.map((coin, i) => (
            <Option key={nanoid()} value={coin.name}>
              {coin.name}
            </Option>
          ))}
        </Select>
      )}
      <Row
        gutter={[20, 20]}
        style={{ marginInline: "0px", marginBlock: "10px" }}
      >
        {newsList?.value?.map((news) => (
          <Col key={nanoid()} xs={24} sm={12} lg={8}>
            <a
              href={news?.url}
              target="_blank"
              rel="noreferrer"
              style={{ display: "block", height: "100%" }}
            >
              <Card
                title={news?.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                headStyle={{
                  minHeight: "unset",
                }}
                bodyStyle={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
                hoverable
                extra={
                  <Avatar
                    src={news?.image?.thumbnail.contentUrl || newsImage}
                    size="large"
                  ></Avatar>
                }
              >
                <div className="news--subject">
                  <Title level={4}>{news?.name}</Title>
                  <Text>
                    {news?.description?.length < 100
                      ? news.description
                      : news?.description?.slice(0, 100)}
                  </Text>
                </div>
                <div className="news--provider" style={{ marginTop: "auto" }}>
                  <div className="news--provider--details">
                    <Avatar
                      src={news?.provider?.[0]?.image?.thumbnail?.contentUrl}
                      size="small"
                    ></Avatar>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      &nbsp;{news?.provider?.[0]?.name}
                    </span>
                  </div>
                  <div className="news--provider--time">
                    <span>
                      {moment(news?.datePublished).startOf("ss").fromNow()}
                    </span>
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
