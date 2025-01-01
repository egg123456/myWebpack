import React from 'react';
import List from '../../components/List';
import { fetchCeremonyRecord } from './services';
import { getCustomItem, getColumns } from './config';

const defaultListData = {
  data: [],
  total: 0,
}

const Ceremony = () => {
  const [listData, setListData] = React.useState(defaultListData);
  const handleSearch = (params) => {
    fetchCeremonyRecord(params).then(res => {
      console.log(res)
      setListData(res.result || defaultListData);
    })
  }
  return (
    <List 
      customItem={getCustomItem()}
      table={{
        columns: getColumns({}),
        dataSource: listData.data,
      }}
      onSearch={handleSearch} 
    />
  );
}

export default Ceremony;
