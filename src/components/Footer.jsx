import React from "react";
import { Typography, Space } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
const Footer = () => {
  return (
    <div className="footer">
      <Title level={5} style={{ color: "white" }}>
        Cryptoverse All right reserved &reg;
      </Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  );
};

export default Footer;
