import React, { useContext, useEffect } from 'react';
import List from '../../components/List';
import { deleteEventApi, fetchEventList } from './services';
import { getCustomItem, getColumns } from './config/index';
import { Button, message } from 'antd';
import EditEventModal from './components/EditEventModal';
import { toDayJs } from '../../utils/FormatUtils';
import GlobalContext from '../../common/GlobalContext';

const EventList = () => {
  const [listData, setListData] = React.useState({});
  const [searchParams, setSearchParams] = React.useState({});
  const globalContext = useContext(GlobalContext);
  const handleSearch = (params) => {
    fetchEventList(params).then(res => {
      console.log(res, 'res')
      setListData({ data: res.result.data, total: res.result.total });
      setSearchParams(params);
    })
  }

  const handleAddClick = () => {
    console.log(globalContext, 'globalContext', globalContext?.globalContextVal?.name)
    EditEventModal.show({ record: { implementor: globalContext?.globalContextVal?.name }, onOk: () => { handleSearch(searchParams) } });
  }

  const handleEditClick = (record) => {
    const { submitTest, publishTime } = record;
    const obj = { ...record, submitTest: toDayJs(submitTest), publishTime: toDayJs(publishTime) }
    EditEventModal.show({ record: obj, operateType: 'edit', onOk: () => { handleSearch(searchParams) }});
  }

  const handleDeleteClick = (record) => {
    deleteEventApi(record).then(() => {
      message.info('删除成功');
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

export default EventList;
