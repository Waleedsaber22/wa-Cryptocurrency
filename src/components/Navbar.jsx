import React, { useEffect, useRef, useState } from "react";
import { Button, Typography, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import cryptoLogo from "../images/cryptocurrency.png";
import { useMediaQuery } from "@mui/material";
import {
  MenuOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const { Title, Item } = { ...Typography, ...Menu };
const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:778px)");
  const [showMenu, setShowMenu] = useState(false);
  const menuElement = useRef(null);
  const toggle = () => {
    setShowMenu((state) => !state);
  };
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    setShowMenu(false);
    setTimeout(() => {
      menuElement.current.menu.list.style.transition = "none";
      setTimeout(
        () =>
          (menuElement.current.menu.list.style.transition =
            "background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s,height 0.5s ease")
      );
    });
  }, [isMobile]);
  return (
    <div className="navbar--container">
      <div className="navbar--logo">
        <Avatar
          src={cryptoLogo}
          size="large"
          style={{ marginTop: "15px" }}
          className="navbar--logo--view"
        ></Avatar>
        <Title level={3} className="navbar--logo--title">
          <Link to="/">Cryptoverse</Link>
        </Title>
      </div>
      {isMobile && (
        <Button onClick={toggle} className="menu--button">
          <MenuOutlined />
        </Button>
      )}
      <Menu
        ref={menuElement}
        theme="dark"
        className="navbar--menu"
        style={{
          height: `
        ${!isMobile ? "200px" : showMenu ? `200px` : "0px"}`,
          transition:
            "background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s,height 0.5s ease",
        }}
      >
        <Item icon={<HomeOutlined />} key={1} onClick={toggle}>
          <Link to="/">HomePage</Link>
        </Item>
        <Item icon={<FundOutlined />} key={2} onClick={toggle}>
          <Link to="/cryptocurrencies">CryptoCurrencies</Link>
        </Item>
        <Item icon={<MoneyCollectOutlined />} key={3} onClick={toggle}>
          <Link to="/exchanges">Exchanges</Link>
        </Item>
        <Item icon={<BulbOutlined />} key={4} onClick={toggle}>
          <Link to="/news">News</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default Navbar;
