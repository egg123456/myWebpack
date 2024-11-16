import React, { useContext, useEffect } from 'react';
import List from '../../components/List';
import { addApi, deleteApi, fetchList } from './services';
import { getCustomItem, getColumns } from './config/index';
import { Button, message } from 'antd';
import EditModal from './components/EditModal';
import { toDayJs } from '../../utils/FormatUtils';
import GlobalContext from '../../common/GlobalContext';
import QrCodeScanner from '../../components/QrCodeScanner';

const InvoiceList = () => {
  const [listData, setListData] = React.useState({});
  const [searchParams, setSearchParams] = React.useState({});
  const globalContext = useContext(GlobalContext);
  const handleSearch = (params) => {
    fetchList(params).then(res => {
      console.log(res, 'res')
      setListData({ data: res.result.data, total: res.result.total });
      setSearchParams(params);
    })
  }

  const handleAddClick = () => {
    // EditModal.show({ record: { }, onOk: () => { handleSearch(searchParams) } });
    QrCodeScanner.show({
      onOk: (str) => {
        const data = str.split(',');
        console.log(data, 'da')
        const payload = {
          code: data[2],
          num: data[3],
          date: data[5],
          money: data[4],
          checkNum: data[6],
        };
        addApi(payload).then(() => {
          handleSearch({});
        })
      } 
    })
  }

  const handleEditClick = (record) => {
    const { startTime, endTime } = record;
    const obj = { ...record, startTime: toDayJs(startTime), endTime: toDayJs(endTime) }
    EditModal.show({ record: obj, operateType: 'edit', onOk: () => { handleSearch(searchParams) }});
  }

  const handleDeleteClick = (record) => {
    deleteApi(record).then(() => {
      message.info('删除成功');
      handleSearch({});
    });
  }

  useEffect(() => {
    handleSearch({})
  }, [])

  return (
    <>
    <div><Button onClick={handleAddClick}>add</Button></div>
    <List 
      customItem={getCustomItem()}
      table={{
        columns: getColumns({ handleEditClick, handleDeleteClick }),
        dataSource: listData.data,
        rowKey: 'id',
        pagination: {
          total: listData.total,
        }
      }}
      onSearch={handleSearch} 
    />
    </>
  );
}

export default InvoiceList;
