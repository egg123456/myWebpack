import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  ControlOutlined,
  TableOutlined,
  LoginOutlined,
  FunctionOutlined,
  BarChartOutlined,
  CodeOutlined,
} from '@ant-design/icons';

export const menuItems = [
  {
    key: '1',
    icon: <TableOutlined />,
    label: 'overview',
    children: [
      {
        icon: <UserOutlined />,
        label: 'overview',
        key: 'overview',
      }
    ]
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'ceremony',
    children: [
      {
        icon: <VideoCameraOutlined />,
        label: 'ceremony',
        key: 'ceremony',
      },
      {
        icon: <VideoCameraOutlined />,
        label: 'ceremonyBooks',
        key: 'ceremonyBooks',
      }
    ]
  },
  {
    key: '3',
    icon: <ControlOutlined />,
    label: 'event',
    children: [
      {
        icon: <ControlOutlined />,
        label: 'eventList',
        key: 'event/list',
      },
      {
        icon: <ControlOutlined />,
        label: 'projectSchedule',
        key: 'event/scheduling',
      },
      {
        icon: <ControlOutlined />,
        label: 'planList',
        key: 'event/planList',
      }
    ]
  },
  {
    key: '4',
    icon: <ControlOutlined />,
    label: 'festivalInfo',
    children: [
      {
        icon: <ControlOutlined />,
        label: 'festivalInfoList',
        key: 'festivalInfo/list',
      },
    ]
  },
  {
    key: 'smallFunc',
    icon: <FunctionOutlined />,
    label: 'smallFunc',
  },
  {
    key: 'login',
    icon: <LoginOutlined />,
    label: 'login',
  },
  {
    key: 'g2',
    icon: <BarChartOutlined />,
    label: 'g2',
  },
  {
    key: 'algorithm',
    icon: <CodeOutlined />,
    label: 'algorithm',
  },
];
