import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { fetchApps } from './services/index';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Overview = (props) => {
  const [appList, setAppList] = useState([]);
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(item.entry)
  }

  useEffect(() => {
    fetchApps().then((res) => {
      setAppList(res.result || []);
    })
  }, [])
  return (
    <Row gutter={16}>
      {appList.map(item => {
        return (
          <Col span={8}>
            <Card
              key={item.id}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              onClick={() => handleClick(item)}
            >
              <Meta title={item.name} description={item.entry} />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default Overview;
