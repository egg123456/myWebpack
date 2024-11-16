import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme, Popover, message } from 'antd';
import React, { useState, Suspense, useEffect } from 'react';
import GlobalContext from '../common/GlobalContext';
import { getUserInfoApi } from '../common/services';
import docCookies from '../utils/docCookies';
import { menuItems } from './config';

const { Header, Sider, Content } = Layout;

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [globalContextVal, setGlobalContextVal] = useState({});

  useEffect(() => {
    getUserInfoApi().then((res) => {
      setGlobalContextVal(res);
    })
  }, [])


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    document.cookie = `token=${''};`
    // document.cookie = '';
    // docCookies.removeItem('token', '/view', 'localhost')
    message.info('退出成功');
    alert(document.cookie);
    navigate('/login');
  }

  const handleMenuClick = (menuItem) => {
    console.log(menuItem, 'ewew')
    navigate('/' + menuItem.key)
  }
  return (
    <GlobalContext.Provider value={{ globalContextVal, setGlobalContextVal }}>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1', 'overview']}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ float: 'right', paddingRight: 24, overflow: 'hidden' }}>
            <Popover content={<span onClick={handleLogout}><LogoutOutlined /> 退出</span>}>
              <UserOutlined /> {globalContextVal?.name}<br/>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            // minHeight: 280,
            background: colorBgContainer,
            height: window.innerHeight - 120,
            overflowY: 'scroll',
          }}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
    </GlobalContext.Provider>
  );
};
export default MyLayout;