import React, { useState, useEffect, useContext } from 'react';
import Panel from '../../components/Panel';
import { useSearchParams } from 'react-router-dom';
import { fetchCeremonyBookDetail } from './services';
import FormGrid from '../../components/FormGrid';
import { Table, Button, message } from 'antd';
import { getColumns } from './config';
import EditCeremonyRecordModal from './components/EditCeremonyRecordModal';
import GlobalContext from '../../common/GlobalContext';
import { deleteCeremonyRecordApi } from './services/ceremonyRecord';

const CeremonyDetail = () => {
  const [bookInfo, setBookInfo] = useState({});
  const [params] = useSearchParams();
  const globalContext = useContext(GlobalContext);

  const handleSearch = () => {
    fetchCeremonyBookDetail({ id: params.get('id') }).then((res) => {
      setBookInfo(res.result || {});
    })
  }

  const handleAddClick = () => {
    EditCeremonyRecordModal.show({ record: { belongTo: params.get('id') }, onOk: () => { handleSearch() } });
  }

  const handleEditClick = (record) => {
    console.log(record, 'record');
    EditCeremonyRecordModal.show({ record, operateType: 'edit', onOk: () => { handleSearch() }});
  }

  const handleDeleteClick = (record) => {
    deleteCeremonyRecordApi(record).then(() => {
      message.info('删除成功');
      handleSearch()
    });
  }

  useEffect(() => {
    handleSearch();
  }, [])

  return (
    <Panel title={bookInfo?.name}>
      {bookInfo.name && (
      <FormGrid 
        items={[
          { label: 'event', field: 'name' },
          { label: 'date', field: 'gregorianCalendar' },
          { label: 'lunar-date', field: 'lunarCalendar' },
        ]} 
        initialValues={bookInfo}
      />)}

      <div><Button onClick={handleAddClick}>add</Button></div>
      <Table 
        columns={getColumns({ handleEditClick, handleDeleteClick })} 
        dataSource={bookInfo.records || []} 
        rowKey="id"
      />

    </Panel>
  );
};

export default CeremonyDetail;
