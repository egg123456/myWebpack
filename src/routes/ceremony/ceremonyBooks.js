import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col, Button, message } from 'antd';
import { fetchCeremonyBooks, deleteCeremonyBookApi } from './services/index';
import { useNavigate } from "react-router-dom";
import GlobalContext from '../../common/GlobalContext';
import EditCeremonyBookModal from './components/EditCeremonyBookModal';
import { toDayJs } from '../../utils/FormatUtils';

const { Meta } = Card;

const CeremonyBooks = (props) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const handleClick = (item) => {
    navigate(`/ceremonyDetail?id=${item.id}`)
  }

  const  handleSearch = () => {
    fetchCeremonyBooks().then((res) => {
      setBooks(res.result || []);
    })
  }

  const handleAddClick = () => {
    EditCeremonyBookModal.show({ record: { belongTo: globalContext?.globalContextVal?.phone }, onOk: () => { handleSearch() } });
  }

  const handleEditClick = (e, record) => {
    e.stopPropagation();
    const { gregorianCalendar } = record;
    const obj = { ...record, gregorianCalendar: toDayJs(gregorianCalendar) }
    EditCeremonyBookModal.show({ record: obj, operateType: 'edit', onOk: () => { handleSearch() }});
  }

  const handleDeleteClick = (e, record) => {
    e.stopPropagation();
    deleteCeremonyBookApi(record).then(() => {
      console.log(2323)
      message.info('删除成功');
      handleSearch()
    });
  }

  useEffect(() => {
    handleSearch();
  }, [])

  return (
    <>
      <div><Button onClick={handleAddClick}>add</Button></div>
      <Row gutter={16} style={{ marginTop: 20 }}>
        {books.map(item => {
          return (
            <Col span={8}>
              <Card
                key={item.id}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                onClick={() => handleClick(item)}
              >
                <Meta title={item.name} description={item.gregorianCalendar} />
                <div>
                  <Button onClick={(e) => handleEditClick(e, item)}>edit</Button>
                  <Button style={{ marginLeft: 12 }} onClick={(e) => handleDeleteClick(e, item)}>delete</Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default CeremonyBooks;
